import { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";

const BASE_WS_URL = 'wss://w0s9dzo1x4.execute-api.eu-north-1.amazonaws.com/dev/';

export type DryerData = {
  serial: string;
  temperature: number;
  humidity: number;
  timestamp: number;
  status?: "Running" | "Paused" | "Completed";
  targetTemp?: number;
  timeRemaining?: number; // in minutes
  totalTime?: number;     // in minutes
  currentProfile?: string;
};

export const useDryerWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const [dryerMap, setDryerMap] = useState<Record<string, DryerData>>({});

  useEffect(() => {
    let isMounted = true;

    const connectWebSocket = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        const url = `${BASE_WS_URL}?token=${encodeURIComponent(token)}`;
        ws.current = new WebSocket(url);

        ws.current.onmessage = (e: WebSocketMessageEvent) => {
          try {
            const message = JSON.parse(e.data);

            // --- Handle "environment" message ---
            if (message.type === "environment" && message.serial && message.data) {
              const { serial, data } = message;

              if (!isMounted) return;

              setDryerMap(prev => ({
                ...prev,
                [serial]: {
                  ...prev[serial],
                  serial,
                  temperature: data.temperature?.value || 0,
                  humidity: data.humidity?.value || 0,
                  timestamp: data.timestamp
                }
              }));
            }

            // --- Handle "events" message ---
            if (message.type === "events" && message.serial && message.data) {
              const { serial, data } = message;

              // 1. Handle cycle_started
              if (data.event === "cycle_started") {
                const targetTemp = parseFloat(data.temp);
                const timestamp = new Date(data.timestamp).getTime();
                const totalTime = data.time;

                if (!isMounted) return;

                setDryerMap(prev => {
                  const previous = prev[serial];
                  const isResumingFromPause = previous?.status === "Paused";

                  return {
                    ...prev,
                    [serial]: {
                      ...previous,
                      serial,
                      status: "Running",
                      targetTemp,
                      totalTime: isResumingFromPause ? previous.totalTime : totalTime,
                      timeRemaining: isResumingFromPause ? previous.timeRemaining : totalTime,
                      timestamp
                    }
                  };
                });

                return;
              }

              // 2. Handle status_report
              if (data.event === "status_report") {
                const status =
                  data.isRunning ? "Running" :
                    data.isPaused ? "Paused" : "Completed";

                const timeRemainingMin = data.remainingTime; // in minutes
                const profileName = data.selectedProfile?.id;

                if (!isMounted) return;

                setDryerMap(prev => ({
                  ...prev,
                  [serial]: {
                    ...prev[serial],
                    serial,
                    status,
                    targetTemp: data.targetTemp,
                    timeRemaining: timeRemainingMin,
                    totalTime: data.time ?? prev[serial]?.totalTime,
                    currentProfile: profileName,
                    temperature: data.currentTemp ?? prev[serial]?.temperature ?? 0,
                    humidity: data.currentHumidity ?? prev[serial]?.humidity ?? 0,
                    timestamp: new Date(data.timestamp).getTime()
                  }
                }));
              }
            }
          } catch (err) {
            console.error("Invalid WebSocket message", err);
          }
        };

        ws.current.onerror = (e: Event) => {
          console.error("WebSocket error:", e);
        };

        ws.current.onclose = () => {
          console.log("WebSocket closed");
        };
      } catch (error) {
        console.error("Failed to get auth token or connect WebSocket", error);
      }
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      ws.current?.close();
    };
  }, []);

  return { dryerMap };
};

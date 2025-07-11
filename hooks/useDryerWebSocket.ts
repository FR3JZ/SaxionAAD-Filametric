import { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { CognitoUserSession } from "amazon-cognito-identity-js";

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
    let isMounted:boolean = true;

    const connectWebSocket = async () => {
      try {
        // Fetch the current Cognito session to retrieve JWT token
        const session:CognitoUserSession = await Auth.currentSession();
        const token:string = session.getIdToken().getJwtToken();

        const url:string = `${BASE_WS_URL}?token=${encodeURIComponent(token)}`;
        ws.current = new WebSocket(url);

        ws.current.onmessage = (e: WebSocketMessageEvent) => {
          try {
            const message:any = JSON.parse(e.data);
            
            // Handle incoming environment data (live sensor values) 
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

            // Handle status/event-based messages 
            if (message.type === "events" && message.serial && message.data) {
              const { serial, data } = message;

              // Handle cycle_started event
              if (data.event === "cycle_started") {
                const targetTemp:number = parseFloat(data.temp);
                const timestamp:number = new Date(data.timestamp).getTime();
                const totalTime:any = data.time;

                if (!isMounted) return;

                setDryerMap(prev => {
                  const previous:DryerData = prev[serial];
                  const isResumingFromPause:boolean = previous?.status === "Paused";

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

              // Handle status_report event
              if (data.event === "status_report") {
                const status =
                  data.isRunning ? "Running" :
                    data.isPaused ? "Paused" : "Completed";

                const timeRemainingMin:any = data.remainingTime; // in minutes
                const profileName:any = data.selectedProfile?.id;

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

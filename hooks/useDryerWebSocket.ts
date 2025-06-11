import { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";

const BASE_WS_URL = 'wss://w0s9dzo1x4.execute-api.eu-north-1.amazonaws.com/dev/';

export type DryerData = {
  serial: string;
  temperature: number;
  humidity: number;
  timestamp: number;
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
            console.log(e)
          try {
            const message = JSON.parse(e.data);

            if (message.type === "environment" && message.serial && message.data) {
              const { serial, data } = message;

              if (!isMounted) return;

              setDryerMap(prev => ({
                ...prev,
                [serial]: {
                  serial,
                  temperature: data.temperature?.value || 0,
                  humidity: data.humidity?.value || 0,
                  timestamp: data.timestamp
                }
              }));
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

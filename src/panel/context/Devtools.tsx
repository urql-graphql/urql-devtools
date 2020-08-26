import { DevtoolsMessage, ExchangeMessage } from "@urql/devtools";
import semver from "semver";
import React, {
  createContext,
  useEffect,
  FC,
  useRef,
  useCallback,
  useState,
  useContext,
} from "react";
import { createConnection } from "../util";

export interface DevtoolsContextType {
  sendMessage: (message: DevtoolsMessage) => void;
  addMessageHandler: (cb: (message: ExchangeMessage) => void) => () => void;
  client:
    | {
        connected: false;
      }
    | {
        connected: true;
        version: {
          required: string;
          actual: string;
          mismatch: boolean;
        };
      };
}

const REQUIRED_VERSION = "2.0.0";

export const DevtoolsContext = createContext<DevtoolsContextType>(null as any);

export const useDevtoolsContext = (): DevtoolsContextType =>
  useContext(DevtoolsContext);

export const DevtoolsProvider: FC = ({ children }) => {
  const [client, setClient] = useState<DevtoolsContextType["client"]>({
    connected: false,
  });
  const connection = useRef(createConnection());

  /** Collection of operation events */
  const messageHandlers = useRef<
    Record<string, (msg: ExchangeMessage) => void>
  >({});

  const sendMessage = useCallback<DevtoolsContextType["sendMessage"]>(
    (msg) => connection.current.postMessage(msg),
    []
  );

  const addMessageHandler = useCallback<
    DevtoolsContextType["addMessageHandler"]
  >((callback) => {
    const i = index++;
    messageHandlers.current[i] = callback;

    return () => {
      delete messageHandlers.current[i];
    };
  }, []);

  // Send init message on mount
  useEffect(() => {
    connection.current.postMessage({
      type: "connection-init",
      source: "devtools",
      tabId:
        process.env.BUILD_ENV === "extension"
          ? chrome?.devtools?.inspectedWindow?.tabId
          : NaN,
      version: process.env.PKG_VERSION,
    });
  }, []);

  // Forward exchange messages to subscribers
  useEffect(() => {
    const handleMessage = (msg: ExchangeMessage | DevtoolsMessage) => {
      if (msg?.source !== "exchange") {
        return;
      }

      return Object.values(messageHandlers.current).forEach((h) => h(msg));
    };

    connection.current.onMessage.addListener(handleMessage);
    return () => connection.current.onMessage.removeListener(handleMessage);
  }, []);

  // Listen for client connect
  useEffect(() => {
    if (client.connected) {
      return;
    }

    return addMessageHandler((message) => {
      if (
        message.type !== "connection-acknowledge" &&
        message.type !== "connection-init"
      ) {
        return;
      }

      if (message.type === "connection-init") {
        connection.current.postMessage({
          type: "connection-acknowledge",
          source: "devtools",
          version: process.env.PKG_VERSION,
        });
      }

      return setClient({
        connected: true,
        version: {
          required: REQUIRED_VERSION,
          actual: message.version,
          mismatch:
            !semver.valid(message.version) ||
            !semver.satisfies(message.version, `>=${REQUIRED_VERSION}`),
        },
      });
    });
  }, [addMessageHandler, client.connected]);

  // Listen for client disconnect
  useEffect(() => {
    if (!client.connected) {
      return;
    }

    return addMessageHandler((message) => {
      if (message.type !== "connection-disconnect") {
        return;
      }

      setClient({ connected: false });
    });
  }, [addMessageHandler, client.connected]);

  return (
    <DevtoolsContext.Provider
      value={{ sendMessage, addMessageHandler, client }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

let index = 0;

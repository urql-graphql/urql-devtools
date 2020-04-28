import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
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
import { PanelOutgoingMessage } from "../../types";

export interface DevtoolsContextType {
  sendMessage: (message: PanelOutgoingMessage) => void;
  addMessageHandler: (
    cb: (message: DevtoolsExchangeOutgoingMessage) => void
  ) => () => void;
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

const REQUIRED_VERSION = "1.0.0";

export const DevtoolsContext = createContext<DevtoolsContextType>(null as any);

export const useDevtoolsContext = () => useContext(DevtoolsContext);

export const DevtoolsProvider: FC = ({ children }) => {
  const [client, setClient] = useState<DevtoolsContextType["client"]>({
    connected: false,
  });
  const connection = useRef(createConnection());

  /** Collection of operation events */
  const messageHandlers = useRef<
    Record<string, (msg: DevtoolsExchangeOutgoingMessage) => void>
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

  useEffect(() => {
    // Relay the tab ID to the background page
    connection.current.postMessage({
      type: "init",
      tabId:
        process.env.BUILD_ENV === "extension"
          ? chrome?.devtools?.inspectedWindow?.tabId
          : NaN,
    });

    const handleMessage = (msg: DevtoolsExchangeOutgoingMessage) => {
      return Object.values(messageHandlers.current).forEach((h) => h(msg));
    };

    connection.current.onMessage.addListener(handleMessage);
    return () => connection.current.onMessage.removeListener(handleMessage);
  }, []);

  // Listen for client disconnect
  useEffect(() => {
    if (!client.connected) {
      return;
    }

    return addMessageHandler((message) => {
      if (message.type !== "disconnect") {
        return;
      }

      setClient({ connected: false });
    });
  }, [addMessageHandler, client.connected]);

  // Poll for client to declare version
  useEffect(() => {
    if (client.connected) {
      return;
    }

    const interval = setInterval(() => {
      connection.current.postMessage({ type: "get-version" });
    }, 300);

    return addMessageHandler((message) => {
      if (message.type !== "declare-version") {
        return;
      }

      clearInterval(interval);
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
  }, []);

  return (
    <DevtoolsContext.Provider
      value={{ sendMessage, addMessageHandler, client }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

let index = 0;

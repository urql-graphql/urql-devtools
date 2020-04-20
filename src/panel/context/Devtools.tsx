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
import { DevtoolsPanelConnectionName, PanelOutgoingMessage } from "../../types";

export interface DevtoolsContextType {
  sendMessage: (message: PanelOutgoingMessage) => void;
  addMessageHandler: (
    cb: (message: DevtoolsExchangeOutgoingMessage) => void
  ) => () => void;
  clientConnected: boolean;
  version: {
    required: string;
    actual?: string;
    mismatch: boolean;
  };
}

export const DevtoolsContext = createContext<DevtoolsContextType>(null as any);

export const useDevtoolsContext = () => useContext(DevtoolsContext);

export const DevtoolsProvider: FC = ({ children }) => {
  const [clientConnected, setClientConnected] = useState(false);
  const [version, setVersion] = useState<DevtoolsContextType["version"]>({
    required: "1.0.0",
    mismatch: false,
  });
  const connection = useRef(
    chrome.runtime.connect({ name: DevtoolsPanelConnectionName })
  );

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
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    const handleMessage = (msg: DevtoolsExchangeOutgoingMessage) => {
      return Object.values(messageHandlers.current).forEach((h) => h(msg));
    };

    connection.current.onMessage.addListener(handleMessage);
    return () => connection.current.onMessage.removeListener(handleMessage);
  }, []);

  // Listen for client init connection
  useEffect(() => {
    return addMessageHandler(async (message) => {
      if (message.type === "init") {
        setClientConnected(true);
      }

      if (message.type === "disconnect") {
        setClientConnected(false);
      }
    });
  }, [addMessageHandler, setClientConnected]);

  // Check version on client connected
  useEffect(() => {
    if (!clientConnected) {
      setVersion(({ required }) => ({
        required,
        mismatch: false,
      }));
    }

    getExchangeVersion().then((v) => {
      setVersion(({ required }) => ({
        required,
        mismatch:
          !semver.valid(v) || !semver.satisfies(v as string, `>=${required}`),
        actual: v,
      }));
    });
  }, [clientConnected]);

  return (
    <DevtoolsContext.Provider
      value={{ sendMessage, addMessageHandler, clientConnected, version }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

let index = 0;

const getExchangeVersion = () =>
  new Promise<string | undefined>((resolve) =>
    chrome.devtools.inspectedWindow.eval(
      "window.__urql__",
      (response: undefined | { version?: string }) => resolve(response?.version)
    )
  );

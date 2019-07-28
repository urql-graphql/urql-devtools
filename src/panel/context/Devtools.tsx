import React, { createContext, useEffect, FC, useRef } from "react";
import { ContentScriptMessage, DevtoolsMessage } from "../../types-old";
import { DevtoolsPanelConnectionName } from "../../types";

export const DevtoolsContext = createContext<{
  sendMessage: (message: DevtoolsMessage) => void;
  addMessageHandler: (
    cb: (message: ContentScriptMessage) => void
  ) => () => void;
}>(null as any);

export const DevtoolsProvider: FC = ({ children }) => {
  const connection = useRef(
    chrome.runtime.connect({ name: DevtoolsPanelConnectionName })
  );

  /** Collection of operation events */
  const messageHandlers = useRef<
    Record<string, (msg: ContentScriptMessage) => void>
  >({});

  const sendMessage = (msg: DevtoolsMessage) =>
    connection.current.postMessage(msg);

  const addMessageHandler = (callback: (msg: ContentScriptMessage) => void) => {
    const i = index++;
    messageHandlers.current[i] = callback;

    return () => {
      delete messageHandlers.current[i];
    };
  };

  useEffect(() => {
    // Relay the tab ID to the background page
    connection.current.postMessage({
      type: "init",
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    const handleMessage = (msg: ContentScriptMessage) => {
      console.log(msg);
      Object.values(messageHandlers.current).forEach(h => h(msg));
    };

    connection.current.onMessage.addListener(handleMessage);
    return () => connection.current.onMessage.removeListener(handleMessage);
  }, []);

  return (
    <DevtoolsContext.Provider value={{ sendMessage, addMessageHandler }}>
      {children}
    </DevtoolsContext.Provider>
  );
};

let index = 0;

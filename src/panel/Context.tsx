import React, { createContext, useEffect, FC, useRef } from "react";
import { OperationEvent, ContentScriptMessage } from "../types";

export const DevtoolsContext = createContext<{
  sendMessage: (message: any) => void;
  addMessageHandler: (cb: (message: ContentScriptMessage) => void) => void;
}>(null as any);

/** Connection to background.js */
const connection = chrome.runtime.connect({
  name: "urql-devtools"
});

export const Provider: FC = ({ children }) => {
  /** Collection of operation events */
  const messageHandlers = useRef<
    Array<(message: ContentScriptMessage) => void>
  >([]);
  const sendMessage = connection.postMessage;

  const addMessageHandler = (callback: (msg: ContentScriptMessage) => void) => {
    messageHandlers.current = [...messageHandlers.current, callback];

    return () => {
      messageHandlers.current = messageHandlers.current.filter(
        cb => cb === callback
      );
    };
  };

  useEffect(() => {
    // Relay the tab ID to the background page
    connection.postMessage({
      message: "init",
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    const handleMessage = (msg: ContentScriptMessage) =>
      messageHandlers.current.forEach(h => h(msg));

    connection.onMessage.addListener(handleMessage);
    return () => connection.onMessage.removeListener(handleMessage);
  }, []);

  return (
    <DevtoolsContext.Provider value={{ sendMessage, addMessageHandler }}>
      {children}
    </DevtoolsContext.Provider>
  );
};

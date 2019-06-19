import React, { createContext, useEffect, useState, FC } from "react";
import { OperationEvent } from "../types";

export const DevtoolsContext = createContext<any>(null);

/** Connection to background.js */
const connection = chrome.runtime.connect({
  name: "urql-devtools"
});

export const Provider: FC = ({ children }) => {
  /** Collection of operation events */
  const [operations, setOperations] = useState<OperationEvent[]>([]);

  useEffect(() => {
    // Set initial operations state from cache
    window.chrome.devtools.inspectedWindow.eval(
      `window.__urql__.operations`,
      setOperations
    );

    // Relay the tab ID to the background page
    connection.postMessage({
      message: "init",
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    // Listen for message from exchange (via content_script and background)
    connection.onMessage.addListener(msg => {
      console.log("received operation", msg);
      setOperations(o => [...o, msg]);
    });
  }, []);

  return (
    <DevtoolsContext.Provider value={{ operations }}>
      {children}
    </DevtoolsContext.Provider>
  );
};

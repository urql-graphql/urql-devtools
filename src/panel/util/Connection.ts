import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import { PanelOutgoingMessage, DevtoolsPanelConnectionName } from "../../types";

export interface ConnectionType {
  postMessage: (msg: PanelOutgoingMessage) => void;
  onMessage: {
    addListener: (cb: (msg: DevtoolsExchangeOutgoingMessage) => void) => void;
    removeListener: (
      cb: (msg: DevtoolsExchangeOutgoingMessage) => void
    ) => void;
  };
}

export const createConnection = (): ConnectionType => {
  if (process.env.BUILD_ENV === "extension") {
    const connection = chrome.runtime.connect({
      name: DevtoolsPanelConnectionName,
    });

    return connection;
  }

  let listeners: Function[] = [];
  const ipcRenderer = require("electron")
    .ipcRenderer as import("electron").IpcRenderer;

  ipcRenderer.on("message", (event, message) =>
    listeners.forEach((l) => l(message))
  );
  return {
    postMessage: (m) => ipcRenderer.send("message", m),
    onMessage: {
      addListener: (l) => (listeners = [...listeners, l]),
      removeListener: (l) => listeners.filter((listener) => listener !== l),
    },
  };
};

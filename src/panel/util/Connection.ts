import { ExchangeMessage, DevtoolsMessage } from "@urql/devtools";
import { ipcRenderer } from "electron";
import { DevtoolsPanelConnectionName } from "../../types";

export interface ConnectionType {
  postMessage: (msg: DevtoolsMessage) => void;
  onMessage: {
    addListener: (cb: (msg: ExchangeMessage | DevtoolsMessage) => void) => void;
    removeListener: (
      cb: (msg: ExchangeMessage | DevtoolsMessage) => void
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

  let listeners: Array<(msg: ExchangeMessage | DevtoolsMessage) => void> = [];

  ipcRenderer.on("message", (_event, message) =>
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

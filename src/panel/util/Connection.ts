import { ipcRenderer } from "electron";
import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import { PanelOutgoingMessage, DevtoolsPanelConnectionName } from "../../types";

interface ConnectionType {
  postMessage: (msg: PanelOutgoingMessage) => void;
  onMessage: {
    addListener: (cb: (msg: DevtoolsExchangeOutgoingMessage) => void) => void;
    removeListener: (
      cb: (msg: DevtoolsExchangeOutgoingMessage) => void
    ) => void;
  };
}

export const Connection = (() => {
  if (process.env.BUILD_ENV === "extension") {
    return class Connection implements ConnectionType {
      private connection: chrome.runtime.Port;

      constructor() {
        this.connection = chrome.runtime.connect({
          name: DevtoolsPanelConnectionName,
        });
      }

      public postMessage = this.connection.postMessage;
      public onMessage = this.connection.onMessage;
    };
  }

  if (process.env.BUILD_ENV === "electron") {
    return class Connection implements ConnectionType {
      public postMessage: ConnectionType["postMessage"] = (m) =>
        ipcRenderer.emit("message", m);
      public onMessage: ConnectionType["onMessage"] = {
        addListener: (listener) => ipcRenderer.addListener("message", listener),
        removeListener: (listener) =>
          ipcRenderer.removeListener("message", listener),
      };
    };
  }

  throw Error("No build env specified");
})();

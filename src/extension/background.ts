import { DevtoolsMessage } from "@urql/devtools";
import {
  ContentScriptConnectionName,
  DevtoolsPanelConnectionName,
} from "../types";
import { debug, BackgroundEventTarget } from "../util";

/** Collection of targets grouped by tabId. */
const targets: Record<number, BackgroundEventTarget> = {};

type AddToTargetArgs = {
  tabId: number;
  source: "exchange" | "devtools";
  port: chrome.runtime.Port;
};

/** Ensures all messages are forwarded to and from tab connections. */
const addToTarget = ({ tabId, port, source }: AddToTargetArgs) => {
  if (targets[tabId] === undefined) {
    targets[tabId] = new BackgroundEventTarget();
  }

  const target = targets[tabId];
  const portName = port.name;

  debug("Connect: ", { tabId, portName });
  target.addEventListener(portName, (a) => port.postMessage(a));

  port.onMessage.addListener((e) => {
    debug("Message: ", { tabId, portName, message: e });
    target.dispatchEvent(portName, e);
  });
  port.onDisconnect.addListener(() => {
    debug("Disconnect: ", { tabId, portName });
    target.removeEventListener(portName);
    target.dispatchEvent(portName, { type: "connection-disconnect", source });
  });
};

/** Handle initial connection from content script. */
const handleContentScriptConnection = (port: chrome.runtime.Port) => {
  if (port?.sender?.tab?.id) {
    const tabId = port.sender.tab.id;

    addToTarget({ tabId, port, source: "exchange" });
    chrome.pageAction.setIcon({ tabId, path: "/assets/icon-32.png" });
    port.onDisconnect.addListener(() => {
      chrome.pageAction.setIcon(
        {
          tabId,
          path: "/assets/icon-disabled-32.png",
        },
        () => true
      );
    });
  }
};

/** Handle initial connection from devtools panel. */
const handleDevtoolsPanelConnection = (port: chrome.runtime.Port) => {
  const source = "devtools";
  const initialListener = (msg: DevtoolsMessage) => {
    debug("Devtools Initial Message: ", { msg });
    if (msg.type !== "connection-init") {
      return;
    }

    // tabId is required when working with chrome extension
    if (msg.tabId === undefined) {
      console.error(
        "Recieved devtools panel connection but no tabId was specified."
      );
      return;
    }

    addToTarget({ tabId: msg.tabId, port, source });
    targets[msg.tabId].dispatchEvent(source, msg);

    port.onMessage.removeListener(initialListener);
  };

  port.onMessage.addListener(initialListener);
};

const connectionHandlers: Record<string, (p: chrome.runtime.Port) => void> = {
  [ContentScriptConnectionName]: handleContentScriptConnection,
  [DevtoolsPanelConnectionName]: handleDevtoolsPanelConnection,
};

chrome.runtime.onConnect.addListener((port) => {
  const handler = connectionHandlers[port.name];
  return handler && handler(port);
});

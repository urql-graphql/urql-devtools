import {
  ContentScriptConnectionName,
  DevtoolsPanelConnectionName,
  PanelOutgoingMessage
} from "../types";
import { BackgroundEventTarget } from "./EventTarget";

/** Collection of targets grouped by tabId. */
const targets: Record<number, BackgroundEventTarget> = {};

/** Ensures all messages are forwarded to and from tab connections. */
const addToTarget = (tabId: number, port: chrome.runtime.Port) => {
  if (targets[tabId] === undefined) {
    targets[tabId] = new BackgroundEventTarget();
  }

  const target = targets[tabId];
  const portName = port.name;
  target.addEventListener(portName, a => port.postMessage(a));
  port.onMessage.addListener(e => target.dispatchEvent(portName, e));
  port.onDisconnect.addListener(() => {
    target.dispatchEvent(portName, { type: "disconnect" });
    chrome.pageAction.setIcon({ tabId, path: "/assets/icon-disabled-32.png" });
  });
};

/** Handles initial connection from content script. */
const handleContentScriptConnection = (port: chrome.runtime.Port) => {
  if (port && port.sender && port.sender.tab && port.sender.tab.id) {
    const tabId = port.sender.tab.id as number;

    addToTarget(tabId, port);

    chrome.pageAction.setIcon({ tabId, path: "/assets/icon-32.png" });
  }
};

/** Handles initial connection from devtools panel */
const handleDevtoolsPanelConnection = (port: chrome.runtime.Port) => {
  const initialListener = (msg: PanelOutgoingMessage) => {
    if (msg.type !== "init") {
      return;
    }

    addToTarget(msg.tabId, port);
    port.onMessage.removeListener(initialListener);

    // Simulate contentscript connection if CS is already connected
    if (
      targets[msg.tabId]
        .connectedSources()
        .includes(ContentScriptConnectionName)
    ) {
      port.postMessage({ type: "init" });
    }
  };

  port.onMessage.addListener(initialListener);
};

const connectionHandlers: Record<string, (p: chrome.runtime.Port) => void> = {
  [ContentScriptConnectionName]: handleContentScriptConnection,
  [DevtoolsPanelConnectionName]: handleDevtoolsPanelConnection
};

chrome.runtime.onConnect.addListener(port => {
  const handler = connectionHandlers[port.name];
  return handler && handler(port);
});

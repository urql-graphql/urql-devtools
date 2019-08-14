import { BackgroundEventTarget } from "./EventBus";
import {
  ContentScriptConnectionName,
  DevtoolsPanelConnectionName,
  PanelOutgoingMessage
} from "../types";

const targets: Record<number, BackgroundEventTarget> = {};

/** Ensures all messages are forwarded to and from tab connections. */
const addToTarget = (tabId: number, port: chrome.runtime.Port) => {
  if (targets[tabId] === undefined) {
    targets[tabId] = new BackgroundEventTarget();
  }

  const target = targets[tabId];
  target.addEventListener(port.name, a => port.postMessage(a));
  port.onDisconnect.addListener(() => target.removeEventListener(port.name));
  port.onMessage.addListener(e => target.dispatchEvent(port.name, e));
};

const handleContentScriptConnection = (port: chrome.runtime.Port) => {
  const tabId = port!.sender!.tab!.id as number;

  addToTarget(tabId, port);

  chrome.pageAction.setIcon({ tabId, path: "/assets/icon-32.png" });
  port.onDisconnect.addListener(() =>
    chrome.pageAction.setIcon({ tabId, path: "/assets/icon-disabled-32.png" })
  );
};

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

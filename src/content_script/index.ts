import {
  DevtoolsExchangeOutgoingMessage,
  DevtoolsExchangeOutgoingEventType,
  DevtoolsExchangeIncomingEventType
} from "@urql/devtools";
import { ContentScriptConnectionName } from "../types";

/** Connection to background.js */
let connection: chrome.runtime.Port | undefined;

// Listen for init message from exchange
window.addEventListener(DevtoolsExchangeOutgoingEventType, e => {
  const data = (e as CustomEvent<DevtoolsExchangeOutgoingMessage>).detail;

  if (data.type === "init") {
    connection = chrome.runtime.connect({ name: ContentScriptConnectionName });
    connection.onMessage.addListener(handleMessage);
    connection.onDisconnect.addListener(handleDisconnect);
  }

  if (connection === undefined) {
    return console.warn("Unable to send message to Urql Devtools extension");
  }

  connection.postMessage(data);
});

/** Handle message from background script. */
const handleMessage = (message: DevtoolsExchangeOutgoingMessage) =>
  window.dispatchEvent(
    new CustomEvent(DevtoolsExchangeIncomingEventType, { detail: message })
  );

/** Handle disconnect from background script. */
const handleDisconnect = () => {
  connection = undefined;
};

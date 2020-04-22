import {
  DevtoolsExchangeOutgoingMessage,
  DevtoolsExchangeOutgoingEventType,
  DevtoolsExchangeIncomingEventType,
} from "@urql/devtools";
import { ContentScriptConnectionName } from "../types";

/** Handle message from background script. */
const handleMessage = (message: DevtoolsExchangeOutgoingMessage) =>
  window.dispatchEvent(
    new CustomEvent(DevtoolsExchangeIncomingEventType, { detail: message })
  );

/** Callback to handle messages from the devtools exchange. */
const exchangeEventListener = (e: any) => {
  const data = (e as CustomEvent<DevtoolsExchangeOutgoingMessage>).detail;
  connection.postMessage(data);
};

/** Handle connect to background script. */
const handleConnect = () => {
  window.__urql_devtools_content_script_live__ = true;
  window.addEventListener(
    DevtoolsExchangeOutgoingEventType,
    exchangeEventListener
  );
};

/** Handle disconnect from background script. */
const handleDisconnect = () => {
  window.__urql_devtools_content_script_live__ = false;
  window.removeEventListener(
    DevtoolsExchangeOutgoingEventType,
    exchangeEventListener
  );
};

/** Connection to background.js */
const connection = chrome.runtime.connect({
  name: ContentScriptConnectionName,
});
handleConnect();
connection.onMessage.addListener(handleMessage);
connection.onDisconnect.addListener(handleDisconnect);

if (window.__urql_devtools__) {
  connection.postMessage({ type: "init" });
}

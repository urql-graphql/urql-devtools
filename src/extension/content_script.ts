import { ExchangeMessage, ExchangeSource } from "@urql/devtools";
import { ContentScriptConnectionName } from "../types";
import { debug } from "../util";

/** Connection to background.js */
let connection: chrome.runtime.Port | undefined;

// Listen for init message from exchange
window.addEventListener("message", ({ data, isTrusted }) => {
  const exchangeSource: ExchangeSource = "exchange";

  // Filter messages not from the exchange
  if (!isTrusted || data?.source !== exchangeSource) {
    return;
  }

  const message = data.message as ExchangeMessage;
  debug("Exchange Message: ", data);

  // Setup connection on init message
  if (message.type === "connection-init") {
    connection = chrome.runtime.connect({ name: ContentScriptConnectionName });
    connection.onMessage.addListener(handleMessage);
    connection.onDisconnect.addListener(handleDisconnect);
  }

  if (connection === undefined) {
    return console.warn("Unable to send message to Urql Devtools extension");
  }

  // Forward message to devtools
  connection.postMessage(message);
});

/** Handle message from background script. */
const handleMessage = (message: ExchangeMessage) => {
  debug("Background Message: ", message);
  window.postMessage(message, window.location.origin);
};

/** Handle disconnect from background script. */
const handleDisconnect = () => {
  connection = undefined;
};

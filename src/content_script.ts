import { DevtoolsMessage } from "./types";

/** Connection to background.js */
let connection: chrome.runtime.Port | undefined;

// Listen for init message from exchange
window.addEventListener("urql-out", e => {
  const data = (e as CustomEvent).detail;

  if (connection === undefined && data === "init") {
    connection = chrome.runtime.connect({ name: "urql-cscript" });
    connection.onMessage.addListener(handleMessage);
    connection.onDisconnect.addListener(handleDisconnect);
    return;
  }

  if (connection === undefined) {
    return console.warn("Unable to send message to Urql Devtools extension");
  }

  connection.postMessage(data);
});

const handleMessage = (message: DevtoolsMessage) =>
  window.dispatchEvent(new CustomEvent("urql-in", { detail: message }));

const handleDisconnect = () => {
  connection = undefined;
};

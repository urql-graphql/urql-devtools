import { Client, createRequest } from "urql";
import { DevtoolsMessage, OperationEvent } from "./types";

declare global {
  interface Window {
    __urql__: {
      client: Client;
      operations: OperationEvent[];
    };
  }
}

/** Connection to background.js */
let connection: chrome.runtime.Port;

// Listen for init message
window.addEventListener("urql-out", e => {
  console.log("exchange -> content script", e);
  const data = (e as CustomEvent).detail;

  if (data === "init") {
    connection = chrome.runtime.connect({ name: "urql-cscript" });
    connection.onMessage.addListener(handleMessage);
  }

  try {
    connection.postMessage(data);
  } catch (err) {
    console.error(err);
  }
});

const handleMessage = (message: DevtoolsMessage, port: chrome.runtime.Port) => {
  console.log("message", message);
  window.dispatchEvent(new CustomEvent("urql-in", { detail: message }));
};

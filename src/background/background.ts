import { DevtoolsMessage, ContentScriptMessage } from "../types";

/** Connections from devtools.js */
let devtoolsConnections: Record<string, chrome.runtime.Port> = {};
/** Connections from content_script.js */
let cscriptConnections: Record<string, chrome.runtime.Port> = {};

chrome.runtime.onConnect.addListener(port => {
  // Devtools connection
  if (port.name === "urql-devtools") {
    return port.onMessage.addListener(handleDevtoolsPageMessage);
  }

  // Hook connection
  if (port.name === "urql-cscript") {
    // @ts-ignore
    const tabId = port.sender.tab.id as number;

    console.log("new client connection on tab", tabId);
    cscriptConnections = { ...cscriptConnections, [tabId]: port };

    port.onMessage.addListener(handleClientMessage(tabId));
  }
});

/** Message from devtools to background.js */
const handleDevtoolsPageMessage = (
  msg: DevtoolsMessage,
  port: chrome.runtime.Port
) => {
  // Devtools declares itself
  if (msg.type === "init") {
    const tabId = msg.tabId;

    console.log("New devtools connection to tab", tabId);
    devtoolsConnections = { ...devtoolsConnections, [tabId]: port };

    console.log("executing content script on tab");
    chrome.tabs.executeScript(tabId, { file: "content_script.js" });

    // Forward message to content script
    port.onMessage.addListener(msg => {
      if (cscriptConnections[tabId] === undefined) {
        return;
      }

      console.log("sending message to content script", msg);
      cscriptConnections[tabId].postMessage(msg);
    });
  }
};

/** Message from client for devtools.js */
const handleClientMessage = (tabId: number) => (data: ContentScriptMessage) => {
  console.log("message from content script on tabId", tabId);
  console.log("message contents", data);

  if (devtoolsConnections[tabId] === undefined) {
    console.warn(
      "Unable to forward from content script - no devtools connection to tab"
    );
    return;
  }

  // Forward message to devtool
  const devtoolsConn = devtoolsConnections[tabId];
  devtoolsConn.postMessage(data);
};

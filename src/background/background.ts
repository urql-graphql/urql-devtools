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
const handleDevtoolsPageMessage = (data: any, port: chrome.runtime.Port) => {
  // Devtools declares itself
  if (data.message === "init" && data.tabId !== null) {
    const tabId = data.tabId;

    console.log("New devtools connection to tab", tabId);
    devtoolsConnections = { ...devtoolsConnections, [tabId]: port };

    console.log("executing content script on tab");
    chrome.tabs.executeScript(tabId, { file: "content_script.js" });
  }
};

/** Message from client for devtools.js */
const handleClientMessage = (tabId: number) => (
  data: any,
  port: chrome.runtime.Port
) => {
  console.log("message from tabId", tabId);
  if (devtoolsConnections[tabId] === undefined) {
    return;
  }

  // Forward message to devtool
  const devtoolsConn = devtoolsConnections[tabId];
  devtoolsConn.postMessage(data);
};

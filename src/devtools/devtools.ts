// @ts-ignore
chrome.devtools.panels.create("urql", null, "panel.html", null);

const backgroundPageConnection = chrome.runtime.connect({
  name: "urql"
});

backgroundPageConnection.onMessage.addListener(function(message) {
  // Handle responses from the background page, if any
  console.log("i got a message");
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
  message: "init",
  tabId: chrome.devtools.inspectedWindow.tabId
});

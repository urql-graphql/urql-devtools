let connections: Record<string, chrome.runtime.Port | undefined> = {};

const handleMessage = (message: any, port: chrome.runtime.Port) => {
  console.log("background: received message", message);

  if (message.name === "init") {
    connections = { ...connections, [message.tabId]: port };
  }
};

const handleDisconnect = (port: chrome.runtime.Port) => {
  port.onMessage.removeListener(handleMessage);

  // Remove from connections
  Object.entries(connections).some(([key, value]) => {
    if (value === port) {
      connections = { ...connections, [key]: undefined };
      return true;
    }

    return false;
  });
};

chrome.runtime.onConnect.addListener(port => {
  console.log("on connect", port);
  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener(handleDisconnect);
});

chrome.runtime.onMessage.addListener(console.log);

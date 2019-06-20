/** Connection to background.js */
let connection: chrome.runtime.Port;

// Listen for init message
window.addEventListener("urql", e => {
  const data = (e as CustomEvent).detail;

  if (data === "init") {
    connection = chrome.runtime.connect({ name: "urql-cscript" });
    connection.onMessage.addListener(handleMessage);
  }

  try {
    connection.postMessage(data);
  } catch (err) {}
});

const handleMessage = (message: any, port: chrome.runtime.Port) => {
  console.log("content script msg", message);
};

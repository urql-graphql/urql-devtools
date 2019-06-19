/** Connection to background.js */
let connection: chrome.runtime.Port;

// Listen for init message
window.addEventListener("urql", e => {
  const data = (e as CustomEvent).detail;

  if (data === "init") {
    connection = chrome.runtime.connect({ name: "urql-cscript" });
  }

  try {
    connection.postMessage(data);
  } catch (err) {}
});

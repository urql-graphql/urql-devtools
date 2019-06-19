/** Connection to background.js */
let connection: chrome.runtime.Port;

// Listen for init message
window.addEventListener("urql", e => {
  const data = (e as CustomEvent).detail;

  // @ts-ignore
  if (data === "init") {
    connection = chrome.runtime.connect({ name: "urql-cscript" });
  }

  try {
    connection.postMessage(data);
  } catch (err) {
    console.error("Error in Tipple content script: ", err);
  }
});

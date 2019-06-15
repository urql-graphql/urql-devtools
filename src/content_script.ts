const main = () => {
  /** Connection to background.js */
  const connection = chrome.runtime.connect({ name: "urql-cscript" });

  /** Handle message from exchange and forward to background.js */
  window.addEventListener("urql", e =>
    connection.postMessage((e as CustomEvent).detail)
  );
};

if (window.hasOwnProperty("__urql__")) {
  main();
}

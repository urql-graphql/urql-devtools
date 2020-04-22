// Show urql devtools if devtools exchange has been mounted
chrome.devtools.panels.create("Urql", "", "panel.html");

const contentScript = fetch("/content_script.js").then((c) => c.text());

let injecting = false;
const injectContentScript = async () => {
  if (injecting) {
    return;
  }
  injecting = true;
  chrome.devtools.inspectedWindow.eval(await contentScript, () => {
    injecting = false;
  });
};

/** Inject content script on first panel open */
injectContentScript();

/** Inject content script on resource added (potential page reload) */
chrome.devtools.inspectedWindow.onResourceAdded.addListener(() =>
  chrome.devtools.inspectedWindow.eval(
    `window.__urql_devtools_content_script_live__`,
    async (isLive) => {
      if (isLive) {
        return;
      }

      injectContentScript();
    }
  )
);

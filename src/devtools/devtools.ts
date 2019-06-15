// Show urql devtools if devtools exchange has been mounted
chrome.devtools.inspectedWindow.eval(
  `window.hasOwnProperty('__urql__')`,
  isUrql => {
    if (isUrql) {
      chrome.devtools.panels.create("urql", "", "panel.html");
    }
  }
);

chrome.devtools.panels.create(
  "Fireproof",
  "images/fireproof_img.png",
  "popup.html",
  function (panel) {
    console.log("The panel for the extension has been created");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      console.log("Is this event executed?");
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["dist/content-script.js"],
      });
    });
  }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab) {
    //This means that the message is received from the content script

    if (request.type == "document") {
      //The documents of a particular clicked database name are received here
      //These documents are sent to the popup.js so that they could be displayed
      (async () => {
        await chrome.runtime.sendMessage(request);
      })();
    } else {
      //The database names are received here
      //Now the background script sends the data to the popup.js file
      //The popup.js file is responsible for changing the content of the HTML file that is present inside the devtools tab
      (async () => {
        const response = await chrome.runtime.sendMessage({
          data: request,
          for: "extension",
        });
        console.log("This is the response from popup.js", response);
      })();
    }
  } else {
    (async () => {
      await chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          await chrome.tabs.sendMessage(tabs[0].id, {
            data: request.data,
            for: "content-script",
          });
        }
      );
    })();
  }
});

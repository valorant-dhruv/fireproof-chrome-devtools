import { fireproof } from "use-fireproof";

//The database names will be stored inside this array
let arr = [];

//Looping through the localstorage to find the database names
Object.keys(localStorage).forEach(function (key) {
  if (key.includes("fp.0.14.meta.")) {
    let temp = key.slice(13);
    let temparr = temp.split(".");
    arr.push(temparr[0]);
  }
});

//Once the database names are found this async function sends the array of db names to the background script
(async () => {
  console.log("This is the array of database names", arr);
  const response = await chrome.runtime.sendMessage(arr);
  console.log(response);
})();

//Whenever a click event happens on popup.js for a particular database name this event listener gets triggered
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  async function querydatabase() {
    let result = fireproof(request.data);
    let queryresult = await result.allDocs();
    const finalresult = {
      data: queryresult.rows,
      type: "document",
      databasename: request.data,
    };
    const response = await chrome.runtime.sendMessage(finalresult);
  }

  querydatabase();
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var databasenames = document.querySelector(".dropdown-content");
  var documentsdetail = document.querySelector("#table-body-docs");
  var name = document.querySelector("#title");

  if (message.for == "extension") {
    if (message.data.length != 0) {
      globaldata = message.data;
      databasenames.innerHTML = "";

      //Loop through the received data from the background.js
      message.data.forEach(function (databaseName) {
        var newdatabase = document.createElement("h4");
        newdatabase.id = databaseName;
        newdatabase.textContent = databaseName;
        newdatabase.focus = "hover";
        databasenames.appendChild(newdatabase);

        //Add a click event listener for each database name
        let row = document.querySelector(`#${databaseName}`);
        row.addEventListener("click", async (e) => {
          await chrome.runtime.sendMessage({
            data: e.srcElement.innerHTML,
            to: "background",
          });
        });
      });

      sendResponse("Ok so the popup.js has functioned properly");
    }
  } else {
    if (message.data.length != 0) {
      name.innerHTML = `Database:${message.databasename}`;
      documentsdetail.innerHTML = "";
      var originalrow = document.createElement("tr");
      var originalcell = document.createElement("td");
      var originalcell2 = document.createElement("td");
      originalcell.textContent = "_id";
      originalcell2.textContent = "doc";
      originalrow.appendChild(originalcell);
      documentsdetail.appendChild(originalrow);

      let keys = [];
      let values = [];
      let count = 0;

      //Loop through the received data from the background.js
      message.data.forEach(function (doc) {
        var newRow = document.createElement("tr");
        var newCell = document.createElement("td");
        var newCell2 = document.createElement("td");
        newCell.textContent = doc.key;
        keys.push(doc.key);
        newCell.id = `ok-${count}`;
        count++;
        newCell2.textContent = JSON.stringify(doc.value);
        values.push(JSON.stringify(doc.value, null, 2));
        newRow.appendChild(newCell);
        documentsdetail.appendChild(newRow);
      });

      addlisteners2(keys, values);
      sendResponse("Ok so the popup.js has functioned properly");
    }
  }
});

function addlisteners2(keys, values) {
  console.log("Ok so the event listeners are being added");
  keys.forEach((element, index) => {
    let row = document.querySelector(`#ok-${index}`);
    row.addEventListener("click", async (e) => {
      //Now when the specific row is clicked the doc related to that row is displayed
      let bottom = document.querySelector("#bottom-section");
      bottom.textContent = values[index];
      console.log("This is the value corresponding to the key", values[index]);
    });
  });
}

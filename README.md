Fireproof Chrome Extension

The intent behind building this chrome extension comes from a personal experience of building applications with fireproof hooks and APIs. As a beginner react developer who is making use of fireproof for databases, constantly uploading, deleting, and updating documents using the react hooks, fireproof chrome extension would be a great place to look at the existing state of all the databases and get details about the documents present inside each database without having to install any external library or add new code to the existing system just at the comfort of the chrome devtools. This extension is as integral to the product as the react query devtools is to react-query.
The development of the extension begins with an empty git repository. The first important step is to create a manifest.json file. This file includes all the configurations and the extension’s capabilities in one place. Some of the important fields in manifest file are:
a)	Metadata such as version, name, description etc
b)	permissions which include a list of all the resources the extension has access to such as whether the extension can access the storage, tabs of the current browser tab.
c)	The content script and service workers that are a part of the chrome extension
In our scenario, once we have defined the parameters for the manifest file, the next step is to write the content script.
Generally, the content script is injected by the extension and it runs whenever one does a page refresh. In our scenario, we need to create a tab within the chrome dev tools and to do so there is another function inside the chrome APIs known as chrome.devtools.panels.create. The important parameters to pass here are: 
a)	The name, image and the HTML file that will be displayed inside the tab
b)	We can also make the content script execute as soon as the tab is loaded using the chrome. scripting.executeScript function


Coming back to content scripts, these are files that run in the context of web pages. They use the standard Document Object Model (DOM), to read details of web pages the browser visits, make changes to them, and pass information to their parent extension.
Once the logic of the content script is written using the fireproof extension, the content script is injected into the application.
What is the logic of content script?
The primary purpose of it is query the local storage of the application and find the names of all the databases by looking at the “fp.0.14. meta.” key of all the existing databases. In case the fireproof API version updates, the content script code would need an upgrade in versioning as well. Now the content script has access to all those db names stored inside an array
The content script can access all the chrome APIs. Once such API is the chrome runtime and this script calls the function chrome.runtime.sendMessage (arr) to pass the array to all the event listeners that are present inside the extension. 
Now this array is passed to the background script of the extension that is running and it has an event Listener that listens and accepts such events.
What is the purpose of background JavaScript file?
In this scenario, it is like a service worker running in the background and it acts as a middleman between the content script and the js file that interacts and manipulates the DOM of the HTML file that is displayed inside the devtools.
Now the background script sends this data to main.js file which using DOM manipulation adds the database names to the HTML and it also adds an event handler to each of the database HTML element. 
Now whenever a user clicks on one of the databases, via background, the clicked db is sent back to the content-script. For getting back all the documents within that clicked database, we need to make use of the fireproof npm package
However, as content-script does not have access to the node modules, therefore we bundle the fireproof package and the content script using a bundler such as babel and now we have a bundled content script. It is this bundled script that is injected to the application. 
Now once it uses the fireproof function to fetch all the documents, it again sends the data to background which is sent to popup.js file. Now again, it loops through all the documents and adds the content to the HTML file. Also for every document it creates an event listener such that whenever the id of that document is being clicked, more details about its content is displayed on the rightmost section of the HTML file.

 

A typical output:
 

How to run the extension locally?
1)	Fork this repository and download the source code
2)	Now go to chrome://extensions and click on load unpacked
3)	Load the downloaded folder
4)	You are good to go! Use the extension for any application using fireproof APIs or hooks


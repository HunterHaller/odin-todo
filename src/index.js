//Remember: good modules are defined by what they DO, not what they ARE.
//Loosely coupled modules do not directly talk to and see each other.

import "./styles.css";
import { startEventListeners } from "./js-modules/event-listeners.js";
import { initialList } from "./js-modules/list-manager.js";
import { addHeader, updateDOM } from "./js-modules/dom-update.js";
import { allProjects, storageCheck, updateInstanceProjectsTasks, updateStorageProjectsTasks } from "./js-modules/storage-manager.js";

//localStorage.clear();
//console.log("!!!storage cleared!!!")

storageCheck();

let username;

//If the page is being loaded for the first time,
if (!localStorage.getItem("returningUser")){
    username = prompt("Enter your username:", "User");
    localStorage.setItem("username", username);

    console.log("Creating default list and task...");
    initialList(); //Create the default list
} else {
    console.log("Username already set! User has been here before. Setting instance copy of username to " + localStorage.getItem("username"));
    username = localStorage.getItem("username");
    updateInstanceProjectsTasks();
    console.log("Successfully updated local lists of projects and tasks! Proceeding to render...");
    console.log("To test, allProjects = " + allProjects)
}

if ((username == null) || (username == "")){
    localStorage.setItem("username", "Default User");
    username = "Default User";
}

addHeader(username);
updateDOM();
startEventListeners();
//Remember: good modules are defined by what they DO, not what they ARE.
//Loosely coupled modules do not directly talk to and see each other.

import "./styles.css";
//import { Task } from "./js-modules/task-class.js";
import { initialList, allProjects, allTasks } from "./js-modules/list-manager.js";
import { addHeader } from "./js-modules/dom-update.js";
import { updateDOM } from "./js-modules/dom-update.js";

localStorage.clear();
let username;

//If the page is being loaded for the first time,
if (!localStorage.getItem("username")){
    //localStorage.setItem("firstRun", false); //create a localStorage flag to tell us that the app has been instantiated
    username = prompt("Enter your username:", "Hunter");
    localStorage.setItem("username", username);

    console.log("Creating default list and task...");
    initialList(); //create the default list
} else {
    username = localStorage.getItem("username");
}

if ((username == null) || (username == "")){
    localStorage.setItem("username", "Default User");
    username = "Default User";
}

addHeader(username);
updateDOM();
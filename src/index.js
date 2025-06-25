//Remember: good modules are defined by what they DO, not what they ARE.
//Loosely coupled modules do not directly talk to and see each other.

import "./styles.css";
//import { Task } from "./js-modules/task-class.js";
import { initialList, allProjects } from "./js-modules/list-manager.js";
import { addHeader } from "./js-modules/dom-update.js";

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





//ARRAY EXPERIMENT
if (!localStorage.getItem("myArray")){
    console.log("ARRAY EXPERIMENT")
    let myArray = [];
    localStorage.setItem("myArray", myArray);
    console.log("in code array: " + myArray);
    console.log("in storage array: " + localStorage.getItem("myArray"));
    myArray.push(localStorage.getItem("defaultList"));
    myArray.push(localStorage.getItem("defaultList1"));
    localStorage.setItem("myArray", myArray);
    console.log("in code array: " + myArray);
    console.log("in storage array: " + localStorage.getItem("myArray"));
    console.log(JSON.parse(localStorage.getItem("defaultList")));
    console.log(JSON.parse(localStorage.getItem("defaultList1")));
}

console.log("INDEX.JS ALLPROJECTS EXPERIMENT");
if (!localStorage.getItem("allProjects")){
    console.log("Adding allProjects to storage for the first time!");
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    console.log("Pulled from storage, allProjects reads as " + JSON.parse(localStorage.getItem("allProjects")));
} else {
    console.log("allProjects found in local storage!");
    console.log("Before, pulling, allProjects locally = " + allProjects)
    allProjects = JSON.parse(localStorage.getItem("allProjects"));
    console.log("Pulled from storage, local copy of allProjects contains " + allProjects);
}
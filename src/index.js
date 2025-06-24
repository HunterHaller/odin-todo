//Remember: good modules are defined by what they DO, not what they ARE.
//Loosely coupled modules do not directly talk to and see each other.

import "./styles.css";
//import { Task } from "./js-modules/task-class.js";
import { initialList } from "./js-modules/list-manager.js";
import { addHeader } from "./js-modules/dom-update.js";

localStorage.clear();
let username;

//If the page is being loaded for the first time,
if (!localStorage.getItem("firstRun")){
    localStorage.setItem("firstRun", false); //create a localStorage flag to tell us that the app has been instantiated
    username = prompt("Enter your username:", "Harry Mason");
    localStorage.setItem("username", username);
    initialList(); //create the defaul list
}

if (username == null){
    username = "Default User";
}

addHeader(username);

if (!localStorage.getItem("myArray")){
    let myArray = [];
    localStorage.setItem("myArray", myArray);
    console.log("in code array: " + myArray);
    console.log("in storage array: " + localStorage.getItem("myArray"));
    myArray.push(localStorage.getItem("defaultList"));
    myArray.push(localStorage.getItem("defaultTask"));
    localStorage.setItem("myArray", myArray);
    console.log("in code array: " + myArray);
    console.log("in storage array: " + localStorage.getItem("myArray"));
}
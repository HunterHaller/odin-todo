import { Task } from "./task-class.js";

let allLists = [];

//makeList()
//This function creates an empty array that will be parsed into the DOM as
//  an empty (at first) to-do list that can be added to. It also adds the list
//  to a list of to-do lists.
//  Returns an empty array.
function makeList(listName){
    //Declare a new empty array with name "listName"
    //Add that list to global list of lists
    const newList = [];
    //newList.push(123);
    allLists.push(newList);
    console.log("allLists now contains " + allLists)
    return newList;
}

//addTask()
//This function adds a task with label "taskName" to the list identified by
//  "targetList"
function addTask(targetList, targetTask){
    //Find list with name "targetList"
    //Add task with label "taskName" to that list.
    //Note that task is an object! Tasks will need to be objects, and be able
    //  to be stored in json.
    targetList.push(targetTask);
    console.log("List now contains " + targetList)
}

//initialList()
//This function always runs on pageload and checks whether the user has any
//  list info stored in browserstorage. If there's nothing (i.e. this is the
//  first usage of the page), this function creates an initial list called "My
//  First List" and adds a default task to it.
export function initialList() {
    //If nothing in broswerstorage:
        //let myFirstList = makeList("My First List")
        let defaultList = makeList(); //declare a new list called defaultList
        const defaultTask = new Task("Do Laundry", "Gotta wash those clothes!", "May 5, 2027", "HIGH");
        console.log("Default task declared with title " + defaultTask.title);
        addTask(defaultList, defaultTask);
};
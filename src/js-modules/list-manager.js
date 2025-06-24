import { Task } from "./task-class.js";
import { Project } from "./project-class.js";

let allProjects = [];

//makeList()
//This function creates an empty array that will be parsed into the DOM as
//  an empty (at first) to-do list that can be added to. It also adds the list
//  to a list of to-do lists.
//  Returns an empty array.
function makeProject(projectName){
    //Declare a new project with name "projectName"
    let newProject = new Project(projectName);
    console.log("New project created with name " + newProject.title)

    //Add that list to global list of projects
    allProjects.push(newProject);
    console.log("allProjects now contains " + allProjects[0].title)

    return newProject;
}

//addTask()
//This function adds a task with label "taskName" to the list identified by
//  "targetList"
//function addTask(targetList, targetTask){
    //Find list with name "targetList"
    //Add task with label "taskName" to that list.
    //Note that task is an object! Tasks will need to be objects, and be able
    //  to be stored in json.
    //targetList.push(targetTask);
    //console.log("List now contains " + targetList)
//}

//initialList()
//This function always runs on pageload and checks whether the user has any
//  list info stored in browserstorage. If there's nothing (i.e. this is the
//  first usage of the page), this function creates an initial list called "My
//  First List" and adds a default task to it.
export function initialList() {
    //If nothing in broswerstorage:
    if (!localStorage.getItem("defaultList")){
        //let myFirstList = makeList("My First List")
        let defaultList = makeProject("Default"); //declare a new list called defaultList
        const defaultTask = new Task("defaultList", "Do Laundry", "Gotta wash those clothes!", "May 5, 2027", "HIGH");
        console.log("Default task declared with title '" + defaultTask.title + "'");

        localStorage.setItem("defaultList", JSON.stringify(defaultList));
        localStorage.setItem("defaultList1", JSON.stringify(defaultTask));
        console.log(JSON.parse(localStorage.getItem("defaultList")));
        console.log(JSON.parse(localStorage.getItem("defaultList1")));

        console.log(defaultTask);
    }
};
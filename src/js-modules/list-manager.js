import { Task } from "./task-class.js";
import { Project } from "./project-class.js";

export let allProjects = [{title: "The List", tasks: null}];
export let allTasks = [];

console.log(allProjects)

localStorage.clear();

if (!localStorage.getItem("allProjects")){
    console.log("Adding allProjects to storage for the first time!");
    console.log("Locally, allProjects = " + allProjects)
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    console.log("Pulled from storage, allProjects reads as " + JSON.parse(localStorage.getItem("allProjects")));
} else {
    console.log("allProjects found in local storage!");
    allProjects = JSON.parse(localStorage.getItem("allProjects"));
    console.log("Pulled from storage, local copy of allProjects contains " + allProjects);
}

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
    //allProjects.push(newProject);
    console.log("allProjects now contains " + allProjects[0].title)

    localStorage.setItem("allProjects", allProjects);

    return newProject;
}

//addTask()
//This function adds a task with label "taskName" to the list identified by
//  "targetList"
function addTask(targetList, targetTask){
    //Find list with name "targetList"
    //Add task with label "taskName" to that list.
    //Note that task is an object! Tasks will need to be objects, and be able
    //  to be stored in json.
    //targetList.taskList.push(targetTask);
    allTasks.push(targetTask);
    console.log("List now contains " + targetList);
}

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

        addTask(defaultList, defaultTask);

        localStorage.setItem("defaultList", JSON.stringify(defaultList));
        localStorage.setItem("defaultList1", JSON.stringify(defaultTask));
        console.log(JSON.parse(localStorage.getItem("defaultList")));
        console.log("The task as parsed from storage: " + JSON.parse(localStorage.getItem("defaultList1")));

        console.log("Just the task object itself: " + defaultTask);
    }
};
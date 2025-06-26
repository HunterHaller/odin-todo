import { Task } from "./task-class.js";
import { Project } from "./project-class.js";

export let allProjects = [];
export let allTasks = [];

console.log(allProjects)

localStorage.clear();

if (!localStorage.getItem("allProjects")){
    console.log("Adding allProjects to storage for the first time!");
    console.log("Locally, allProjects = " + allProjects)
    localStorage.setItem("allProjects", allProjects);
    console.log("Pulled from storage, allProjects reads as " + localStorage.getItem("allProjects"));
} else {
    console.log("allProjects found in local storage!");
    allProjects = JSON.parse(localStorage.getItem("allProjects"));
    console.log("Pulled from storage, local copy of allProjects contains " + allProjects);
}

//makeProject()
//This function creates an empty array that will be parsed into the DOM as
//  an empty (at first) to-do list that can be added to. It also adds the list
//  to a list of to-do lists.
//  Returns an empty array.
function makeProject(projectName){
    //Declare a new project with name "projectName"
    let newProject = new Project(projectName);
    console.log("New project created with name " + newProject.title)

    //Add that list to global list of projects
    allProjects.push(newProject.title);
    console.log("allProjects contents: " + allProjects)

    console.log("Stringifying allProjects into storage...")
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    console.log("Pulled from storage, allProjects reads as " + JSON.parse(localStorage.getItem("allProjects")));

    return newProject;
}

//addTask()
//This function adds a task with label "taskName" to the list identified by
//  "targetList"
function addTask(taskProject, taskTitle, taskDescription, taskDate, taskPriority){
    //Find list with name "targetProject"
    //Add task with label "taskTitle" to that list.
    const newTask = new Task(taskProject, taskTitle, crypto.randomUUID(), taskDescription, taskDate, taskPriority);
    console.log("Task declared with title '" + newTask.title + "'");
    
    allTasks.push(newTask.id); //add this new task's unique ID to the allTasks array
    localStorage.setItem("allTasks", allTasks);

    taskProject.taskList.push(newTask.id);
    console.log("List " + taskProject.title + " now contains task with ID " + taskProject.taskList[0]);
    console.log("Full task readout below:");
    console.log(newTask);

    return newTask;
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
        let defaultList = makeProject("Default"); //declare a new list called Default
        let defaultTask1 = addTask(defaultList, "Do Laundry", "Gotta wash those clothes!", "May 5, 2027", "HIGH");
        let defaultTask2 = addTask(defaultList, "Wash dishes", "Gotta wash those dishes!", "May 6, 2027", "LOW");

        let anotherList = makeProject("Another Project");

        localStorage.setItem(defaultList.title, defaultList.taskList);
        console.log("List " + defaultList.title + "'s taskList in localStorage: " + localStorage.getItem(defaultList.title));
        
        localStorage.setItem(defaultTask1.id, JSON.stringify(defaultTask1));
        localStorage.setItem(defaultTask2.id, JSON.stringify(defaultTask2));
        console.log("The task as parsed from storage: " + JSON.parse(localStorage.getItem(defaultTask1.id)));

        console.log("Just the task object itself: " + defaultTask1);
    }
};
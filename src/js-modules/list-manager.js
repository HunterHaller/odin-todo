import { Task } from "./task-class.js";
import { Project } from "./project-class.js";
import { allProjects, allTasks, updateStorageProjectsTasks, updateInstanceProjectsTasks } from "./storage-manager.js";

localStorage.clear();

console.log("allP and allT have been imported. Printing:");
console.log("allProjects local = " + allProjects);

if (!localStorage.getItem("allProjects")){
    console.log("Adding allProjects to storage for the first time!");
    //console.log("Locally, allProjects = " + allProjects)
    //console.log("Pulled from storage, allProjects reads as " + localStorage.getItem("allProjects"));
} else {
    console.log("allProjects found in local storage! As it exists there, it's " + localStorage.getItem("allProjects"));
    updateInstanceProjectsTasks();
    //console.log("Pulled from storage, local copy of allProjects contains " + allProjects);
}

//makeProject()
export function makeProject(projectName){
    //Declare a new project with name "projectName"
    let newProject = new Project(projectName);
    console.log("New project created with name " + newProject.title)

    //Add that list to global list of projects
    allProjects.push(newProject.title);
    console.log("allProjects contents: " + allProjects);

    console.log("Putting allProjects into storage...");
    updateStorageProjectsTasks();
    console.log("Pulled from storage, allProjects reads as " + JSON.parse(localStorage.getItem("allProjects")));

    localStorage.setItem(newProject.title, JSON.stringify(newProject));

    return newProject;
}

//addTask - This function adds a task with label "taskName" to the list 
// identified by "targetList"
function addTask(taskProject, taskTitle, taskDescription, taskDate, taskPriority){
    //Find list with name "targetProject"
    //Add task with label "taskTitle" to that list.
    const newTask = new Task(taskProject, taskTitle, crypto.randomUUID().substring(0, 5), taskDescription, taskDate, taskPriority);
    console.log("Task declared with title '" + newTask.title + "'");
    
    allTasks.push(newTask.id); //add this new task's unique ID to the allTasks array
    updateStorageProjectsTasks();

    taskProject.taskList.push(newTask.id);
    console.log("List " + taskProject.title + " now contains task with ID " + taskProject.taskList[0]);
    console.log("Full task readout below:");
    console.log(newTask);

    localStorage.setItem(newTask.id, JSON.stringify(newTask));

    return newTask;
}

//initialList()
//This function always runs on pageload and checks whether the user has any
//  list info stored in browserstorage. If there's nothing (i.e. this is the
//  first usage of the page), this function creates an initial list called "My
//  First List" and adds a default task to it.
export function initialList() {
    //If nothing in browserstorage:
    if (!localStorage.getItem("defaultList")){
        //let myFirstList = makeList("My First List")
        let defaultList = makeProject("Default"); //declare a new list called Default
        addTask(defaultList, "Do Laundry", "Gotta wash those clothes!", "May 5, 2027", "HIGH");
        addTask(defaultList, "Wash dishes", "Gotta wash those dishes!", "May 6, 2027", "LOW");

        console.log("List " + defaultList.title + "'s taskList in localStorage: " + localStorage.getItem(defaultList.title));
    }
};
import { createTask } from "./task-factory.js";
import { allProjects, allTasks, updateStorageProjectsTasks } from "./storage-manager.js";

//makeProject()
export function makeProject(projectName) {
    //Add project to global list of projects
    allProjects.push(projectName);
    console.log("allProjects contents: " + allProjects);

    console.log("Putting allProjects into localStorage...");
    updateStorageProjectsTasks();
    console.log("Pulled from storage, allProjects reads as " + JSON.parse(localStorage.getItem("allProjects")));
}

//addTask(): This function adds a task with title "taskName" to the list identified by "targetList"
export function addTask(taskProject, taskTitle, taskDescription, taskDate, taskPriority) {
    //Find list with name "targetProject"
    //Add task with label "taskTitle" to that list.

    const newTask = createTask(taskProject, taskTitle, crypto.randomUUID().substring(0, 5), taskDescription, taskDate, taskPriority, "False");

    console.log("Task declared with title '" + newTask.title + "'");
    console.log("Completion status at start: " + newTask.getCompletion());

    console.log("Provided due date: " + taskDate)
    console.log("Task's due date: " + newTask.dueDate)

    allTasks.push(newTask.id); //Add this new task's unique ID to the allTasks array.
    updateStorageProjectsTasks(); //Save the newly updated allTasks list to localStorage.

    console.log("Full task readout below:");
    console.log(newTask);

    localStorage.setItem(newTask.id, JSON.stringify(newTask)); //Save the task itself in localStorage.

    return newTask; //Is this necessary?
}

//initialList()
//This function always runs on pageload and checks whether the user has any
//  list info stored in browserstorage. If there's nothing (i.e. this is the
//  first usage of the page), this function creates an initial list called "My
//  First List" and adds a default task to it.
export function initialList() {
    let defaultList = makeProject("Default"); //declare a new list called Default
    addTask("Default", "Do Laundry", "Gotta wash those clothes!", new Date("2025-11-23"), "HIGH");
    addTask("Default", "Wash dishes", "Gotta wash those dishes!", new Date("2027-03-25"), "LOW");

    localStorage.setItem("returningUser", "True");
};
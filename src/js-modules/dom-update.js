// domUpdate.js
import { allProjects, allTasks, updateInstanceProjectsTasks } from "./storage-manager.js";
import trashIcon from "../img/trash-can.svg";
import { Task } from "./task-class.js";

export function addHeader(usernameText) {
    let usernameHeader = document.createElement("h1");
    usernameHeader.textContent = "Welcome, " + usernameText + "! What needs doing today?";
    document.querySelector("#headerDiv").appendChild(usernameHeader);
}

function clearProjectsDiv() {
    document.querySelector("#projectsDiv").textContent = "";
}

function completeTask(taskObj, domElement) {
    console.log("Toggling task " + taskObj.title + "...");
    taskObj.toggleComplete();
    domElement.classList.toggle("completed")

    localStorage.setItem(taskObj.id, JSON.stringify(taskObj));
};

export function updateDOM() {

    clearProjectsDiv();

    let projectsDiv = document.querySelector("#projectsDiv");
    let dropdownProjects = document.querySelector("#projectSelect");

    allProjects.forEach((project) => {

        let newProjectDiv = document.createElement("div");
        newProjectDiv.setAttribute("class", "project");
        newProjectDiv.setAttribute("id", project.replaceAll(" ", ""));

        let newProjectHeader = document.createElement("h1");
        newProjectHeader.textContent = project;

        projectsDiv.appendChild(newProjectDiv);
        newProjectDiv.appendChild(newProjectHeader);

        //Also add project to the dropdown list for adding new tasks
        if (!document.querySelector("#" + project.replaceAll(" ", "") + "InList")) {

            let newProjectOption = document.createElement("option");
            newProjectOption.textContent = project;
            newProjectOption.setAttribute("value", project);
            newProjectOption.id = (project.replaceAll(" ", "") + "InList");

            dropdownProjects.appendChild(newProjectOption);

            console.log("Added " + project + " to new task dialog!")
        } else {
            console.log("Item already present in dialog! Skipping...")
        }
    });

    allTasks.forEach((taskID) => {

        console.log("Working with task ID " + taskID);

        //this retrieves the stored version of the task object, which is NOT a Task object
        let newTaskBasicObj = JSON.parse(localStorage.getItem(taskID));
        console.log(newTaskBasicObj);

        //converts the stored regular object into a proper Task object
        let newTaskObj = new Task(newTaskBasicObj.project, newTaskBasicObj.title, newTaskBasicObj.id, newTaskBasicObj.description, newTaskBasicObj.dueDate, newTaskBasicObj.priority)

        //I forgot that in creating a new Task, the "complete" flag always gets set to false.
        //This should fix it:
        if (newTaskBasicObj.complete == true){
            newTaskObj.complete = true;
        }


        console.log("Full new task parameters:")
        console.log(newTaskObj);

        let parentDiv = document.querySelector("#" + newTaskObj.project.replaceAll(" ", ""));

        let newTaskDiv = document.createElement("div");
        newTaskDiv.setAttribute("class", "task");

        let newTaskCheckbox = document.createElement("input")

        switch (newTaskObj.priority) {
            case "LOW":
                newTaskCheckbox.setAttribute("class", "lowPriority");
        }

        let newTaskLabel = document.createElement("label");
        newTaskLabel.textContent = newTaskObj.title;
        newTaskLabel.setAttribute("for", newTaskObj.title);

        const newTaskDeleteButton = document.createElement("img");
        newTaskDeleteButton.src = trashIcon;
        newTaskDeleteButton.setAttribute("class", "trashIcon " + newTaskObj.id);
        ;
        newTaskCheckbox.setAttribute("type", "checkbox");
        newTaskCheckbox.setAttribute("id", newTaskObj.title);
        newTaskCheckbox.setAttribute("name", newTaskObj.title);
        newTaskCheckbox.onclick = function () {
            completeTask(newTaskObj, newTaskDiv);
        }
        newTaskCheckbox.setAttribute("class", "taskCheckbox");


        //Check if task is already complete. If so, precheck checkbox and give appropriate class
        if (newTaskObj.complete == true) {
            console.log("Task already done! Pre-checking box...");
            newTaskCheckbox.setAttribute("checked", "");
            newTaskDiv.classList.toggle("completed");
        } else {
            console.log("Task not done yet!")
        }

        parentDiv.appendChild(newTaskDiv);
        newTaskDiv.appendChild(newTaskCheckbox);
        newTaskDiv.appendChild(newTaskLabel);
        newTaskDiv.appendChild(newTaskDeleteButton);
    })
}
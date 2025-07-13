// domUpdate.js
import { allProjects, allTasks } from "./storage-manager.js";
import trashIcon from "../img/trash-can.svg";

export function addHeader(usernameText) {
    let usernameHeader = document.createElement("h1");
    usernameHeader.textContent = "Welcome, " + usernameText + "! What needs doing today?";
    document.querySelector("#headerDiv").appendChild(usernameHeader);
}

function clearDOM() {
    document.querySelector("#projectsDiv").textContent = "";
}

export function updateDOM() {

    clearDOM();

    console.log("Starting updateDOM()");
    console.log("At present, allProjects contains " + allProjects);

    allProjects.forEach((project) => {
        let projectsDiv = document.querySelector("#projectsDiv");
        console.log("Rendering project " + project + "...")

        let newProjectDiv = document.createElement("div");
        newProjectDiv.setAttribute("class", "project");
        newProjectDiv.setAttribute("id", project);

        let newProjectHeader = document.createElement("h1");
        newProjectHeader.textContent = project;

        projectsDiv.appendChild(newProjectDiv);
        newProjectDiv.appendChild(newProjectHeader);
    });

    allTasks.forEach((taskID) => {

        console.log("Working with task ID " + taskID);

        let newTaskObj = JSON.parse(localStorage.getItem(taskID));

        console.log(newTaskObj)

        console.log("Acquired task with title " + newTaskObj.title);

        let parentDiv = document.querySelector("#" + newTaskObj.project.title);

        let newTaskDiv = document.createElement("div");
        newTaskDiv.setAttribute("class", "task");

        let newTaskCheckbox = document.createElement("input");
        newTaskCheckbox.setAttribute("type", "checkbox");
        newTaskCheckbox.setAttribute("id", newTaskObj.title);
        newTaskCheckbox.setAttribute("name", newTaskObj.title);
        newTaskCheckbox.setAttribute("onclick", newTaskObj.id + ".toggleComplete()");
        newTaskCheckbox.setAttribute("class", "taskCheckbox")

        switch (newTaskObj.priority){
            case "LOW":
                newTaskCheckbox.setAttribute("class", "lowPriority");
        }

        let newTaskLabel = document.createElement("label");
        newTaskLabel.textContent = newTaskObj.title;
        newTaskLabel.setAttribute("for", newTaskObj.title);
        
        const newTaskDeleteButton = document.createElement("img");
        newTaskDeleteButton.src = trashIcon;
        newTaskDeleteButton.setAttribute("class", "trashIcon");

        if (newTaskObj.complete == true){
            console.log("Task already done! Pre-checking box...");
            newTaskCheckbox.setAttribute("checked", "");
            newTaskDiv.setAttribute("class", "completed");
        }

        parentDiv.appendChild(newTaskDiv);
        newTaskDiv.appendChild(newTaskCheckbox);
        newTaskDiv.appendChild(newTaskLabel);
        newTaskDiv.appendChild(newTaskDeleteButton);
    })
}
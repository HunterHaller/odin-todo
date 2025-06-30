// domUpdate.js
import { allProjects, allTasks } from "./storage-manager.js";

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

    console.log("Array lengths:")
    console.log(allProjects.length);
    console.log(allTasks.length);

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


        //projectsDiv.appendChild(renderedProject);
    });

    allTasks.forEach((taskID) => {

        console.log("Working with task ID " + taskID);

        let newRenderedTask = document.createElement("div");
        let newTaskObj = JSON.parse(localStorage.getItem(taskID));

        console.log(newTaskObj)

        console.log("Acquired task with title " + newTaskObj.title);

        let parentDiv = document.querySelector("#" + newTaskObj.project.title);

        let newTaskHeader = document.createElement("h3");
        newTaskHeader.textContent = newTaskObj.title;

        parentDiv.appendChild(newTaskHeader);
    })
}
// domUpdate.js
import { allProjects, allTasks } from "./list-manager";

export function addHeader(usernameText) {
    let usernameHeader = document.createElement("h1");
    usernameHeader.textContent = "Welcome, " + usernameText + "! What needs doing today?";
    document.querySelector("#headerDiv").appendChild(usernameHeader);
}

export function updateDOM() {

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
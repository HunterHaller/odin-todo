// domUpdate.js
//import { allProjects } from "./list-manager";

export function addHeader(usernameText){
    let usernameHeader = document.createElement("h1");
    usernameHeader.textContent = "Welcome, " + usernameText + "! What needs doing today?";
    document.querySelector("#headerDiv").appendChild(usernameHeader);
}

export function updateDOM(){
    allProjects.forEach((project) => {
        let projectsDiv = document.querySelector("#projectsDiv");
        
        let renderedProject = document.createElement("div");


        projectsDiv.appendChild(renderedProject);
    }) 
}
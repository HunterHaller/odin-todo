import { makeProject } from "./list-manager";
import { allProjects } from "./storage-manager";
import { updateDOM } from "./dom-update";

export function startEventListeners() {
    let newProjButton = document.querySelector("#newProjButton");
    newProjButton.addEventListener("click", function () {
        let newListName = prompt("Enter a name for your new project:", "My Project");
        for (let i = 0; i < allProjects.length; i++) {
            if (newListName == allProjects[i]) {
                newListName = newListName + "(1)";
            }
        }
        if ((newListName == null) || (newListName == "")) {
            console.log("Project creation cancelled");
        } else {
            makeProject(newListName);
            updateDOM();
        }
    })
}
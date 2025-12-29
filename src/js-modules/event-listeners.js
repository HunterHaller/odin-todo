import { makeProject } from "./list-manager";
import { allProjects } from "./storage-manager";
import { updateDOM } from "./dom-update";
import { allTasks } from "./storage-manager";
import { addTask } from "./list-manager";
import { updateStorageProjectsTasks } from "./storage-manager";

export function startEventListeners() {
    let newProjButton = document.querySelector("#newProjButton");
    let newTaskButton = document.querySelector("#newTaskButton");
    const dialogForm = document.querySelector("#newTaskDialog");
    const submitTaskButton = document.querySelector("#submitTaskButton");
    let inputDate;

    newProjButton.addEventListener("click", function () {
        let newListName = prompt("Enter a name for your new project:", "My Project");
        let listIterations = 0;
        for (let i = 0; i < allProjects.length; i++) {
            if (allProjects[i].includes(newListName)) {
                listIterations++;
            }
        }
        if ((newListName == null) || (newListName == "")) {
            console.log("Project creation cancelled");
        } else {
            if (listIterations < 1) {
                makeProject(newListName);
            } else {
                makeProject(newListName + " (" + listIterations + ")")
            }
            updateDOM();
        }
    });

    newTaskButton.addEventListener("click", function () {
        //Clicking this button opens the new task dialog
        dialogForm.showModal();
    });

    submitTaskButton.addEventListener("click", function () {
        const newTitle = document.querySelector("#title").value;
        const newDate = inputDate;
        const newPriority = document.querySelector("#priority").value;
        const newDescription = document.querySelector("#description").checked;
        const newAssignedProject = document.querySelector("#projectSelect").value;

        addTask(newAssignedProject, newTitle, newDescription, newDate, newPriority);

        updateDOM();
    })

    let projectsDiv = document.querySelector("#projectsDiv");
    projectsDiv.addEventListener("click", (e) => {
        let target = e.target;
        console.log("You clicked on a " + target.className);

        if (target.classList.contains("downIcon")) {
            //target.classList.toggle("collapsed");
            var content = target.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }

        if (target.classList.contains("trashIcon")) {
            console.log("Trash time!")

            let thisTask = target.classList[1];
            console.log("This trash belongs to id " + thisTask);

            const objToDelete = JSON.parse(localStorage.getItem(thisTask));
            console.log("Retrieved task " + objToDelete.title + " which is in project " + objToDelete.project)

            const allTasksIndex = allTasks.indexOf(thisTask);
            if (allTasksIndex > -1) { // only splice array when item is found
                console.log("Confirmed task is in allTasks list, removing now...");
                allTasks.splice(allTasksIndex, 1); // find task in allTasks and remove it
                updateDOM();
                updateStorageProjectsTasks();
                localStorage.removeItem(thisTask);
            }

        }
    })
    

    document.querySelector("#dueDate").addEventListener("change", function() {
        inputDate = new Date(this.value);
    })
}
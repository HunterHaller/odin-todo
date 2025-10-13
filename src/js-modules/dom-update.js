// domUpdate.js
import { allProjects, allTasks, updateInstanceProjectsTasks } from "./storage-manager.js";
import trashIcon from "../img/trash-can.svg";
import { createTask } from "./task-factory.js";


//addHeader: Creates a header element that uses the user's provided name and appends it to the DOM.
export function addHeader(usernameText) {
    let usernameHeader = document.createElement("h1");
    usernameHeader.textContent = "Welcome, " + usernameText + "! What needs doing today?";
    document.querySelector("#headerDiv").appendChild(usernameHeader);
}

//clearProjectsDiv: Wipes the div containing all projects clean.
function clearProjectsDiv() {
    document.querySelector("#projectsDiv").textContent = "";
}

//completeTask: When a checkbox is clicked, toggle the completion status of the attached task.
function completeTask(taskObj, domElement) {
    console.log("Toggling task " + taskObj.title + "...");
    console.log("Task completion status before toggling: " + taskObj.completion);
    taskObj.toggleComplete();
    domElement.classList.toggle("completed");

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

        //This retrieves the stored version of the task object, which is NOT a Task object (yet)
        let newBasicObj = JSON.parse(localStorage.getItem(taskID));

        //converts the stored regular object into a proper Task object
        let newTaskObj = createTask(newBasicObj.project, newBasicObj.title, newBasicObj.id, newBasicObj.description, newBasicObj.dueMonth, newBasicObj.dueDay, newBasicObj.dueYear, newBasicObj.priority, newBasicObj.completion)

        //I forgot that in creating a new Task, the "complete" flag always gets set to false.
        //This should fix it:
        if (newBasicObj.complete == true) {
            newTaskObj.complete = true;
        }

        let parentDiv = document.querySelector("#" + newTaskObj.project.replaceAll(" ", ""));

        let newTaskDiv = document.createElement("div");
        newTaskDiv.classList.add("task");

        let newTaskCheckbox = document.createElement("input")

        console.log("This task's priority is " + newTaskObj.priority);
        //Assign appropriate priority class
        switch (newTaskObj.priority) {
            case "LOW":
                newTaskDiv.classList.add("lowPriority");
                break;
            case "NORMAL":
                newTaskDiv.classList.add("normalPriority");
                break;
            case "HIGH":
                newTaskDiv.classList.add("highPriority");
                break;
            default:
                console.log("No priority declared for task '" + newTaskObj.title + "', setting to NORMAL.");
                newTaskObj.priority = "NORMAL";
                newTaskDiv.classList.add("normalPriority");
                break;
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

        let newTaskDate = document.createElement("p");
        newTaskDate.textContent = newTaskObj.dueDate;

        let newTaskDescription = document.createElement("p");
        newTaskDescription.textContent = newTaskObj.description;

        parentDiv.appendChild(newTaskDiv);
        newTaskDiv.appendChild(newTaskCheckbox);
        newTaskDiv.appendChild(newTaskLabel);
        newTaskDiv.appendChild(newTaskDeleteButton);
        newTaskDiv.appendChild(newTaskDate);
        newTaskDiv.appendChild(newTaskDescription);
    })
}
export let allProjects = []; //These are both initially empty, but filled later.
export let allTasks = [];

export function updateStorageProjectsTasks(){
    console.log("STORAGE-MANAGER: Updating localStorage copies of allProjects and allTasks...")
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    console.log("Successfully saved projects and tasks to localStorage.");
}

export function updateInstanceProjectsTasks(){
    console.log("STORAGE-MANAGER: Loading allProjects and allTasks into instance from localStorage...");
    allProjects = JSON.parse(localStorage.getItem("allProjects"));
    allTasks = JSON.parse(localStorage.getItem("allTasks"));

    console.log("STORAGE-MANAGER: Locally, allProjects now contains: " + allProjects);
}

export function storageCheck() {
    if (!localStorage.getItem("allProjects")) { //If allProjects does not exist in localStorage,
        console.log("Adding allProjects to storage for the first time!");
        updateStorageProjectsTasks(); //save to it.
        //console.log("Locally, allProjects = " + allProjects)
        //console.log("Pulled from storage, allProjects reads as " + localStorage.getItem("allProjects"));
    } else { //If it DOES already exist,
        console.log("allProjects found in local storage! As it exists there, it's " + localStorage.getItem("allProjects"));
        updateInstanceProjectsTasks(); //load it in.
    }
}
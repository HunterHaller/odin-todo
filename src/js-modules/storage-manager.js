export let allProjects = [];
export let allTasks = [];

export function updateStorageProjectsTasks(){
    console.log("STORAGE-MANAGER: Updating localStorage copies of allProjects and allTasks...")
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

export function updateInstanceProjectsTasks(){
    console.log("STORAGE-MANAGER: Loading allProjects and allTasks into instance from localStorage...");
    allProjects = JSON.parse(localStorage.getItem(allProjects));
    allTasks = JSON.parse(localStorage.getItem(allTasks));

    console.log("STORAGE-MANAGER: Locally, allProjects = " + allProjects)
}
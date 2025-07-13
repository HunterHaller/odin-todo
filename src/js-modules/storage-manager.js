export let allProjects = [];
export let allTasks = [];

export function updateStorageProjectsTasks(){
    console.log("Updating localStorage copies of allProjects and allTasks...")
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

export function updateInstanceProjectsTasks(){
    console.log("Loading allProjects and allTasks into instance from localStorage...");
    allProjects = JSON.parse(localStorage.getItem(allProjects));
    allTasks = JSON.parse(localStorage.getItem(allTasks));
}
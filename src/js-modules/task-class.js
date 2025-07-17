export class Task {
    constructor(project, title, id, description, dueDate, priority) {
        this.project = project;
        this.title = title;
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
    }

    toggleComplete() {
        console.log("Toggling completion of task " + this.title);
        console.log("Current completion status: " + this.complete)
        if (this.complete == false) {
            this.complete = true;
            console.log("Congratulations! You completed the '" + this.title + "' task!");
            console.log("New completion status: " + this.complete);
        } else {
            this.complete = false;
            console.log("Task reopened. Back to the mines, eh?");
        }
    }
}
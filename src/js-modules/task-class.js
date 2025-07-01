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
        if (this.complete == false) {
            this.complete = true;
            console.log("Congratulations! You completed the '" + this.title + "' task!");
        } else {
            this.complete = false;
            console.log("Task reopened. Back to the mines, eh?");
        }
    }
}
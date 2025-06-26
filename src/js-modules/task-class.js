export class Task {
    constructor(project, title, id, description, dueDate, priority) {
        this.project = project;
        this.title = title;
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        //this.complete = false;
    }
}
//TASK OBJECT FACTORY

import { format, formatDistanceToNow } from "date-fns"; // for time formatting

export function createTask(project, title, id, description, dueMonth, dueDay, dueYear, priority, completion) {

    //New values:
    const timeCreated = new Date(); // Assigns the time created as the current date/time at moment of creation.

    //Methods:
    const timeSinceCreated = () => "Created " + formatDistanceToNow(timeCreated) + " ago."
    
    const printStandardDate = () => format(new Date(dueYear, dueMonth, dueDay), 'MM/dd/yyyy');
    
    //Note that this is necessary to accurately pull values that have changed! 
    //Just grabbing the basic completion value returns its original value only!
    const getCompletion = () => completion;

    const toggleComplete = function() {
        console.log("Current completion status: " + completion);
        if (completion == "False") {
            completion = "True";
            console.log("Congratulations! You completed the '" + title + "' task!");
            console.log("New completion status: " + completion);
        } else {
            completion = "False";
            console.log("Task reopened. Back to the mines, eh?");
            console.log("New completion status: " + completion);
        }
    }

    return { project, title, id, description, dueMonth, dueDay, dueYear, completion, priority, timeSinceCreated, printStandardDate, toggleComplete, getCompletion }
}

//Test task! Move this to index.js to test.
//createTask(project, title, id, description, dueMonth, dueDay, dueYear, priority, completion)
//const walkDog = createTask("something", "Walk the dog", 654646587, "Walk it!", 10, 13, 2025, "HIGH", "False");

//console.log(walkDog.title + walkDog.project + walkDog.completion);
//console.log("Due: " + walkDog.printStandardDate());
//console.log(walkDog.timeSinceCreated());
//walkDog.toggleComplete();

//console.log(walkDog.getCompletion());

//There should always be a default project to start with, but the user
//  should be able to create and delete projects.

//I need to be able to store lists as objects (as JSON) in localStorage!
//I also need to be able to store tasks!
//Can tasks be stored in the lists without organizing them as arrays?
//NOTE: Storage only works with strings.
//  For objects and arrays, use JSON.stringify()

export class Project {
    constructor (title){
        this.title = title;
        //this.taskList = [];
    }
}
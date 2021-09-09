import { getProjectsArray, loadProject, createProject } from "./ProjectModule";
class Todo{
    constructor(task, description, priority){
        this.task = task;
        this.description = description;
        this.priority = priority;
    }
}

var projects = getProjectsArray();
loadProject();
document.getElementById("createProject").onclick = createProject;

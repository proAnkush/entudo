import { getProjectsArray, loadProject, createProject, deleteProject } from "./ProjectModule";
import { createNewTask } from "./TaskModule";

// create project
var projects = getProjectsArray();
loadProject();
document.getElementById("createProject").onclick = createProject;


// add task
document.getElementById("showTaskForm").onclick = showTaskForm;
document.getElementById("cancelForm").onclick = hideForm;
document.getElementById("submitForm").onclick = submitForm;

// show form
function showTaskForm() {
    document.getElementById("input-todo").style.visibility = "visible";
}
function hideForm(){
    document.getElementById("input-todo").style.visibility = "hidden";
}
function submitForm(){
    // get input elements
    let taskNameInput = document.getElementById("taskNameInput");
    let taskDescInput = document.getElementById("taskDescInput");
    let taskPriorityInput = document.getElementById("priority");
    // get value from those elements
    let tName = taskNameInput.value;
    let tDesc = taskDescInput.value;
    let tPri = taskPriorityInput.value;
    // create a task with theses values
    let myTask = createNewTask(tName, tDesc, tPri);
    // reset input elements
    taskNameInput.value = "";
    taskDescInput.value = "";
    taskPriorityInput.value = "low";
    // process the task and hide the form
    console.log(myTask);
    hideForm();
}


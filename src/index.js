import { getProjectsArray, loadProject, createProject, deleteProject, addTaskToProject } from "./ProjectModule";
import { createNewTask } from "./TaskModule";

// TODO - fix no name tasks
// todo - delete task button
// todo - the project name input box looks horrible

// create project
loadProject();
document.getElementById("createProject").onclick = createProject;


// add task
document.getElementById("showTaskForm").onclick = showTaskForm;
document.getElementById("cancelForm").onclick = hideForm;
document.getElementById("submitForm").onclick = submitForm;

// show form
function showTaskForm() {
    document.getElementById("input-todo").style.visibility = "visible";
    let i = document.getElementById("showTaskForm").getAttribute("data");
    document.getElementById("submitForm").setAttribute("data", i);
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
    let projI = this.getAttribute("data");
    // create a task with theses values
    addTaskToProject(tName, tDesc, tPri, projI);
    // reset input elements
    clearForms();
    // process the task and hide the form
    hideForm();
}

function clearForms(){
    let taskNameInput = document.getElementById("taskNameInput");
    let taskDescInput = document.getElementById("taskDescInput");
    let taskPriorityInput = document.getElementById("priority");
    
    taskDescInput.value = "";
    taskNameInput.value = "";
    taskPriorityInput.value = "low";
}


import { createNewTask, createTaskTable } from "./TaskModule";
class Project{
    constructor(project, index){
        this.projectName = project;
        this.tasks = [];
        this.index = index;
    }
    getName() {
        return this.projectName;
    }
    setName(newName){
        this.projectName = newName;
    }
    addTodo(t){
        this.tasks.add(t);
    }
}
var projects = [];
projects.push(new Project("Pro1", projects.length));
projects.push(new Project("Pro2", projects.length));
projects.push(new Project("Pro3", projects.length));
function getProjectsArray() {
    return projects;
}

function createProject(){
    let projects = getProjectsArray();
    let projectNameInput = document.getElementById("formProjectName");
    if(projectNameInput.value == ""){
        alert("Give your valuable project a name. Get creative");
    }else{
        let tempProject = new Project(projectNameInput.value, projects.length);
        viewProject(tempProject);
        projectNameInput.value = "";
        projects.push(tempProject);
        loadProject(projects)
    }
}

function deleteProject(index){
    projects.splice(index, 1);
    updateIndexes();
    loadProject();
}

function updateIndexes(){
    let i = 0;
    for( let p of projects){
        p.index = i;
        i++;
    }
}

function loadProject(){
    let projectsList = document.getElementById("projects");
    if(projects.length == 0){
        document.getElementById("selectedProjectName").textContent = "No Project";
    }else{
        viewProject(projects[0], 0);
    }
    projectsList.innerHTML = "";
    let i = 0;
    for(let p of projects){
        let abc = createProjectCard(p, i);
        i++;
        document.getElementById("projects").appendChild(abc);
    }
}

function createProjectCard(project, i){
    let p1 = document.createElement("div");
    p1.textContent = project.getName();
    p1.setAttribute("data", i);
    p1.classList.add("project");
    p1.onclick = function(){
        viewProject(project, project.index);
    };
    
    let tspan = document.createElement("span");
    tspan.classList.add("trash");
    tspan.onclick = function () {
        deleteProject(i);
    }
    
    let ticon = document.createElement("i");
    ticon.classList.add("far");
    ticon.classList.add("fa-trash-alt");
    tspan.appendChild(ticon);
    p1.appendChild(tspan);

    return p1;
}
function viewProject(project, i) {
    // need to be improvised
    if(projects.length > 0 && projects[i] == project){
        // change the heading for the task section
        let projSecHead = document.getElementById("selectedProjectName")
        // add an index to the addtaskbutton so to reference the project to which the task will be added
        let addTaskButton = document.getElementById("showTaskForm");
        addTaskButton.setAttribute("data", i);
        projSecHead.textContent = project.getName();
        projSecHead.setAttribute("data", i)

        let taskCard = document.getElementById("taskSection");
        taskCard.innerHTML = "";
        for(let t of project.tasks){
            console.log("task in for of loop", t);
            let taskTable = createTaskTable(t);
            taskCard.appendChild(taskTable);
        }

    }
}



function addTaskToProject(tName, tDesc, tPri, projI){
    // get the selected project
    let p = projects[projI];
    // get a empty index where the task will be added
    let tI = p.tasks.length;
    // create the task
    let myTask = createNewTask(tName, tDesc, tPri, tI);
    // push this task to the project's task list
    p.tasks.push(myTask);
    // load the tasks section for the new task to be visible
    viewProject(p, projI);
    return;
}



export {createProject, createProjectCard, getProjectsArray, loadProject, deleteProject, addTaskToProject};
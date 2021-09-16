import { createNewTask, loadTasks } from "./TaskModule";

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

var pSortStatus = "none"; 
// {aa = alpha ascending}, {ad = alpha descending}, {na = numeric ascending}, {nd = numeric descending}, {none = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}

var projects = [];
function getProjectByIndex(i) {
    if(i >= 0 && i < projects.length){
        return projects[i];
    }
}

addSampleProject();
function addSampleProject(){
    let sampleProject = new Project("Sample Project 1", 0);
    projects.push(sampleProject);
    addTaskToProject("Sample Task 1", "This is a short and sweet description for the task", "low", 0);
    addTaskToProject("Sample Task 2", "This is a short and sweet description for the task", "medium", 0);
    addTaskToProject("Sample Task 3", "Description is optional", "high", 0);
    addTaskToProject("Sample Task 4", "", "Priority", 0);
}
projects.push(new Project("Pro2", projects.length));
projects.push(new Project("Pro3", projects.length));

function getProjectsArray() {
    return projects;
}

function createProject(){
    // duh,
    // duh,
    // duh
    // j.k, this creates a project, stores it in the projects array, and load's it to the side pane. pretty efficients
    let projects = getProjectsArray();
    let projectNameInput = document.getElementById("formProjectName");
    if(projectNameInput.value == ""){
        alert("Give your valuable project a name. Get creative");
    }else{
        let tempProject = new Project(projectNameInput.value, projects.length);
        viewProject(tempProject);
        projectNameInput.value = "";
        projects.push(tempProject);
        sortProByCode(pSortStatus);
        loadProject(projects);
    }
}

function deleteProject(index){
    // duh, goodby my project
    projects.splice(index, 1);
    if(projects.length == 0){
        noProjectsYet();
    }else{
        updateIndexes();
    }
    loadProject();
}

function noProjectsYet(){
    document.getElementById("selectedProjectName").textContent = "Uh oh, No projects available";
    document.getElementById("taskSection").innerHTML = "";
}

function updateIndexes(){
    // update indexes of every project in projects array, these indexes are used to reference  the project when deleting them
    let i = 0;
    for( let p of projects){
        p.index = i;
        i++;
    }
}

function loadProject(){
    // when a project is created it should be appended to the projects
    let projectsList = document.getElementById("projects");
    if(projectsList.length == 0){
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
    // create an interactive project button/card in the project selection sidepane in html
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
    if(project == null || project == undefined){
        project = getProjectByIndex(i);
    }
    if(i == null || i == undefined){
        i = projects.indexOf(project);
    }
    if(projects.length > 0 && projects[i] == project){
        // change the heading for the task section
        let projSecHead = document.getElementById("selectedProjectName")
        // add an index to the addtaskbutton so to reference the project to which the task will be added
        let addTaskButton = document.getElementById("showTaskForm");
        addTaskButton.setAttribute("data", i);
        projSecHead.textContent = project.getName();
        projSecHead.setAttribute("data", i)
        loadTasks(project);
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
    if(pSortStatus == "na" || pSortStatus == "nd"){
        sortProByCode(pSortStatus);
    }
    // load the tasks section for the new task to be visible
    viewProject(p, projI);
    return;
}

function checkProjectComplete(){
    let p = projects[document.getElementById("selectedProjectName").getAttribute("data")];
    for(let t of p.tasks){
        if(t.done == false) return false;
    }
    return true;
}
function isValidTaskName(tName, projI){
    let project = getProjectByIndex(projI);
    if(tName == "") return false;
    else if(tName.length > 25) return false;
    else if(tName == null || tName == undefined) return false;
    else{
        for(let t of project.tasks){
            if(t.getTaskName() == tName){
                return false;
            }
        }
    }
    return true;
}

function sortProByCode(code){
    if(code == "aa"){
        pSortStatus = "none";
        pSortAlpAsc();
    }else if(code == "ad"){
        pSortStatus = "none";
        pSortAlpDes();
    }else if(code == "na"){
        pSortStatus = "none";
        pSortNumAsc();
    }else if(code == "nd"){
        pSortStatus = "none";
        pSortNumDes();
    }else{

        console.log("Unexpected code received");
    }
}
function pSortAlpAsc() {
    // points.sort(function(a, b){return b - a});
    if(pSortStatus == "ad"){
        projects.reverse();
    }
    else{
        projects.sort(function (a, b) {
            let y = a.getName().toLowerCase();
            let z = b.getName().toLowerCase();
            if(y < z) return -1;
            else if(y > z) return 1;
            else return 0;
        });
    }
    pSortStatus = "aa";
    loadProject();
    
}
function pSortAlpDes() {
    if(pSortStatus == "aa"){
        projects.reverse();
    }else{
        projects.sort(function (a, b) {
            let y = a.getName().toLowerCase();
            let z = b.getName().toLowerCase();
            if(y > z) return -1;
            else if(y < z) return 1;
            else return 0;
        });
    }
    pSortStatus = "ad";
    loadProject();
}
function pSortNumAsc() {
    if(pSortStatus == "nd"){
        projects.reverse();
    }else{
        projects.sort(function(a, b){ return a.tasks.length - b.tasks.length });
    }
    pSortStatus = "na";
    loadProject();
}
function pSortNumDes() {
    if(pSortStatus == "na"){
        projects.reverse();
    }else{
        projects.sort(function(a, b){ return b.tasks.length - a.tasks.length });
    }
    pSortStatus = "nd";
    loadProject();
}

export {createProject, createProjectCard, getProjectsArray, loadProject, deleteProject, addTaskToProject, getProjectByIndex, viewProject, loadTasks, checkProjectComplete, isValidTaskName, pSortAlpAsc, pSortAlpDes, pSortNumAsc, pSortNumDes};

class Project{
    constructor(project){
        this.projectName = project;
    }
    getName() {
        return this.projectName;
    }
    setName(newName){
        this.projectName = newName;
    }
}
var projects = [];
projects.push(new Project("Pro1"));
projects.push(new Project("Pro2"));
projects.push(new Project("Pro3"));
function getProjectsArray() {
    return projects;
}

function createProject(){
    let projects = getProjectsArray();
    let projectNameInput = document.getElementById("formProjectName");
    let tempProject = new Project(projectNameInput.value);
    viewProject(tempProject);
    projectNameInput.value = "";
    console.log(projects);
    projects.push(tempProject);
    loadProject(projects)
}

function deleteProject(index){
    console.log("dlete");
    projects.splice(index, 1);
    loadProject();
}

function loadProject(){
    let projectsList = document.getElementById("projects");
    if(projects.length == 0){
        document.getElementById("selectedProjectName").textContent = "No Project";
    }else{
        document.getElementById("selectedProjectName").textContent = projects[0].getName();
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
    p1.classList.add("project");
    p1.onclick = function(){
        console.log("onclick");
        viewProject(project);
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
function viewProject(project) {
    // need to be improvised
    if(projects.indexOf(project) >= 0){
        document.getElementById("selectedProjectName").textContent = project.getName();
    }
}

export {createProject, createProjectCard, getProjectsArray, loadProject, deleteProject};
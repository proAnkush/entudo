
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
    projectNameInput.value = "";
    console.log(projects);
    projects.push(tempProject);
    loadProject(projects)
}

function loadProject(){
    let projects = getProjectsArray();
    let projectsList = document.getElementById("projects");
    projectsList.innerHTML = "";
    for(let p of projects){
        let abc = createProjectCard(p);
        document.getElementById("projects").appendChild(abc);
    }
}

function createProjectCard(project){
    let p1 = document.createElement("div");
    p1.textContent = project.getName();
    p1.classList.add("project");
    return p1;
}

export {createProject, createProjectCard, getProjectsArray, loadProject};
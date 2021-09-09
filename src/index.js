import { getProjectsArray, loadProject, createProject, deleteProject } from "./ProjectModule";


var projects = getProjectsArray();
loadProject();
document.getElementById("createProject").onclick = createProject;

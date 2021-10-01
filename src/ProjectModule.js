import {
  format, compareAsc, isToday, parseISO, isTomorrow,
} from 'date-fns';
import { createNewTask, loadTasks } from './TaskModule';

class Project {
  constructor(project, index) {
    this.projectName = project;
    this.tasks = [];
    this.index = index;
  }

  addTodo(t) {
    this.tasks.add(t);
  }

  getName() {
    console.log(this.name);
  }
}

let pSortStatus = 'none';
localStorage.setItem('newUser', 'true');
// {aa = alpha ascending}, {ad = alpha descending}, {na = numeric ascending}, {nd = numeric descending}, {none = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}

let projects = JSON.parse(localStorage.getItem('projects')) || [];
function initiateProjects() {
  if (projects.length == 0 && localStorage.getItem('newUser') == 'true') {
    addSampleProject();
    localStorage.setItem('newUser', 'false');
    if (localStorage.getItem('oldUser')) {
      projects = [];
    }
  }
}

function getProjectByIndex(i) {
  if (i >= 0 && i < projects.length) {
    return projects[i];
  }
}
function addSampleProject() {
  const sampleProject = new Project('Create a project', 0);
  projects.push(sampleProject);
  addTaskToProject(
    'Think of an idea',
    'A project that will be used by many people',
    'low',
    null,
    0,
  );
  addTaskToProject(
    'Decide environment',
    'What frameworks, libraries or what ecosystem it will be on.',
    'medium',
    null,
    0,
  );
  addTaskToProject('Start Coding', 'Description is optional', 'high', null, 0);
  addTaskToProject('Deploy it', 'Rinse and repeat', 'high', null, 0);
  projects.push(new Project('Sample project 2', projects.length));
  projects.push(new Project('Sample project 3', projects.length));
  loadProject();
}

function getProjectsArray() {
  return projects;
}

function createProject() {
  // creates a project, stores it in the projects array, and loads it to the side pane.
  const projects = getProjectsArray();
  localStorage.setItem('newUser', 'false');
  const projectNameInput = document.getElementById('formProjectName');
  if (projectNameInput.value == '') {
    alert('Give your valuable project a name. Get creative');
  } else {
    const tempProject = new Project(projectNameInput.value, projects.length);
    viewProject(tempProject);
    projectNameInput.value = '';
    projects.push(tempProject);
    sortProByCode(pSortStatus);
    loadProject(projects);
  }
}

function deleteProject(index) {
  // duh, goodbye my project
  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('oldUser', 'true');
  projects.splice(index, 1);
  if (projects.length == 0) {
    noProjectsYet();
  } else {
    updateIndexes();
  }
  loadProject();
}

function noProjectsYet() {
  localStorage.setItem('projects', JSON.stringify(projects));
  document.getElementById('selectedProjectName').textContent = 'Uh oh, No projects available';
  document.getElementById('taskSection').innerHTML = '';
}

function updateIndexes() {
  // update indexes of every project in projects array, these indexes are used to reference  the project when deleting them
  let i = 0;
  for (const p of projects) {
    p.index = i;
    i++;
  }
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProject() {
  // when a project is created it should be appended to the projects
  const projectsList = document.getElementById('projects');
  if (projectsList.length == 0) {
    document.getElementById('selectedProjectName').textContent = 'No Project';
  } else {
    viewProject(projects[0], 0);
  }
  projectsList.innerHTML = '';
  let i = 0;
  for (const p of projects) {
    const abc = createProjectCard(p, i);
    i++;
    document.getElementById('projects').appendChild(abc);
  }
  localStorage.setItem('projects', JSON.stringify(projects));
}

function createProjectCard(project, i) {
  // create an interactive project button/card in the project selection sidepane in html
  const p1 = document.createElement('div');
  p1.textContent = project.projectName;
  p1.setAttribute('data', i);
  p1.classList.add('project');

  p1.onclick = function () {
    viewProject(project, project.index);
  };

  const tspan = document.createElement('span');
  tspan.classList.add('trash');
  tspan.onclick = function () {
    deleteProject(i);
  };

  const ticon = document.createElement('i');
  ticon.classList.add('far');
  ticon.classList.add('fa-trash-alt');
  ticon.setAttribute('title', 'Delete this project, with all its tasks.');
  tspan.appendChild(ticon);
  p1.appendChild(tspan);
  document.getElementById('showTaskForm').style.visibility = 'visible';
  return p1;
}
function viewProject(project, i) {
  if (project == null || project == undefined) {
    project = getProjectByIndex(i);
  }
  if (i == null || i == undefined) {
    i = projects.indexOf(project);
  }
  if (projects.length > 0 && projects[i] == project) {
    // change the heading for the task section
    const projSecHead = document.getElementById('selectedProjectName');
    // add an index to the addtaskbutton so to reference the project to which the task will be added
    const addTaskButton = document.getElementById('showTaskForm');
    addTaskButton.setAttribute('data', i);
    projSecHead.textContent = project.projectName;
    projSecHead.setAttribute('data', i);
    loadTasks(project);
  }
  document.getElementById('showTaskForm').style.visibility = 'visible';
}

function addTaskToProject(tName, tDesc, tPri, tDate, projI) {
  // get the selected project
  const p = projects[projI];
  // get a empty index where the task will be added
  const tI = p.tasks.length;
  // create the task
  const myTask = createNewTask(tName, tDesc, tPri, tDate, tI);
  tDate = new Date(tDate);
  // push this task to the project's task list
  p.tasks.push(myTask);
  if (pSortStatus == 'na' || pSortStatus == 'nd') {
    sortProByCode(pSortStatus);
  }
  // load the tasks section for the new task to be visible
  viewProject(p, projI);
  localStorage.setItem('projects', JSON.stringify(projects));
}

function checkProjectComplete() {
  const p = projects[
    document.getElementById('selectedProjectName').getAttribute('data')
  ];
  for (const t of p.tasks) {
    if (t.done == false) return false;
  }
  return true;
}
function isValidTaskName(tName, projI) {
  const project = getProjectByIndex(projI);
  if (tName == '') return false;
  if (tName.length > 25) return false;
  if (tName == null || tName == undefined) return false;

  for (const t of project.tasks) {
    if (t.task == tName) {
      return false;
    }
  }

  return true;
}

function sortProByCode(code) {
  if (code == 'aa') {
    pSortStatus = 'none';
    pSortAlpAsc();
  } else if (code == 'ad') {
    pSortStatus = 'none';
    pSortAlpDes();
  } else if (code == 'na') {
    pSortStatus = 'none';
    pSortNumAsc();
  } else if (code == 'nd') {
    pSortStatus = 'none';
    pSortNumDes();
  }
  localStorage.setItem('projects', JSON.stringify(projects));
}
function pSortAlpAsc() {
  // points.sort(function(a, b){return b - a});
  if (pSortStatus == 'ad') {
    projects.reverse();
  } else {
    projects.sort((a, b) => {
      const y = a.projectName.toLowerCase();
      const z = b.projectName.toLowerCase();
      if (y < z) return -1;
      if (y > z) return 1;
      return 0;
    });
  }
  pSortStatus = 'aa';
  updateIndexes();
  loadProject();
}
function pSortAlpDes() {
  if (pSortStatus == 'aa') {
    projects.reverse();
  } else {
    projects.sort((a, b) => {
      const z = b.projectName.toLowerCase();
      const y = a.projectName.toLowerCase();
      if (y > z) return -1;
      if (y < z) return 1;
      return 0;
    });
  }
  pSortStatus = 'ad';
  updateIndexes();

  loadProject();
}
function pSortNumAsc() {
  if (pSortStatus == 'nd') {
    projects.reverse();
  } else {
    projects.sort((a, b) => a.tasks.length - b.tasks.length);
  }
  pSortStatus = 'na';
  updateIndexes();

  loadProject();
}
function pSortNumDes() {
  if (pSortStatus == 'na') {
    projects.reverse();
  } else {
    projects.sort((a, b) => b.tasks.length - a.tasks.length);
  }
  pSortStatus = 'nd';
  updateIndexes();

  loadProject();
}

function todayTomTasks(day) {
  const projects = getProjectsArray();
  document.getElementById('showTaskForm').style.visibility = 'hidden';
  document.getElementById('selectedProjectName').textContent = 'Tasks due today';
  const taskCard = document.getElementById('taskSection');
  taskCard.innerHTML = '';
  const outerTable = document.createElement('table');
  const tr1 = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Task Name';
  const th2 = document.createElement('th');
  th2.textContent = 'Task Description';
  tr1.appendChild(th1);
  tr1.appendChild(th2);
  outerTable.appendChild(tr1);
  outerTable.setAttribute('id', 'votaskTable');
  for (const project of projects) {
    for (const task of project.tasks) {
      if (day == 'today') {
        if (isToday(new Date(task.date))) {
          const taskRow = createViewOnlyTask(task, project.projectName);
          outerTable.appendChild(taskRow);
        }
      } else if ((day = 'tom')) {
        if (isTomorrow(new Date(task.date))) {
          const taskRow = createViewOnlyTask(task, project.projectName);
          outerTable.appendChild(taskRow);
        }
      }
    }
  }
  if (day == 'tom') {
    document.getElementById('selectedProjectName').textContent = 'Task due tomorrow';
  }
  taskCard.appendChild(outerTable);
}
function createViewOnlyTask(t, n) {
  // dom only
  const tr = document.createElement('tr');
  tr.classList.add(t.priority);
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.style.fontWeight = 'bold';
  td1.style.fontSize = '30px';
  td1.style.fontWeight = 'bold';

  td1.classList.add('tdvoTask');
  td2.classList.add('tdvoTask');
  const nt = document.createElement('span');
  nt.textContent = n;
  nt.style.fontSize = '.7em';
  nt.style.color = '#da22ff';
  td1.innerHTML = t.task;
  td1.appendChild(document.createElement('br'));
  td1.appendChild(nt);
  td2.textContent = t.description || 'No description provided';
  tr.appendChild(td1);
  tr.appendChild(td2);
  return tr;
}

export {
  createProject,
  createProjectCard,
  getProjectsArray,
  loadProject,
  deleteProject,
  addTaskToProject,
  getProjectByIndex,
  viewProject,
  loadTasks,
  checkProjectComplete,
  isValidTaskName,
  pSortAlpAsc,
  pSortAlpDes,
  pSortNumAsc,
  pSortNumDes,
  noProjectsYet,
  addSampleProject,
  initiateProjects,
  todayTomTasks,
};

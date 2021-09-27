import {
  loadProject, createProject, addTaskToProject, isValidTaskName, pSortAlpAsc, noProjectsYet, pSortAlpDes, pSortNumAsc, pSortNumDes, getProjectsArray, initiateProjects, todayTomTasks,
} from './ProjectModule';

// todo - clean the project
// todo - store projects in local storage
// todo - renamable projects (add a pen icon next to #selectedProjectName, which when clicked prompts user for new name)
// todo - dates implementation

// create project
initiateProjects();
loadProject();
document.getElementById('createProject').onclick = createProject;

// add task
document.getElementById('showTaskForm').onclick = showTaskForm;
document.getElementById('cancelForm').onclick = hideForm;
document.getElementById('submitForm').onclick = submitForm;

// sort project buttons
document.getElementById('p-sort-alpha-down').onclick = pSortAlpAsc;
document.getElementById('p-sort-alpha-up').onclick = pSortAlpDes;
document.getElementById('p-sort-num-down').onclick = pSortNumAsc;
document.getElementById('p-sort-num-up').onclick = pSortNumDes;

// today and tomorrow task groups
document.getElementById('todayTasks').onclick = function () {
  todayTomTasks('today');
};
document.getElementById('tomorTasks').onclick = function () {
  todayTomTasks('tom');
};

// show form
function showTaskForm() {
  document.getElementById('input-todo').style.visibility = 'visible';
  const i = document.getElementById('showTaskForm').getAttribute('data');
  document.getElementById('submitForm').setAttribute('data', i);
}
function hideForm() {
  document.getElementById('input-todo').style.visibility = 'hidden';
}
function submitForm() {
  // get input elements
  const taskNameInput = document.getElementById('taskNameInput');
  const taskDescInput = document.getElementById('taskDescInput');
  const taskPriorityInput = document.getElementById('priority');
  const taskDateInput = document.getElementById('taskDate');
  // get value from those elements
  const tName = taskNameInput.value;
  const tDesc = taskDescInput.value;
  const tPri = taskPriorityInput.value;
  const tDate = taskDateInput.value;

  const projI = this.getAttribute('data');
  // create a task with theses values
  if (isValidTaskName(tName, projI)) {
    addTaskToProject(tName, tDesc, tPri, tDate, projI);
    // reset input elements
    clearForms();
    // process the task and hide the form
    hideForm();
  } else {
    alert('Task name should be unique, non-empty, should have less than 25 characters and optionally amazing.');
  }
}

function clearForms() {
  const taskNameInput = document.getElementById('taskNameInput');
  const taskDescInput = document.getElementById('taskDescInput');
  const taskPriorityInput = document.getElementById('priority');
  const taskDateInput = document.getElementById('taskDate');

  taskDescInput.value = '';
  taskNameInput.value = '';
  taskPriorityInput.value = 'low';
  taskDateInput.value = '';
}
if (getProjectsArray().length == 0) {
  noProjectsYet();
}

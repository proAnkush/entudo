import {getProjectByIndex, getProjectsArray, loadProject, viewProject, checkProjectComplete } from "./ProjectModule";
class Todo{
    constructor(task, description, priority, index){
        this.task = task;
        this.description = description;
        this.priority = priority;
        // index of this task in project's task array
        this.index = index;
        this.done = false;
    }
    getTaskName(){
        return this.task;
    }
    getDesc(){
        return this.description;
    }
    getPriority(){
        return this.priority;
    }
    setTaskName(newName){
        this.task = newName;
    }
    setDesc(newDesc){
        this.description = newDesc;
    }
    setPriority(newPrior){
        this.priority = newPrior;
    }
}

function createNewTask(name, description, priority, index){
    let tempTask = new Todo(name, description, priority, index);
    return tempTask;
}

function createTaskTable(t){

    let table = document.createElement("table");
    table.classList.add("taskTable")

    let trh = document.createElement("tr");
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    th2.setAttribute("data", t.index);
    th1.classList.add("taskName");
    th2.classList.add("taskPriority");
    
    
    th1.innerHTML = t.getTaskName() + `<i class="far fa-calendar-times"></i>`;
    let deleteTaskIcon = th1.lastChild;
    deleteTaskIcon.setAttribute("data", t.index);
    deleteTaskIcon.addEventListener("click", function () {
        event.stopPropagation();
        deleteTask(t.index);
    })

    th2.textContent = t.getPriority();
    th2.classList.add(t.getPriority());
    th2.onclick = function(){
        changePriority(t);
    }

    th1.onclick = taskDone;
    
    trh.appendChild(th1);
    trh.appendChild(th2);

    let trd = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.classList.add("taskDesc");
    td2.classList.add("date");
    td1.textContent = t.getDesc();
    td2.textContent = "1/2/abc";
    taskDoneLoad(th1);
    trd.appendChild(td1);
    trd.appendChild(td2);
    table.appendChild(trh);
    table.appendChild(trd);

    return table;
}

function taskDoneLoad(th1){
    let tempProject = getProjectByIndex(document.getElementById("selectedProjectName").getAttribute("data"));
    let task = tempProject.tasks[th1.lastChild.getAttribute("data")];
    if(task.done){
        th1.classList.add("done");
    }else{
        th1.classList.remove("done")
    }
}

function taskDone(){
    let tempProject = getProjectByIndex(document.getElementById("selectedProjectName").getAttribute("data"));
    let task = tempProject.tasks[this.lastChild.getAttribute("data")];
    console.log(task);
    task.done = !task.done;
    if(task.done == true){
        this.classList.add("done");
    }else{
        this.classList.remove("done");
    }
    console.log(task);
}

function deleteTask(i){
    let projectIndex = document.getElementById("selectedProjectName").getAttribute("data");
    let taskIndex = i;
    let project = getProjectByIndex(projectIndex);
    if(taskIndex < project.tasks.length){
        project.tasks.splice(taskIndex, 1);
    }
    loadTasks(project);
}

function updateTaskIndexes(project) {
    let i = 0;
    for(let t of project.tasks){
        t.index = i;
        i++;
    }
}

function noTasks(){
    let taskCard = document.getElementById("taskSection");
    taskCard.innerHTML = "";
    let myEmptyTask = document.createElement("div");
    myEmptyTask.innerHTML = `<h2>Hurray you are free. <i class="fas fa-glass-cheers" style="margin-left: 1  em; color: gray;"></i></h2> You may want to delete this project, or consider adding more tasks if not finished <i class="far fa-laugh-beam"></i> . Best of Luck.<br><br><br>`;
    taskCard.appendChild(myEmptyTask);
}

function loadTasks(project){
    // creates task table and push it to the html
    updateTaskIndexes(project);
    if(project.tasks.length == 0){
        noTasks();
    }else{
        let taskCard = document.getElementById("taskSection");
        taskCard.innerHTML = "";
        for(let t of project.tasks){
            let taskTable = createTaskTable(t);
            taskCard.appendChild(taskTable);
        }
    }
}

function changePriority(task) {
    // todo yet
    if(task.priority == "low"){
        task.priority = "medium";
    }
    else if(task.priority == "medium"){
        task.priority = "high";
    }
    else{
        task.priority = "low";
    }
    let projectId = document.getElementById("selectedProjectName").getAttribute("data");
    viewProject(getProjectsArray()[projectId], projectId);
    
}

export { createNewTask, createTaskTable, updateTaskIndexes, loadTasks};


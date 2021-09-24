import {checkProjectComplete, getProjectByIndex, getProjectsArray, viewProject } from "./ProjectModule";
import { format, addWeeks, parseISO, parse, formatRelative } from "date-fns";
class Todo{
    constructor(task, description, priority, date, index){
        this.task = task;
        this.description = description;
        this.priority = priority;
        this.date = date;
        // index of this task in project's task array
        this.index = index;
        this.done = false;
    }
}

function createNewTask(name, description, priority, date, index){
    let tempTask = new Todo(name, description, priority, date, index);
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
    
    
    th1.innerHTML = t.task + `<i class="far fa-calendar-times"></i>`;
    let deleteTaskIcon = th1.lastChild;
    deleteTaskIcon.setAttribute("data", t.index);
    deleteTaskIcon.addEventListener("click", function () {
        event.stopPropagation();
        deleteTask(t.index);
    })

    th2.textContent = t.priority;
    th2.classList.add(t.priority);
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
    td1.textContent = t.description || "No description provided";
    td2.textContent = processTaskDate(t.date);
    taskDoneLoad(th1);
    trd.appendChild(td1);
    trd.appendChild(td2);
    table.appendChild(trh);
    table.appendChild(trd);

    return table;
}
function processTaskDate(date){
    if(date == ""){
        return date = format(addWeeks(new Date(), 1), "do MMM, yyyy");
    }else{
        date = new Date(date);
        date = format(date, "do MMM, yyyy");
        return date;
    }
    // console.log(new Date(String(format(date, 'dd/MM/yyyy')).substring(0,2), String(format(date, 'dd/MM/yyyy')).substring(3,5),    String(format(date, 'dd/MM/yyyy')).substring(6,10)));
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
    task.done = !task.done;
    if(task.done == true){
        this.classList.add("done");
        if(checkProjectComplete()){
            
            if(document.getElementById("taskSection").lastChild.getAttribute("id") != "complete"){
                document.getElementById("taskSection").appendChild(everyTaskCompleteDiv());
            }
        }
    }else{
        this.classList.remove("done");
        if(!checkProjectComplete()){
            if(document.getElementById("taskSection").lastChild.getAttribute("id") == "complete"){
                document.getElementById("taskSection").lastChild.remove();
            }
        }
    }
    localStorage.setItem("projects", JSON.stringify(getProjectsArray()));
}

function everyTaskCompleteDiv(){
    let completeDiv = document.createElement("div");
    completeDiv.setAttribute("id", "complete");
    let i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-mug-hot");
    i.style.fontSize = "2em";
    completeDiv.appendChild(i);
    let text = document.createElement("p");
    text.textContent = "Looks like you completed all the pending tasks, Delete the tasks to keep everything clean";
    completeDiv.appendChild(text);
    return completeDiv;
}

function deleteTask(i){
    let projectIndex = document.getElementById("selectedProjectName").getAttribute("data");
    let taskIndex = i;
    let project = getProjectByIndex(projectIndex);
    if(taskIndex < project.tasks.length){
        project.tasks.splice(taskIndex, 1);
    }
    loadTasks(project);
    if(project.tasks.length >= 1){
        if(checkProjectComplete()){
            
            if(document.getElementById("taskSection").lastChild.getAttribute("id") != "complete"){
                document.getElementById("taskSection").appendChild(everyTaskCompleteDiv());
            }
        }else{
            if(document.getElementById("taskSection").lastChild.getAttribute("id") == "complete"){
                document.getElementById("taskSection").lastChild.remove();
            }
        }
    }
    localStorage.setItem("projects", JSON.stringify(getProjectsArray()));

}

function updateTaskIndexes(project) {
    let i = 0;
    for(let t of project.tasks){
        t.index = i;
        i++;
    }
    localStorage.setItem("projects", JSON.stringify(getProjectsArray()));
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
    localStorage.setItem("projects", JSON.stringify(getProjectsArray()));
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
    localStorage.setItem("projects", JSON.stringify(getProjectsArray()));
    
}

export { createNewTask, createTaskTable, updateTaskIndexes, loadTasks};


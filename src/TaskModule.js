import {checkProjectComplete, getProjectByIndex, getProjectsArray, viewProject } from "./ProjectModule";
import { format, addWeeks, parseISO, parse, formatRelative, subDays, addDays } from "date-fns";
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
    th2.style.textAlign = "center";
    
    
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
    td2.setAttribute("data", t.index);

    td1.classList.add("taskDesc");
    td2.classList.add("date");
    td1.textContent = t.description || "No description provided";
    td2.appendChild(createDateCell(t));
    
    td2.setAttribute("id", t.index+"date");
    taskDoneLoad(th1);
    trd.appendChild(td1);
    trd.appendChild(td2);
    table.appendChild(trh);
    table.appendChild(trd);

    return table;
}


function createDateCell(t){
    let outspan = document.createElement("span");
    outspan.style.display = "flex";

    // subtractors
    // let ll = document.createElement("span");
    // ll.innerHTML = `<i class="fa fa-angle-double-left" aria-hidden="true"></i>`
    // ll.style.padding = "3px";
    // outspan.appendChild(ll);

    let l = document.createElement("span");
    l.classList.add("dateMods");
    l.innerHTML = `<i class="fa fa-minus" aria-hidden="true"></i>`
    l.style.padding = "3px";
    l.onclick = function(){
        subtractDate(t);
    }

    outspan.appendChild(l);

    // date
    let dateSpan = document.createElement("span");
    dateSpan.textContent = processTaskDate(t.date, t);
    dateSpan.style.width = "fit-content";
    dateSpan.style.margin = "0px auto";

    outspan.appendChild(dateSpan);

    // adders
    let r = document.createElement("span");
    r.classList.add("dateMods");
    r.innerHTML = `<i class="fa fa-plus" style="color: #da22ff;" aria-hidden="true"></i>`
    r.style.padding = "3px";
    r.onclick = function(){
        addDate(t);
    }

    outspan.appendChild(r);

    return outspan;
}

function processTaskDate(date, t){
    localStorage.setItem("projects", JSON.stringify(getProjectsArray()));
    if(date == "" || date == null || date == undefined){
        t.date = new Date(addWeeks(new Date(), 1));
        return date = format(t.date, "do MMM, yyyy");
    }else{
        t.date = new Date(t.date)
        date = format(new Date(date), "do MMM, yyyy") || format(parseISO(date), "do MMM, yyyy");
        return date;
    }
    // console.log(new Date(String(format(date, 'dd/MM/yyyy')).substring(0,2), String(format(date, 'dd/MM/yyyy')).substring(3,5),    String(format(date, 'dd/MM/yyyy')).substring(6,10)));
}

function subtractDate(t){
    t.date = subDays(new Date(t.date), 1);
    updateTaskDate(t);
}
function addDate(t){
    t.date = addDays(new Date(t.date), 1);
    updateTaskDate(t);
}
function updateTaskDate(t){
    //upDate hehe
    document.getElementById(t.index+"date").lastChild.remove();
    document.getElementById(t.index+"date").appendChild(createDateCell(t));
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
        if(checkProjectComplete()){
            if(document.getElementById("taskSection").lastChild.getAttribute("id") != "complete"){
                document.getElementById("taskSection").appendChild(everyTaskCompleteDiv());
            }
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


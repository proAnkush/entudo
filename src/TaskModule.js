class Todo{
    constructor(task, description, priority, index){
        this.task = task;
        this.description = description;
        this.priority = priority;
        // index of this task in project's task array
        this.index = index;
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
    th1.classList.add("taskName");
    th2.classList.add("taskPriority");

    th1.textContent = t.getTaskName();
    th2.textContent = t.getPriority();
    trh.appendChild(th1);
    trh.appendChild(th2);

    let trd = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.classList.add("taskDesc");
    td2.classList.add("date");
    
    td1.textContent = t.getDesc();


    td2.textContent = "1/2/abc";

    trd.appendChild(td1);
    trd.appendChild(td2);
    table.appendChild(trh);
    table.appendChild(trd);

    return table;
}

export { createNewTask, createTaskTable };


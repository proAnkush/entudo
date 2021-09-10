class Todo{
    constructor(task, description, priority){
        this.task = task;
        this.description = description;
        this.priority = priority;
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

function createNewTask(name, description, priority){
    let tempTask = new Todo(name, description, priority);
    return tempTask;
}

export { createNewTask };


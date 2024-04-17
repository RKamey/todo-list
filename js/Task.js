class Task {
    static taskIdCounter = 1;

    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
        this.id = Task.taskIdCounter++;
    }

    completeTask() {
        this.complete = !this.complete;
    }
}
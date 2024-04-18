class Task {
    static taskIdCounter = 1;

    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
        this.id = Task.taskIdCounter++;
        this.tags = ['personal', 'trabajo', 'salud'];
    }

    completeTask() {
        this.complete = !this.complete;
    }
}
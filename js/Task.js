class Task {
    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
        this.id = Date.now();
    }

    completeTask() {
        this.complete = !this.complete;
    }
}
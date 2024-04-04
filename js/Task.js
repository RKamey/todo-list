class Task {
    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
    }

    completeTask() {
        this.complete = true;
    }
}
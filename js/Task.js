class Task {
    static taskIdCounter = 1;

    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
        this.id = Task.taskIdCounter++;
        this.tags = [];
    }

    addTag(tag) {
        if (!tag) return;
        tag = tag.toLowerCase();
        if (this.tags.includes(tag)) return alert('Tag already exists');
        if (this.tags.length === 5) return alert('Just 5 tags per task');
        this.tags.push(tag);
    }

    completeTask() {
        this.complete = !this.complete;
    }
}

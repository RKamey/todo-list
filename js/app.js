const taskList = new TaskList();

const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const tasksRender = document.querySelector('#tasks-render');


// Add task
function addTask() {
    let task = new Task(taskInput.value);
    taskList.addTask(task);
    renderTask();
    taskInput.value = '';
}

// Render tasks
function renderTask() {
    tasksRender.innerHTML = '';
    taskList.getTasks().forEach(t => {
        tasksRender.innerHTML += TaskRow(t);
    });
}

// Add task by clicking the add button
addBtn.addEventListener('click', addTask);

// Add task by pressing enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Find the task by id, e is the event
function findTask() {
    let taskId = parseInt(this.getAttribute('data-taskId')); // Get the task id from the button
    return taskList.getTasks().find(t => t.id === taskId); // Find the task by id
}

// Delete task
function deleteTask() {
    let task = findTask.call(this);
    taskList.removeTask(task);
}

// Mark task as complete
function markAsComplete() {
    let task = findTask.call(this);
    task.completeTask(); // Change the task status
}

// Delete task by clicking the delete button
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask.call(e.target); // Call the deleteTask function and pass the button as this
        renderTask();
    }
});

// Complete task by clicking the complete button
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
        markAsComplete.call(e.target); // Call the markAsComplete function and pass the button as this
        renderTask();
    }
});
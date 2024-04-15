const taskList = new TaskList();

const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const tasksRender = document.querySelector('#tasks-render');

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
function addTask() { 
    if (!taskInput.value) return alert('Please enter a task');
    let task = new Task(taskInput.value);
    taskList.addTask(task);
    saveTask();
    renderTask();
    taskInput.value = '';
}

// Save task in local storage
function saveTask () {
    localStorage.setItem('tasks', JSON.stringify(taskList.getTasks()));
}

// Render tasks
function renderTask() {
    tasksRender.innerHTML = taskList.getTasks().map(t => TaskRow(t)).join('');
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(t => taskList.addTask(new Task(t.name, t.complete, t.id)));
        renderTask();
    }
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

// Edit the task by id
function editTask() {
    let task = findTask.call(this);

    let taskName = editTaskModal(task.name);
    
    if (taskName) {
        task.name = taskName;
        saveTask();
        renderTask();
    }
}

function editTaskModal(taskName) {
    let taskNameInput = prompt('Edit task', taskName);
    return taskNameInput;
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

// Edit task by clicking the edit button
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        editTask.call(e.target);
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
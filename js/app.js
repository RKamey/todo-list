const taskList = new TaskList();

const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const tasksRender = document.querySelector('#tasks-render');
const addTag = document.querySelector('.add-tag-btn');
const filter = document.querySelector('.filter');

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
function addTask() { 
    if (!taskInput.value) return alert('Please enter a task');
    let task = new Task(taskInput.value);
    taskList.addTask(task);
    saveTask();
    renderTasks();
    taskInput.value = '';
}

// Save task in local storage
function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(taskList.getTasks()));
}

// Render tasks
function renderTasks() {
    console.log(taskList.getTasks());
    tasksRender.innerHTML = taskList.getTasks().map(t => TaskRow(t)).join('');
}

// Load tasks from local storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); // From here we get all the tasks store in LS
    if (storedTasks) {
            storedTasks.forEach(task => {
                const loadedTask = new Task(task.name, task.complete, task.id);
                loadedTask.tags = task.tags;
                taskList.addTask(loadedTask);
        });
        renderTasks();
    }
}

// Filter tasks by status (All, Completed, Uncompleted)
function filterTasks() {
    const status = filter.value;
    if (status === 'all') {
        renderTasks();
    } else if (status === 'completed') {
        const completedTasks = taskList.getTasks().filter(t => t.complete);
        tasksRender.innerHTML = completedTasks.map(t => TaskRow(t)).join('');
    } else if (status === 'uncompleted') {
        const uncompletedTasks = taskList.getTasks().filter(t => !t.complete);
        tasksRender.innerHTML = uncompletedTasks.map(t => TaskRow(t)).join('');
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

// Add tag to task
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-tag-btn')) {
        addTagToTask.call(e.target);
    }
});

// Add tag to task
function addTagToTask() {
    let task = findTask.call(this);
    let tag = prompt('Add tag');

    task.addTag(tag);
    saveTask();
    renderTasks();
}

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
        renderTasks();
    }
}

function editTaskModal(taskName) {
    let taskNameInput = prompt('Edit task', taskName);
    return taskNameInput;
}

function deleteTask() {
    let task = findTask.call(this); // Find the task by id
    taskList.removeTask(task); // Remove the task from the task list
    deleteTaskFromLocalStorage(task.id); // Remove the task from local storage
    renderTasks();
}

function deleteTaskFromLocalStorage(taskId) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get the stored tasks from LS
    const updatedTasks = storedTasks.filter(task => task.id !== taskId); // Filter the task, remove the task with the id
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated tasks in LS and remove the task with the id
}

// Mark task as complete
function markAsComplete() {
    let task = findTask.call(this);
    task.completeTask(); // Change the task status
    saveTask();
}

// Filter tasks by status
filter.addEventListener('change', filterTasks);

// Delete task by clicking the delete button
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask.call(e.target); // Call the deleteTask function and pass the button as this
        renderTasks();
    }
});

// Edit task by clicking the edit button
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        editTask.call(e.target);
        renderTasks();
    }
});

// Complete task by clicking the complete button
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
        markAsComplete.call(e.target); // Call the markAsComplete function and pass the button as this
        renderTasks();
    }
});
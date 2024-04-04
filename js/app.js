const taskList = new TaskList();

const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const tasksRender = document.querySelector('#tasks-render');

// Add task
addBtn.addEventListener('click', () => {
    let task = new Task(taskInput.value);
    taskList.addTask(task);
    renderTask();
    taskInput.value = '';
});

// Delete task
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        let taskName = e.target.parentNode.querySelector('p').textContent;
        let task = taskList.getTasks().find(t => t.name === taskName);
        taskList.removeTask(task);
        renderTask();
    }
});

// Complete task
tasksRender.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
        let taskName = e.target.parentNode.querySelector('p').textContent;
        let task = taskList.getTasks().find(t => t.name === taskName);
        task.completeTask();
        renderTask();
    }
});

// Render tasks
function renderTask() {
    tasksRender.innerHTML = '';
    taskList.getTasks().forEach(t => {
        tasksRender.innerHTML += TaskRow(t);
    });
}
const TaskRow = (task) => {
    const completedClass = task.complete ? 'completed' : '';
    return `
        <div class="task-row ${completedClass}">
            <p class="task-name">${task.name}</p>
            <div>
                <button class="btn complete-btn" data-taskId="${task.id}"><i class="fas fa-check"></i></button> 
                <button class="btn edit-btn" data-taskId="${task.id}"><i class="fas fa-edit"></i></button>
                <button class="btn delete-btn" data-taskId="${task.id}"><i class="fas fa-trash-alt"></i></button>
            </div>        
        </div>
    `
}

const TaskModalEdit = (task) => {
    return `
        <div class="modal">
            <div class="modal-content">
                <h2>Edit Task</h2>
                <input type="text" id="task-name" value="${task.name}">
                <button class="btn" data-taskId ="${task.id}" id="save-task">Save</button>
                <button class="btn" data-taskId ="${task.id}" id="close-modal">Close</button>
            </div>
        </div>
    `
}
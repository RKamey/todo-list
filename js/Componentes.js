const TaskRow = (task) => {
    const completedClass = task.complete ? 'completed' : '';
    return `
        <div class="task-row ${completedClass}">
            <p>${task.name}</p>
            <button class="complete-btn"><i class="fas fa-check"></i></button> 
            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
    `
}
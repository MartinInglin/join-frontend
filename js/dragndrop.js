let currentDraggedElement;

function allowDrop(ev) {
  ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function changePosition(newPosition) {
    let id = currentDraggedElement;
    const taskIndex = dataTasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        dataTasks[taskIndex].position = newPosition;
    } else {
        console.error("Task not found with ID:", id);
    }
    createTasks();
    removeHighlightPrevious(newPosition);
}

function highlight(position) {
    document.getElementById(position).classList.add('gray');
}

function removeHighlight(position) {
    document.getElementById(position).classList.remove('gray');
}

function removeHighlightPrevious(position) {
    document.getElementById(`tasks${position}`).classList.remove('gray');
}
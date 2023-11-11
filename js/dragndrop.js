let currentDraggedElement;

function allowDrop(ev) {
  ev.preventDefault();
}

function startDragging(id) {
  currentDraggedElement = id;
}

function changePosition(newPosition) {
  let id = currentDraggedElement;
  const taskIndex = dataTasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    dataTasks[taskIndex].position = newPosition;
  } else {
    console.error("Task not found with ID:", id);
  }
  createTasks();
}

function highlight() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`dropDiv${i}`).classList.remove("d-none");
  }
}

function removeHighlight(id) {
  document.getElementById(`dropDiv${id}`).classList.add("d-none");
}

let currentDraggedElement;

function allowDrop(ev) {
  ev.preventDefault();
}

function startDragging(id, i, j) {
  currentDraggedElement = id;
  highlight();
  rotateCard(i, j);
}

function changePosition(newPosition) {
  let id = currentDraggedElement;
  const taskIndex = dataTasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    dataTasks[taskIndex].position = newPosition;
  } else {
    console.error("Task not found with ID:", id);
  }
  renderTasksBoard();
  setTasks();
}

function highlight() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`dropDiv${i}`).classList.remove("d-none");
  }
}

function rotateCard(i, j) {
  document.getElementById(`card${i}${j}`).style.transform = "rotate(5deg)";
}

function stopRotate(i, j) {
  const element = document.getElementById(`card${i}${j}`);
  if (element) {
    element.style.transform = "rotate(0deg)";
  }
}

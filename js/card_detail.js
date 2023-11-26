let selectedTask = [];

function showCardDetail(i, j) {
  document.getElementById("cardDetailContainer").classList.remove("d-none");
  findTask(i, j);
  renderCardDetail(i, j);
}

function findTask(i, j) {
  const position = columns[i];
  const tasksWithPosition = dataTasks.filter((item) => item.position === position);
  selectedTask = tasksWithPosition[j];
}

function closeCardDetail(event) {
  saveSubtasks();
  document.getElementById("cardDetailContainer").classList.add("d-none");
  emptyInputFilter();
  renderTasksBoard();
}

function stopPropagationCardDetail(event) {
  event.stopPropagation();
}

function closeCardDetailButton() {
  saveSubtasks();
  document.getElementById("cardDetailContainer").classList.add("d-none");
  emptyInputFilter();
  renderTasksBoard();
}

function saveSubtasks() {
  let IdOfTask = selectedTask["id"];
  const taskIndex = dataTasks.findIndex((task) => task.id === IdOfTask);
  dataTasks[taskIndex] = selectedTask;
  setTasks();
}

function renderCardDetail(i, j) {
  let cardDetailContainer = document.getElementById("cardDetailContainer");
  const categoryClass = setColorCategory(selectedTask["category"]);
  const imgUrgency = createImgUrgency(selectedTask["urgency"]);
  const IdOfTask = selectedTask["id"];
  cardDetailContainer.innerHTML = "";
  cardDetailContainer.innerHTML = renderCardDetailHTML(categoryClass, selectedTask, imgUrgency, IdOfTask);
  createUrgencyCardDetail();
  createAssignmentsCardDetail();
  createSubtasksCardDetail();
  animationMoveIn();
}

function createUrgencyCardDetail() {
  const taskUrgencyContainer = document.getElementById("taskUrgency");
  if (selectedTask["urgency"]) {
    taskUrgencyContainer.innerHTML = `${selectedTask["urgency"]}`;
  } else {
    taskUrgencyContainer.innerHTML = "";
  }
}

function createImgUrgency(urgency) {
  urgencyImageSrc = urgenciesImg[0][urgency];

  if (selectedTask["urgency"]) {
    urgencyImageSrc = urgenciesImg[0][urgency];
  } else {
    urgencyImageSrc = "";
  }
  return urgencyImageSrc;
}

function createAssignmentsCardDetail() {
  let assignmentsContainer = document.getElementById(`cardDetailAssigned`);
  assignmentsContainer.innerHTML = "";

  if (selectedTask.assignedTo.length > 0) {
    selectedTask.assignedTo.forEach((userId, index) => {
      renderAssignmentDetails(userId, assignmentsContainer);
    });
  }
}

function renderAssignmentDetails(userId, container) {
  const user = contacts.find((contact) => contact.id === userId);

  if (user) {
    const userInitials = getUserInitials(user);
    const userColorClass = user.icon;
    container.innerHTML += renderAssigmentsHTML(userColorClass, userInitials, user);
  }
}


function createSubtasksCardDetail() {
  let subtasksContainer = document.getElementById(`cardDetailSubtasks`);
  subtasksContainer.innerHTML = "";

  if (selectedTask.subtasks.length > 0) {
    selectedTask.subtasks.forEach((subtask, index) => {
      const subtaskStatusClass = subtask.checked ? "Check_button_checked" : "Check_button_unchecked";
      subtasksContainer.innerHTML += renderSubtasksCardDetailHTML(index, subtaskStatusClass, subtask);
    });
  }
}

function animationMoveIn() {
  document.getElementById("cardDetail").classList.add("move-in-right");
}

function toggleSubtasks(index) {
  if (selectedTask.subtasks && selectedTask.subtasks[index]) {
    selectedTask.subtasks[index].checked = !selectedTask.subtasks[index].checked;
    createSubtasksCardDetail();
  }
}

function SVGOnHover(elementId, iconName) {
  const svgElement = document.getElementById(elementId);
  const hoverSVG = `./img/board_card_detail/${iconName}_hover.svg`;

  svgElement.src = hoverSVG;
}

function SVGMouseOut(elementId, iconName) {
  const svgElement = document.getElementById(elementId);
  const normalSVG = `./img/board_card_detail/${iconName}.svg`;

  svgElement.src = normalSVG;
}

function deleteTask(IdOfTask) {
  const taskIndex = dataTasks.findIndex((task) => task.id === IdOfTask);
  dataTasks.splice(taskIndex, 1);
  setTasks();
  closeCardDetailButton();
  renderTasksBoard();
}

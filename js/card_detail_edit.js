const colorsPriority = [
  {
    priority: "urgent",
    color: "#FF3D00",
  },
  {
    priority: "medium",
    color: "#FFA800",
  },
  {
    priority: "low",
    color: "#7AE229",
  },
];
const priorityImages = [
  {
    lowWhite: "img/add_task/low_white.png",
    lowColor: "img/add_task/low.png",
    mediumWhite: "img/add_task/medium_white.png",
    mediumColor: "img/add_task/medium.png",
    urgentWhite: "img/add_task/urgent_white.png",
    urgentColor: "img/add_task/urgent.png",
  },
];
const priorityButtonsIDs = ["buttonUrgent", "buttonMedium", "buttonLow"];

function showCardEdit() {
  let cardDetailContainer = document.getElementById("cardDetailContainer");
  cardDetailContainer.innerHTML = "";
  cardDetailContainer.innerHTML = renderCardEditHTML();
  setTitle();
  setDescription();
  setDate();
  findIdPriorityContainer();
  createDropDownAssignedTo();
  createCardEditMembers();
  createSubtasksCardEdit();
}

function setTitle() {
  const titleInput = document.getElementById("cardEditTitle");
  titleInput.value = selectedTask["title"];
}

function setDescription() {
  const titleInput = document.getElementById("cardEditDescription");
  titleInput.value = selectedTask["task"];
}

function setDate() {
  const titleInput = document.getElementById("cardEditDate");
  titleInput.value = selectedTask["date"];
}

function findIdPriorityContainer() {
  const priorities = ["urgent", "medium", "low"];
  const priority = selectedTask["urgency"];

  if (priority !== null && priorities.includes(priority)) {
    const idOfContainer = priorities.find((priorityItem) => priorityItem === priority);
    setPriorityStyle(idOfContainerNormalized(idOfContainer));
  } else {
    return;
  }
}

function idOfContainerNormalized(idOfContainer) {
  return "button" + idOfContainer.charAt(0).toUpperCase() + idOfContainer.slice(1);
}

function changePriority(priority, idOfContainer) {
  if (selectedTask["urgency"] === priority) {
    selectedTask["urgency"] = null;
  } else {
    selectedTask["urgency"] = priority;
  }
  setPriorityStyle(idOfContainer);
}

function setPriorityStyle(idOfContainer) {
  for (let i = 0; i < priorityButtonsIDs.length; i++) {
    const containerID = priorityButtonsIDs[i];
    const container = document.getElementById(containerID);
    setBackgroundcolorWhite(container);
    setColorBlack(containerID);
    setImageColor(containerID);
  }

  const container = document.getElementById(idOfContainer);
  const priorityColor = selectedTask["urgency"] ? colorsPriority.find((item) => item.priority === selectedTask["urgency"]) : null;

  if (selectedTask["urgency"]) {
    setBackgroundcolorPriority(container, priorityColor);
    setColorWhite(idOfContainer);
    setImageWhite(idOfContainer);
  }
}

function setBackgroundcolorWhite(container) {
  container.style.backgroundColor = "white";
}

function setBackgroundcolorPriority(container, priorityColor) {
  container.style.backgroundColor = priorityColor.color;
}

function setColorBlack(idOfContainer) {
  document.getElementById(idOfContainer).classList.remove("card-edit-priority-color-white");
}

function setColorWhite(idOfContainer) {
  document.getElementById(idOfContainer).classList.add("card-edit-priority-color-white");
}

function setImageWhite(idOfContainer) {
  const priority = idOfContainer.replace("button", "").toLowerCase();
  const imgElement = document.querySelector(`#${idOfContainer} img`);
  if (imgElement) {
    imgElement.src = `../img/add_task/${priority}_white.png`;
  }
}

function setImageColor(idOfContainer) {
  const priority = idOfContainer.replace("button", "").toLowerCase();
  const imgElement = document.querySelector(`#${idOfContainer} img`);
  if (imgElement) {
    imgElement.src = `../img/add_task/${priority}.png`;
  }
}

function saveChangesCardEdit() {
  let IdOfTask = selectedTask["id"];
  const taskIndex = dataTasks.findIndex((task) => task.id === IdOfTask);
  selectedTask["title"] = document.getElementById("cardEditTitle").value;
  selectedTask["task"] = document.getElementById("cardEditDescription").value;
  selectedTask["date"] = document.getElementById("cardEditDate").value;
  dataTasks[taskIndex] = selectedTask;
  setTasks();
  closeCardDetailButton();
}

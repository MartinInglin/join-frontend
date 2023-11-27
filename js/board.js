const columnsText = ["To do", "In progress", "Await feedback", "Done"];
const urgenciesImg = [
  {
    low: "img/board/priority_low.svg",
    medium: "img/board/priority_medium.svg",
    urgent: "img/board/priority_urgent.svg",
  },
];

async function initBoard() {
  await getTasks();
  await getUsers();
  await getCurrentUser();
  await getContacts();
  actuallyUserToContacts();
  adjustLayoutFilter();
  renderTasksBoard();
  createHeaderInitials();

}

function renderTasksBoard(filterString) {
  anyFilteredTasks = false;

  for (let i = 0; i < columns.length; i++) {
    const filteredTasks = filterTasksByColumn(filterString, i);

    let tasksContainer = document.getElementById(`tasks${columns[i]}`);
    tasksContainer.innerHTML = "";

    if (filteredTasks.length > 0) {
      renderFilteredTasks(i, filteredTasks);
      anyFilteredTasks = true;
    } else {
      tasksContainer.innerHTML = createEmptyTaskHTML(columnsText, i);
    }
    createDropDiv(i);
  }
  showHideMessageNoTasksFound(anyFilteredTasks);

}


function renderFilteredTasks(columnIndex, filteredTasks) {
  for (let j = 0; j < filteredTasks.length; j++) {
    let tasks = filteredTasks[j];
    const categoryClass = setColorCategory(tasks["category"]);
    const tasksContainer = document.getElementById(`tasks${columns[columnIndex]}`);
    
    tasksContainer.innerHTML += createTasksHTML(columnIndex, j, tasks, categoryClass);
    createSubtasks(columnIndex, j);
    createUrgency(columnIndex, j);
    createAssignments(columnIndex, j);
  }
}


function setColorCategory(category) {
  if (category === "User Story") {
    return "blue";
  } else if (category === "Technical Task") {
    return "tech-task-green";
  }
  return "";
}

function createSubtasks(i, j) {
  let subtasksContainer = document.getElementById(`subtasks${i}${j}`);
  let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
  let task = actualTasks[j];
  let checkedSubtasksCount = countCheckedSubtasks(task);
  let widthProgressBar = getWidthProgressBar(task, checkedSubtasksCount);
  subtasksContainer.innerHTML = "";

  if (task.subtasks.length > 0) {
    subtasksContainer.innerHTML += createSubstasksBoardHTML(widthProgressBar, checkedSubtasksCount, task);
  } else {
    subtasksContainer.classList.add("margin-12");
  }
}

function countCheckedSubtasks(task) {
  return task.subtasks.reduce((count, subtask) => count + (subtask.checked ? 1 : 0), 0);
}

function getWidthProgressBar(task, checkedSubtasksCount) {
  return (128 / task.subtasks.length) * checkedSubtasksCount + "px";
}

function createUrgency(i, j) {
  let urgencyContainer = document.getElementById(`urgency${i}${j}`);
  let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
  let task = actualTasks[j];
  const urgency = getTaskUrgency(task);

  if (urgency !== null) {
    const urgencyImageSrc = urgenciesImg[0][urgency];
    urgencyContainer.innerHTML = createUrgencyImg(urgencyImageSrc);
  }
}

function getTaskUrgency(task) {
  return task.urgency;
}

function createAssignments(i, j) {
  let assignmentsContainer = document.getElementById(`assignments${i}${j}`);
  let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
  let task = actualTasks[j];

  assignmentsContainer.innerHTML = "";

  if (task.assignedTo.length > 0) {
    renderAssignedUsers(assignmentsContainer, task.assignedTo);
  }
}

function renderAssignedUsers(container, assignedTo) {
  for (let index = 0; index < assignedTo.length; index++) {
    const userId = assignedTo[index];
    const user = contacts.find((contact) => contact.id === userId);

    if (user) {
      const userInitials = getUserInitials(user);
      const userColorClass = user.icon;
      const marginClass = index > 0 ? "negative-margin" : "";
      const nonDisplayedUsers = assignedTo.length - 4;

      container.innerHTML += createAssignmentsHTML(marginClass, userColorClass, userInitials);

      if (index > 2 && nonDisplayedUsers > 0) {
        container.innerHTML += createAssignmentsFirstHTML(marginClass, nonDisplayedUsers);
        break;
      }
    }
  }
}

function createDropDiv(i) {
  let tasksContainer = document.getElementById(`tasks${columns[i]}`);
  tasksContainer.innerHTML += createDropDivHTML(i);
}

function emptyInputFilter() {
  document.getElementById("searchInput").value = "";
}

function openDialog() {
  if (window.innerWidth < 970) {
    redirectToAddTaskPage();
  } else {
    let dialog = document.getElementById("dialog");
    let closeDialog = document.getElementById("closeDialog");
    closeDialog.classList.remove("d-none");
    dialog.classList.remove("d-none");
    dialog.classList.remove("fade-out-right");
    dialog.classList.add("fade-from-right");
  }
}

function closeDialog() {
  let dialog = document.getElementById("dialog");
  let closeDialog = document.getElementById("closeDialog");
  dialog.classList.remove("fade-from-right");
  dialog.classList.add("fade-out-right");
  closeDialog.classList.add("d-none");
  dialog.classList.add("d-none");
}

function doNotClose(event) {
  event.stopPropagation();
}

function redirectToAddTaskPage() {
  window.location.href = "addtask.html";
}
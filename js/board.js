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
  renderTasksBoard();
  createHeaderInitials();
  adjustLayoutFilter();
}

function renderTasksBoard(filterString) {
  for (let i = 0; i < columns.length; i++) {
    let filteredTasks;
    if (filterString) {
      filteredTasks = dataTasks.filter((task) => task.position === columns[i] && (task.title.toLowerCase().includes(filterString) || task.task.toLowerCase().includes(filterString)));
    } else {
      filteredTasks = dataTasks.filter((task) => task.position === columns[i]);
    }

    let tasksContainer = document.getElementById(`tasks${columns[i]}`);
    tasksContainer.innerHTML = "";

    if (filteredTasks.length > 0) {
      for (let j = 0; j < filteredTasks.length; j++) {
        let tasks = filteredTasks[j];
        const categoryClass = setColorCategory(tasks["category"]);
        tasksContainer.innerHTML += createTasksHTML(i, j, tasks, categoryClass);
        createSubtasks(i, j);
        createUrgency(i, j);
        createAssignments(i, j);
      }
    } else {
      tasksContainer.innerHTML = createEmptyTaskHTML(columnsText, i);
    }
    createDropDiv(i);
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
    urgencyContainer.innerHTML = `
      <img src="${urgencyImageSrc}" alt="" />
    `;
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
    for (let index = 0; index < task.assignedTo.length; index++) {
      const userId = task.assignedTo[index];
      const user = contacts.find((contact) => contact.id === userId);
      if (user) {
        const userInitials = getUserInitials(user);
        const userColorClass = user.icon;
        const marginClass = index > 0 ? "negative-margin" : "";
        const nonDisplayedUsers = task.assignedTo.length - 4;

        assignmentsContainer.innerHTML += createAssignementsHTML(marginClass, userColorClass, userInitials);
        if (index > 2 && nonDisplayedUsers > 0) {
          assignmentsContainer.innerHTML += createAssignmentsFistHTML(marginClass, nonDisplayedUsers);
          break;
        }
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

function adjustLayoutFilter() {
  let filterValue = null;

  // Check if the element with id "searchInput" exists
  let searchInput = document.getElementById("searchInput");
  if (searchInput) {
    filterValue = searchInput.value;
  }

  const screenWidth = window.innerWidth;
  const breakpoint = 970;
  let containerSearchInputDesktop = document.getElementById("searchInputDesktop");
  let containerSearchInputMedia = document.getElementById("searchInputMedia");

  if (screenWidth <= breakpoint) {
    containerSearchInputDesktop.innerHTML = "";
    containerSearchInputMedia.innerHTML = createSearchInput();
  } else {
    containerSearchInputMedia.innerHTML = "";
    containerSearchInputDesktop.innerHTML = createSearchInput();
  }
  if (searchInput) {
    document.getElementById('searchInput').value = filterValue;
  }
}


window.addEventListener("resize", adjustLayoutFilter);

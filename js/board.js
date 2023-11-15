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
  createTasks();
}

function createTasks(filterString) {
  for (let i = 0; i < columns.length; i++) {
    let filteredTasks;
    if (filterString) {
      filteredTasks = dataTasks.filter(
        (task) =>
          task.position === columns[i] &&
          (task.title.toLowerCase().includes(filterString) ||
            task.task.toLowerCase().includes(filterString))
      );
    } else {
      filteredTasks = dataTasks.filter((task) => task.position === columns[i]);
    }

    let tasksContainer = document.getElementById(`tasks${columns[i]}`);
    tasksContainer.innerHTML = "";

    if (filteredTasks.length > 0) {
      for (let j = 0; j < filteredTasks.length; j++) {
        let tasks = filteredTasks[j];
        const categoryClass = setColorCategory(tasks["category"]);
        /*html*/
        tasksContainer.innerHTML += `
              <div class="card" id="card${i}${j}" draggable="true" ondragstart="startDragging(${tasks['id']}, ${i}, ${j})" ondragend="stopRotate(${i}, ${j})" onclick="showCardDetail(${i}, ${j})"> 
              <span class="category color-${categoryClass}">${tasks["category"]}</span>
              <h3>${tasks["title"]}</h3>
              <p>${tasks["task"]}</p>
              <div class="subtasks-board" id="subtasks${i}${j}"></div>
              <div class="space-between align-center">
                <div class="row" id="assignments${i}${j}">
                </div>
                <div class="urgency" id="urgency${i}${j}"><img src="./img/board/priority_low.svg" alt="" /></div>
              </div>
            </div>
              `;
        createSubtasks(i, j);
        createUrgency(i, j);
        createAssignments(i, j);
      }
    } else {
      /*html*/
      tasksContainer.innerHTML = `
          <div class="empty-task">
            <span>No Tasks ${columnsText[i]}</span>
          </div>
        `;
    }
    createDropDiv(i);
  }
}

function setColorCategory(category) {
  if (category === "User Story") {
    return "blue";
  } else if (category === "Technical Task") {
    return "green";
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
    /*html*/
    subtasksContainer.innerHTML += `
      <div class="progress-bar-container">
        <div class="progress-bar-background"></div>
        <div class="progress-bar" style="width: ${widthProgressBar};"></div>
      </div>
      <div class="subtasks-text">${checkedSubtasksCount}/${task.subtasks.length} Subtasks</div>
    `;
  } else {
    subtasksContainer.classList.add("margin-0");
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
  const urgencyImageSrc = urgenciesImg[0][urgency];

  /*html*/
  urgencyContainer.innerHTML = `
    <img src="${urgencyImageSrc}" alt="" />
  `;
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
    task.assignedTo.forEach((userId, index) => {
      const user = contacts.find((contact) => contact.id === userId);

      if (user) {
        const userInitials = getUserInitials(user);
        const userColorClass = `color-${user.icon}`;
        const marginClass = index > 0 ? 'negative-margin' : '';

        /*html*/
        assignmentsContainer.innerHTML += `
          <div class="member-button align-center justify-center ${userColorClass} ${marginClass}">
            <span>${userInitials}</span>
          </div>
        `;
      }
    });
  }
}

function createDropDiv(i) {
  let tasksContainer = document.getElementById(`tasks${columns[i]}`);
  /*html*/
  tasksContainer.innerHTML += `
    <div class="empty-task d-none" id="dropDiv${i}">
      <span>Drop Task here</span>
    </div>
  `;
}

function openDialog() {
  let dialog = document.getElementById("dialog");
  let closeDialog = document.getElementById("closeDialog");
  closeDialog.classList.remove("d-none");
  dialog.classList.remove("d-none");
  dialog.classList.remove("fade-out-right");
  dialog.classList.add("fade-from-right");
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

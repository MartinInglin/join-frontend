const columnsText = ["To do", "In progress", "Await feedback", "Done"];

function initBoard() {
  createTasks();
  setIdOfCurrentPage(2);
}

function createTasks() {
  for (let i = 0; i < columns.length; i++) {
    let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
    let tasksContainer = document.getElementById(`tasks${columns[i]}`);

    tasksContainer.innerHTML = "";

    if (actualTasks.length > 0) {
      for (let j = 0; j < actualTasks.length; j++) {
        let tasks = actualTasks[j];
        const categoryClass = setColorCategory(tasks["category"]);
          /*html*/
          tasksContainer.innerHTML += `
              <div class="card">
              <span class="category ${categoryClass}">${tasks["category"]}</span>
              <h3>${tasks["title"]}</h3>
              <p>${tasks["task"]}</p>
              <div class="subtasks">
                <div class="progress-bar-container">
                  <div class="progress-bar-background"></div>
                  <div class="progress-bar"></div>
                </div>
                <div class="subtasks-text">1/2 Subtasks</div>
              </div>
              <div class="space-between align-center">
                <div class="row">
                  <div class="member-button align-center justify-center orange">AM</div>
                  <div class="member-button align-center justify-center green negative-margin">EM</div>
                  <div class="member-button align-center justify-center purple negative-margin">MB</div>
                </div>
                <div><img src="./img/board/priority_low.svg" alt="" /></div>
              </div>
            </div>
              `;
      }
    } else {
      /*html*/
      tasksContainer.innerHTML = `
          <div class="empty-task">
            <span>No Tasks ${columnsText[i]}</span>
          </div>
        `;
    }
  }
}

function setColorCategory(category) {
  if (category === "User Story") {
    return "blue";
  } else if (category === "Technical Task") {
    return "green";
  }
  return ""; // Default or no class if none of the conditions match
}

function openDialog() {
  let dialog = document.getElementById('dialog')
  let closeDialog = document.getElementById('closeDialog');
  closeDialog.classList.remove('d-none');
  dialog.classList.remove('d-none');
  dialog.classList.remove('fade-out-right');
  dialog.classList.add('fade-from-right');
}

function closeDialog() {
  let dialog = document.getElementById('dialog')
  let closeDialog = document.getElementById('closeDialog');
  dialog.classList.remove('fade-from-right');
  dialog.classList.add('fade-out-right');
  closeDialog.classList.add('d-none');
  dialog.classList.add('d-none'); 
}

function doNotClose(event) {
  event.stopPropagation();
}
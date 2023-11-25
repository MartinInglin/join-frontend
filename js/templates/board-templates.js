function createTasksHTML(i, j, tasks, categoryClass) {
    /*html*/
    return `
    <div class="card" id="card${i}${j}" draggable="true" ondragstart="startDragging(${tasks["id"]}, ${i}, ${j})" ondragend="stopRotate(${i}, ${j})" onclick="showCardDetail(${i}, ${j})"> 
      <span class="category color-${categoryClass}">${tasks["category"]}</span>
      <h3 class="card-title overflow-hidden">${tasks["title"]}</h3>
      <p>${tasks["task"]}</p>
      <div class="subtasks-board" id="subtasks${i}${j}"></div>
      <div class="space-between align-center align-stretch min-height-32">
        <div class="row" id="assignments${i}${j}">
        </div>
        <div class="urgency" id="urgency${i}${j}"><img src="" alt="" /></div>
      </div>
    </div>
      `;
}

function createEmptyTaskHTML(columnsText, i) {
    /*html*/
    return `
    <div class="empty-task">
      <span>No Tasks ${columnsText[i]}</span>
    </div>
  `;
}

function createSubstasksBoardHTML(widthProgressBar, checkedSubtasksCount, task) {
    /*html*/
    return `
    <div class="progress-bar-container">
      <div class="progress-bar-background"></div>
      <div class="progress-bar" style="width: ${widthProgressBar};"></div>
    </div>
    <div class="subtasks-text">${checkedSubtasksCount}/${task.subtasks.length} Subtasks</div>
  `;
}

function createAssignementsHTML(marginClass, userColorClass, userInitials) {
    /*html*/
    return `
    <div class="member-button align-center justify-center ${marginClass}" style="background-color: ${userColorClass};">
      <span>${userInitials}</span>
    </div>
  `;
}

function createAssignmentsFistHTML(marginClass, nonDisplayedUsers) {
    /*html*/
    return `
    <div class="member-button align-center justify-center color-standard-blue ${marginClass}">
      <span>+ ${nonDisplayedUsers}</span>
    </div>
  `;
}

function createDropDivHTML(i) {
    /*html*/
    return `
    <div class="empty-task d-none" id="dropDiv${i}">
      <span>Drop Task here</span>
    </div>
  `;
}

function createSearchInput() {
    /*html*/
    return `
    <form class="search" onsubmit="filterTasks(); return false">
    <input type="text" id="searchInput" placeholder="Find task" onkeyup="filterTasks()" />
    <div class="align-center gap-16px">
      <img src="./img/board/separator_find_task.svg" alt />
      <button class="align-center"><img src="./img/board/search.svg" alt /></button>
    </div>
    </form>
    `;
  }
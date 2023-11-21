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
  document.getElementById("cardDetailContainer").classList.add("d-none");
  createTasks();
}

function stopPropagationCardDetail(event) {
  event.stopPropagation();
}

function closeCardDetailButton() {
  document.getElementById("cardDetailContainer").classList.add("d-none");
  createTasks();
}

function renderCardDetail(i, j) {
  let cardDetailContainer = document.getElementById("cardDetailContainer");
  const categoryClass = setColorCategory(selectedTask["category"]);
  const imgUrgency = createImgUrgency(selectedTask["urgency"]);
  const IdOfTask = selectedTask["id"];
  cardDetailContainer.innerHTML = "";
  /*html*/
  cardDetailContainer.innerHTML = `
    <div class="card-detail move-in-right" id="cardDetail" onclick="stopPropagationCardDetail(event)">
        <div class="card-detail-header">
          <div class="card-detail-category color-${categoryClass}">${selectedTask["category"]}</div>
          <div class="close-btn pointer"><img src="./img/board_card_detail/close.svg" alt="" onclick="closeCardDetailButton()"></div>
        </div>
        <div class="card-detail-title">${selectedTask["title"]}</div>
        <div class="card-detail-task font-20px-400">${selectedTask["task"]}</div>
        <div class="card-detail-date font-20px-400">
          <div class="text-color-dark-blue">Due date:</div>
          <div>${selectedTask["date"]}</div>
        </div>
        <div class="card-detail-priority font-20px-400">
          <div class="text-color-dark-blue">Priority:</div>
          <div class="card-detail-priority-right">
            <div>${selectedTask["urgency"]}</div>
            <img src="${imgUrgency}" alt="">
          </div>
        </div>
        <div class="text-color-dark-blue font-20px-400 margin-bottom-8 no-gap-div">Assigned To:</div>
        <div class="card-detail-assigned" id="cardDetailAssigned"></div>

        <div class="text-color-dark-blue font-20px-400 margin-bottom-8">Subtasks</div>
        <div class="card-detail-subtasks" id="cardDetailSubtasks"></div>
        <div class="justify-end">
          <div class="delete-edit">
            <div class="delete" onmouseover="SVGOnHover('deleteImg', 'delete')" onmouseout="SVGMouseOut('deleteImg', 'delete')" onclick="deleteTask(${IdOfTask})">
              <img src="./img/board_card_detail/delete.svg" alt="" id="deleteImg">
              <div>Delete</div>
            </div>
            <img src="./img/board_card_detail/separator_card_detail_bottom.svg" alt="">
            <div class="edit" onmouseover="SVGOnHover('editImg', 'edit')" onmouseout="SVGMouseOut('editImg', 'edit')" onclick="showCardEdit()">
              <img src="./img/board_card_detail/edit.svg" alt="" id="editImg">
              <div>Edit</div>
            </div>
          </div>      
        </div>
    </div>
    `;
  createAssignmentsCardDetail();
  createSubtasksCardDetail();
  animationMoveIn();
}

function createImgUrgency(urgency) {
  const urgencyImageSrc = urgenciesImg[0][urgency];
  return urgencyImageSrc;
}

function createAssignmentsCardDetail() {
  let assignmentsContainer = document.getElementById(`cardDetailAssigned`);

  assignmentsContainer.innerHTML = "";

  if (selectedTask.assignedTo.length > 0) {
    selectedTask.assignedTo.forEach((userId, index) => {
      const user = contacts.find((contact) => contact.id === userId);

      if (user) {
        const userInitials = getUserInitials(user);
        const userColorClass = `color-${user.icon}`;

        /*html*/
        assignmentsContainer.innerHTML += `
            <div class="card-detail-members">
              <div class="member-button align-center justify-center ${userColorClass}">
                <span>${userInitials}</span>
              </div>
              <span class="open-sans-19">${user["firstname"]} ${user["lastname"]}</span>
            </div>
          `;
      }
    });
  }
}

function createSubtasksCardDetail() {
  let subtasksContainer = document.getElementById(`cardDetailSubtasks`);
  subtasksContainer.innerHTML = "";

  if (selectedTask.subtasks.length > 0) {
    selectedTask.subtasks.forEach((subtask, index) => {
      const subtaskStatusClass = subtask.checked ? "Check_button_checked" : "Check_button_unchecked";

      /*html*/
      subtasksContainer.innerHTML += `
          <div class="card-detail-subtask pointer" onclick="toggleSubtasks(${index}); doNotTriggerEvent(event)" onmouseover="SVGOnHover('checkbox${index}', '${subtaskStatusClass}')" onmouseout="SVGMouseOut('checkbox${index}', '${subtaskStatusClass}')">
            <img src="./img/board_card_detail/${subtaskStatusClass}.svg" alt="" id="checkbox${index}">
            <div class="font-16px-400">${subtask.content}</div>
          </div>
        `;
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
  createTasks();  
}

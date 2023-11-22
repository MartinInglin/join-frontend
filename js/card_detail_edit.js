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
  /*html*/
  cardDetailContainer.innerHTML = `
  <form onsubmit="saveChangesCardEdit(); return false">
    <div class="card-detail left-50-percent" onclick="closeDropDownAssignedTo(); deleteInputAssignedTo(); stopPropagation(event)">
        <div class="card-detail-header justify-right">
          <div class="close-btn pointer"><img src="./img/board_card_detail/close.svg" alt="" onclick="closeCardDetailButton()" /></div>
        </div>
        <div class="card-edit-scroll">
            <div class="card-edit-section">
              <div class="subtitle">Title</div>
              <input type="text" name="" id="cardEditTitle" class="font-size-20 card-edit-section-input" required/>
            </div>
          <div class="card-edit-section">
            <div class="subtitle">Description</div>
            <textarea type="text" name="" id="cardEditDescription" class="font-size-20 card-edit-section-input card-edit-task"></textarea>
          </div>
          <div class="card-edit-section">
            <div class="subtitle">Due date</div>
            <input type="date" name="" id="cardEditDate" class="font-size-19 card-edit-section-input" max="2200-12-31"/>
          </div>

          <div class="card-edit-section">
            <div class="subtitle">Priority</div>
            <div class="card-edit-priority" id="cardEditPriorities">
              <button type="button" class="card-edit-priority-btn" id="buttonUrgent" onclick="changePriority('urgent', 'buttonUrgent')">Urgent<img src="../img/add_task/urgent.png"></button>
              <button type="button" class="card-edit-priority-btn" id="buttonMedium" onclick="changePriority('medium', 'buttonMedium')">Medium<img src="../img/add_task/medium.png"></button>
              <button type="button" class="card-edit-priority-btn" id="buttonLow" onclick="changePriority('low', 'buttonLow')">Low<img src="../img/add_task/low.png"></button>
            </div>
          </div>

          <div class="card-edit-section position-relative">
            <div class="subtitle">Assigned to</div>
            <input type="text" name="" id="searchUser" class="font-size-20 card-edit-section-input" onclick="showDropDownAssignedTo(); stopPropagation(event)" onkeyup="createDropDownAssignedTo()" placeholder="Select contacts to assign"/>
            <img src="./img/board_card_detail/arrow_drop_down.svg" alt="" class="open-dropdown-assign" id="openDropDownAssign" onclick="toggleDropDownAssignedTo(); stopPropagation(event)">

            <div class="card-edit-members" id="cardEditMembers"></div>
            
            <div class="drop-down-assigned-to d-none" id="dropDownAssignedToContainer"></div>
          </div>

          <div class="card-edit-section">
            <div class="subtitle">Subtasks</div>
            <div class="d-flex position-relative align-stretch">
              <input type="text" name="" id="addNewSubtask" class="font-size-20 add-subtask card-edit-section-input width-100" placeholder="Add new subtask" onfocus="changeIconConfirm()" onfocusout="changIconPlus()"/>
              <div class="addDeleteSubtask">
              <img class="hover-gray-circle" src="img/board_card_detail/subtask_cancel.svg" alt="" onclick="emptyInputAddSubtask()">
              <img src="img/board_card_detail/subtasks_separator.svg" alt="">
              <img class="hover-gray-circle" src="./img/board_card_detail/add_subtask.svg" alt="" id="addOrConfirm" onclick="addSubtaskCardEdit()">
              </div>
            </div>

            <ul class="subtasks-list" id="subtasksList"></ul> 

          </div>
          </div>

          <div class="confirm-button-container">
            <button type="submit" class="confirm-button">
              <p>OK</p>
              <img src="./img/board_card_detail/confirm_white.svg" alt="">
            </button>
          </div>
        </div>

      </div>
      </form>
    `;
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

function createDropDownAssignedTo() {
  let dropDownContainer = document.getElementById("dropDownAssignedToContainer");
  dropDownContainer.innerHTML = "";

  const filteredUsers = filterUsers();

  for (let i = 0; i < filteredUsers.length; i++) {
    const contact = filteredUsers[i];
    /*html*/
    dropDownContainer.innerHTML += `
    <div id="dropDownContact${i}" class="contact" onclick="addContactToAssign(${contact.id}); doNotTriggerEvent(event)">
        <div class="contact-icon">
            <div class="contact-icon">
                <div class="outer-line">
                    <div class="inner-line" style="background-color:${contact.icon}">
                        <p class="initialTag">${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}</p>
                    </div>
                </div>
            </div>
            ${contact.firstname} ${contact.lastname}
        </div>
        <img src="./img/board_card_detail/Check_button_unchecked.svg" alt="" id="assignedUserCheckbox${i}">
    </div>
    `;

    if (selectedTask["assignedTo"].includes(contact.id)) {
      styleUserSelected(i);
    }
  }
}

function toggleDropDownAssignedTo() {
  document.getElementById("dropDownAssignedToContainer").classList.toggle("d-none");
  const dropDownArrow = document.getElementById("openDropDownAssign");
  dropDownArrow.classList.toggle("rotate-180");
}

function showDropDownAssignedTo() {
  document.getElementById("dropDownAssignedToContainer").classList.remove("d-none");
  const dropDownArrow = document.getElementById("openDropDownAssign");
  dropDownArrow.classList.add("rotate-180");
}

function closeDropDownAssignedTo(event) {
  const dropDownContainer = document.getElementById("dropDownAssignedToContainer");
  if (!dropDownContainer.classList.contains("d-none")) {
    dropDownContainer.classList.add("d-none");
    const dropDownArrow = document.getElementById("openDropDownAssign");
    dropDownArrow.classList.remove("rotate-180");
  }
}

function stopPropagation(event) {
  const dropDownContainer = document.getElementById("dropDownAssignedToContainer");
  if (!dropDownContainer.contains(event.target)) {
    event.stopPropagation();
  }
}

function addContactToAssign(contactID) {
  const assignedToIndex = selectedTask["assignedTo"].indexOf(contactID);

  if (assignedToIndex !== -1) {
    selectedTask["assignedTo"].splice(assignedToIndex, 1);
  } else {
    selectedTask["assignedTo"].push(contactID);
  }

  createDropDownAssignedTo();
  createCardEditMembers();
}

function styleUserSelected(i) {
  setBackgroundColorUser(i);
  setColorUser(i);
  setImageChecked(i);
}

function setBackgroundColorUser(i) {
  document.getElementById(`dropDownContact${i}`).classList.add("background-color-dark");
}

function setColorUser(i) {
  document.getElementById(`dropDownContact${i}`).classList.add("font-color-white");
}

function setImageChecked(i) {
  const checkboxImage = document.getElementById(`assignedUserCheckbox${i}`);
  if (checkboxImage) {
    checkboxImage.src = "./img/board_card_detail/Check_button_checked_white.svg";
  }
}

function createCardEditMembers() {
  let cardEditMembersContainer = document.getElementById("cardEditMembers");
  cardEditMembersContainer.innerHTML = "";

  for (let i = 0; i < selectedTask["assignedTo"].length; i++) {
    const userId = selectedTask["assignedTo"][i];
    const user = contacts.find((contact) => contact.id === userId);

    if (user) {
      const userInitials = getUserInitials(user);
      const userColorClass = `color-${user.icon}`;
      /*html*/
      cardEditMembersContainer.innerHTML += `
        <div class="member-button align-center justify-center ${userColorClass}">
          <span>${userInitials}</span>
        </div>
      `;
    }
  }
}

function deleteInputAssignedTo() {
  const inputField = document.getElementById("searchUser");
  if (inputField) {
    inputField.value = "";
  }
  createDropDownAssignedTo();
}

function changeIconConfirm() {
  const confirmImage = document.getElementById("addOrConfirm");
  confirmImage.src = "img/board_card_detail/subtasks_confirm.svg";
}

function changIconPlus() {
  const confirmImage = document.getElementById("addOrConfirm");
  confirmImage.src = "./img/board_card_detail/add_subtask.svg";
}

function createSubtasksCardEdit() {
  let subtasksContainer = document.getElementById("subtasksList");
  subtasksContainer.innerHTML = "";

  for (let i = 0; i < selectedTask["subtasks"].length; i++) {
    const subtaskText = selectedTask["subtasks"][i]["content"];

    /*html*/
    subtasksContainer.innerHTML += `
      <li class="subtasks-hover" id="subtaskListItem${i}" ondblclick="editSubtaskCardEdit(${i}, '${subtaskText}')">
        <div class="subtask-item">
          <div class="subtask-text">${subtaskText}</div>
          <div class="edit-delete-subtasks">
            <img src="img/board_card_detail/Subtasks_edit.svg" alt="" onclick="editSubtaskCardEdit(${i}, '${subtaskText}')">
            <img src="img/board_card_detail/subtasks_edit_separator.svg" alt="">
            <img src="img/board_card_detail/subtask_delete.svg" alt="" onclick="deleteSubtaskCardEdit(${i})">
          </div>
        </div>
      </li>
    `;
  }
}

function editSubtaskCardEdit(i, subtaskText) {
  let subtaskItemContainer = document.getElementById(`subtaskListItem${i}`);
  subtaskItemContainer.innerHTML = "";
  /*html*/
  subtaskItemContainer.innerHTML = `
  <li class="" id="">
    <div class="subtask-item-focused">
      <input type="text" name="" id="subtaskValue${i}" class="" value="${subtaskText}">
      <div class="edit-delete-subtask">
        <img src="img/board_card_detail/subtask_delete.svg" alt="" class="hover-gray-circle" onclick="deleteSubtaskCardEdit(${i})">
        <img src="img/board_card_detail/subtasks_edit_separator.svg" alt="">
        <img src="img/board_card_detail/subtasks_confirm.svg" alt="" class="hover-gray-circle" onclick="saveSubtaskCardEdit(${i}, '${subtaskText}')">
      </div>
    </div>
  </li>
  `;
}

function deleteSubtaskCardEdit(i) {
  const subtasks = selectedTask["subtasks"];
  subtasks.splice(i, 1);
  createSubtasksCardEdit();
}

function saveSubtaskCardEdit(i) {
  const subtaskNewValue = document.getElementById(`subtaskValue${i}`).value;
  selectedTask["subtasks"][i]["content"] = subtaskNewValue;
  createSubtasksCardEdit();
}

function addSubtaskCardEdit() {
  const subtaskValue = document.getElementById("addNewSubtask").value;

  const newSubtask = {
    content: subtaskValue,
    checked: false,
  };
  selectedTask.subtasks.unshift(newSubtask);
  createSubtasksCardEdit();
  emptyInputAddSubtask();
}

function emptyInputAddSubtask() {
  document.getElementById("addNewSubtask").value = "";
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

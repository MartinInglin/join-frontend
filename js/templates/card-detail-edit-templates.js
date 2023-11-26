function renderCardEditHTML() {
    /*html*/
    return `
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
}

function renderCardEditDropDownHTML(i, contact) {
    /*html*/
    return `
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
}

function renderMembersCardEditHTML(userColorClass, userInitials) {
    /*html*/
    return `
    <div class="member-button align-center justify-center" style="background-color: ${userColorClass}">
      <span>${userInitials}</span>
    </div>
  `;
}

function renderSubtasksHTML(i, subtaskText) {
    /*html*/
    return `
    <li id="subtaskListItem${i}" class="no-hover" ondblclick="editSubtaskCardEdit(${i}, '${subtaskText}')">
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

function renderSubtasksEditHTML(i, subtaskText) {
    /*html*/
    return `
    <div class="subtask-item-focused">
      <input type="text" name="" id="subtaskValue${i}" class="" value="${subtaskText}">
      <div class="edit-delete-subtask">
        <img src="img/board_card_detail/subtask_delete.svg" alt="" class="hover-gray-circle" onclick="deleteSubtaskCardEdit(${i})">
        <img src="img/board_card_detail/subtasks_edit_separator.svg" alt="">
        <img src="img/board_card_detail/subtasks_confirm.svg" alt="" class="hover-gray-circle" onclick="saveSubtaskCardEdit(${i}, '${subtaskText}')">
      </div>
    </div>
  `;
}
function renderContacts(contact) {
    return `
    <div id="contact${contact.id}" class="contact"onclick="chooseContactToAssign(${contact.id}); doNotTriggerEvent(event)">
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
        <img src="../img/add_task/Check button.png" id="checkContact${contact.id}">
    </div>
`;
}

function renderSubtasks(subtask, i) {
    return `
    <li class="list-element" id="subtask${i}" ondblclick="editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')">
        <div class="list-text pointer">
            <div id="subtaskContent${i}">
                ${subtask.content}
            </div>
            <div class="subtask-button-container">
                <img src="../img/add_task/edit.png" class="pointer" id="editSubtaskIcon1${i}" onclick="editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')">
                <div class="parting-line-buttons"></div>
                <img src="img/add_task/delete.png" class="pointer" id="editSubtaskIcon2${i}" onclick="deleteSubtask('${i}')">
            </div>
        </div>
    </li>`;
}

function showInitialIcon(contact) {
    return `
    <div class="contact-frame">
        <div class="contact-icon">
            <div class="outer-line">
                <div class="inner-line" style="background-color:${contact.icon}">
                    <p class="initialTag">${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}</p>
                </div>
            </div>
        </div>
    </div>
`;
}
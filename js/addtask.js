let priorityOfTask;
let subtasks = [];
let selectedContacts = [];

function initAddTask() {
    setIdOfCurrentPage(1);
    loadContactsSelection();
}

function loadContactsSelection() {
    if (templatesLoaded) {
        let content = document.getElementById('contactsDropDown');
        renderContacts(content);
    } else {
        setTimeout(() => {
            loadContactsSelection();
        }, 50);
    }
}

function renderContacts(content) {
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += `
        <div id="contact${contact.id}" class="contact"onclick="chooseContactToAssign(${contact.id}); doNotTriggerEvent(event)">
            <div class="allign-center">
                <div class="pos-rel">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle id="Ellipse 5" cx="21" cy="21" r="20" fill="${contact.icon}" stroke="white" stroke-width="2"/>
                    </svg>
                    <p class="initialTag">${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}</p>
                </div>
                ${contact.firstname} ${contact.lastname}
            </div>
            <img src="../img/add_task/Check button.png" id="checkContact${contact.id}">
        </div>
    `;
    };
}

function activePrioButton(id) {
    let button1 = document.getElementById('urgent');
    let button2 = document.getElementById('medium');
    let button3 = document.getElementById('low');
    if (priorityOfTask == id) {
        resetAll(button1, button2, button3);
    } else if (id == 'low') {
        highlightButton3(button1, button2, button3);
    } else if (id == 'medium') {
        highlightButton2(button1, button2, button3);
    } else if (id == 'urgent') {
        highlightButton1(button1, button2, button3);
    };
}

function resetAll(button1, button2, button3) {
    resetButton(button1, 'urgent')
    resetButton(button2, 'medium')
    resetButton(button3, 'low')
    priorityOfTask = false;
}

function highlightButton1(button1, button2, button3) {
    activateButton(button1, 'urgent')
    button1.style.backgroundColor = '#FF3D00';
    resetButton(button2, 'medium');
    resetButton(button3, 'low');
}
function highlightButton2(button1, button2, button3,) {
    activateButton(button2, 'medium');
    button2.style.backgroundColor = '#FFA800';
    resetButton(button1, 'urgent');
    resetButton(button3, 'low');
}
function highlightButton3(button1, button2, button3) {
    activateButton(button3, 'low');
    button3.style.backgroundColor = '#7AE229';
    resetButton(button1, 'urgent');
    resetButton(button2, 'medium');
}

function activateButton(button, id) {
    button.style.color = '#FFFFFF';
    button.childNodes[1].src = `../img/add_task/${id}_white.png`;
    priorityOfTask = id;
}

function resetButton(button, id) {
    button.style.backgroundColor = 'white';
    button.style.color = '#000000';
    button.childNodes[1].src = `../img/add_task/${id}.png`;
}

function activateSubtask() {
    let icon1 = document.getElementById('inputSubTaskIcon1');
    let icon2 = document.getElementById('inputSubTaskIcon2');
    let partingLine = document.getElementById('partingLineButtons');
    let input = document.getElementById('inputSubTask');

    icon1.classList.remove('d-none');
    partingLine.classList.remove('d-none');
    icon2.innerHTML = '<img src="../img/add_task/check.png">';
    icon2.setAttribute('onClick', 'addSubtask()');
    input.focus();
}

function clearSubTaskInput() {
    let icon1 = document.getElementById('inputSubTaskIcon1');
    let icon2 = document.getElementById('inputSubTaskIcon2');
    let partingLine = document.getElementById('partingLineButtons');
    let input = document.getElementById('inputSubTask');

    icon1.classList.add('d-none');
    partingLine.classList.add('d-none');
    icon2.innerHTML = '<img src="../img/add_task/done.png">';
    icon2.setAttribute('onClick', 'activateSubtask()');
    input.value = '';
}

function checkInputIsEmpty() {
    return document.getElementById('inputSubTask').value.length == 0;
}

function leaveSubTaskInput() {
    let icon1 = document.getElementById('inputSubTaskIcon1');
    let icon2 = document.getElementById('inputSubTaskIcon2');
    let partingLine = document.getElementById('partingLineButtons');
    if (checkInputIsEmpty()) {
        icon1.classList.add('d-none');
        partingLine.classList.add('d-none');
        icon2.innerHTML = '<img src="../img/add_task/add.png">';
        icon2.setAttribute('onClick', 'activateSubtask()')
    }
}

function addSubtask() {
    let input = document.getElementById('inputSubTask');
    subtasks.push(input.value);
    renderSubtasks();
    input.value = '';
}

function renderSubtasks() {
    let showSubtasks = document.getElementById('showSubtasks');
    let i = 0;
    showSubtasks.innerHTML = '';
    subtasks.forEach((subtask) => {
        showSubtasks.innerHTML += `
            <li class="list-element" id="subtask${i}" ondblclick="editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')">
                <div class="list-text pointer">
                    <div id="subtaskContent${i}">
                        ${subtask}
                    </div>
                    <div class="subtask-button-container">
                        <img src="../img/add_task/edit.png" class="pointer" id="editSubtaskIcon1${i}" onclick="editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')">
                        <div class="parting-line-buttons"></div>
                        <img src="img/add_task/delete.png" class="pointer" id="editSubtaskIcon2${i}" onclick="deleteSubtask('${i}')">
                    </div>
                </div>
            </li>`;
        i++;
    })
}

function clearAll() {
    document.getElementById('inputTitel').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputDate').value = '';
    document.getElementById('inputSubTask').value = '';
    subtasks.splice(0, subtasks.length);
    renderSubtasks();
    renderContactInitialIcons();
}

function editSubtask(id, btn1, btn2, i) {
    let subtask = document.getElementById(id);
    let button1 = document.getElementById(btn1);
    let button2 = document.getElementById(btn2);
    let content = document.getElementById(`subtaskContent${i}`);
    try {
    subtask.setAttribute('contentEditable', 'true');
    content.focus();
    subtask.removeAttribute('onclick');
    button1.setAttribute('src', 'img/add_task/delete.png');
    button1.setAttribute('onclick', `deleteSubtask('${i}'); 'doNotTriggerEvent(event)'`);
    button2.setAttribute('src', 'img/add_task/done.png');
    button2.setAttribute('onclick', `saveEditSubtask('${id}', '${btn1}', '${btn2}', '${i}'); 'doNotTriggerEvent(event)'`);
    } catch (e) {};
}

function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}

function saveEditSubtask(id, btn1, btn2, i) {
    let subtask = document.getElementById(id);
    let content = document.getElementById(`subtaskContent${i}`);
    let button1 = document.getElementById(btn1);
    let button2 = document.getElementById(btn2);
    subtasks.splice(i, 1, content.innerText);
    subtask.removeAttribute('contentEditable');
    button1.setAttribute('src', 'img/add_task/edit.png');
    button1.setAttribute('onclick', `editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')`);
    button2.setAttribute('src', 'img/add_task/delete.png');
    button2.setAttribute('onclick', `deleteSubtask('${i}')`);
    renderSubtasks();
}

function doNotTriggerEvent(event) {
    event.stopPropagation();
}

function openContactList() {
    let contactList = document.getElementById('contactList');
    let openContactsDropDown = document.getElementById('openContactsDropDown');
    contactList.style.height = '352px';
    openContactsDropDown.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        contactList.setAttribute('onclick', 'closeContactList()');
        openContactsDropDown.setAttribute('onclick', 'closeContactList()');
    }, 100);
}

function closeContactList() {
    let contactList = document.getElementById('contactList');
    let openContactsDropDown = document.getElementById('openContactsDropDown');
    contactList.style.height = '50px';
    openContactsDropDown.style.transform = 'rotate(0deg)';
    setTimeout(() => {
        contactList.setAttribute('onclick', 'openContactList(); doNotTriggerEvent(event)');
        openContactsDropDown.setAttribute('onclick', 'openContactList(); doNotTriggerEvent(event)');
    }, 100);
}

function searchContactToAssign() {
    let contactsDropDown = document.getElementById('contactsDropDown');
    let input = document.getElementById('contactInput').value.toLowerCase();
    contactsDropDown.innerHTML = '';
    let matchingContacts = contacts.filter(contact => 
        contact.firstname.toLowerCase().includes(input) || contact.lastname.toLowerCase().includes(input)
    );
    matchingContacts.forEach((contact) => {
        contactsDropDown.innerHTML += `
        <div id="contact${contact.id}" class="contact" onclick="chooseContactToAssign(${contact.id}); doNotTriggerEvent(event)">
            <div class="allign-center">
                <div class="pos-rel">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle id="Ellipse 5" cx="21" cy="21" r="20" fill="${contact.icon}" stroke="white" stroke-width="2"/>
                    </svg>
                    <p class="initialTag">${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}</p>
                </div>
                ${contact.firstname} ${contact.lastname}
            </div>
            <img src="../img/add_task/Check button.png" id="checkContact${contact.id}">
        </div>
        `;
    })
}

function chooseContactToAssign(id) {
    let checkImg = document.getElementById(`checkContact${id}`);
    let contact = document.getElementById(`contact${id}`);
    checkImg.setAttribute('src', '../img/add_task/checked.png');
    contact.setAttribute('onclick', `unchooseContact(${id}); doNotTriggerEvent(event)`);
    contact.classList.add('active-contact');
    selectedContacts.push(id);
    renderContactInitialIcons();
}

function unchooseContact(id) {
    let checkImg = document.getElementById(`checkContact${id}`);
    let contact = document.getElementById(`contact${id}`);
    checkImg.setAttribute('src', '../img/add_task/Check button.png');
    contact.setAttribute('onclick', `chooseContactToAssign(${id}); doNotTriggerEvent(event)`);
    contact.classList.remove('active-contact');
    let i = selectedContacts.indexOf(id);
    selectedContacts.splice(i, 1);
    renderContactInitialIcons();
}

function renderContactInitialIcons() {
    let contactInitialIcons = document.getElementById('contactInitialIcons');
    contactInitialIcons.innerHTML = '';
    selectedContacts.forEach((id) => {
        let contact = contacts[id]
        contactInitialIcons.innerHTML += `
            <div class="selected-initial-contact">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle id="Ellipse 5" cx="21" cy="21" r="20" fill="${contact.icon}" stroke="white" stroke-width="2"/>
                </svg>
                <p class="selected-initial-tag">${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}</p>
            </div>
        `;
    })
}
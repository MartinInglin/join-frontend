let priorityOfTask = null;
let newSubtasks = [];
let selectedContacts = [];
let hiddenContacts = 0;
let nextFreeId;
let contactListOpen = false;
let actualPosition = "Todo"
let switchDropDownCategory = false;

function setPositionTask(positionOfTask) {
    actualPosition = positionOfTask;
}

function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addSubtask();
    }
}

async function initAddTask() {
    await getTasks();
    await getUsers();
    await getCurrentUser();
    await getContacts();
    actuallyUserToContacts();
    loadContactsSelection();
    createHeaderInitials();
    // checkRequiredInput();
}

function loadContactsSelection() {
    if (templatesLoaded) {
        loadContacts();
    } else {
        setTimeout(() => {
            loadContactsSelection();
        }, 50);
    }
}

function loadContacts() {
    let content = document.getElementById('contactsDropDown');
    content.innerHTML = '';
    contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += renderContacts(contact);
    };
}

function activePrioButton(id) {
    let button1 = document.getElementById('urgent');
    let button2 = document.getElementById('medium');
    let button3 = document.getElementById('low');
    checkPrioButton(id, button1, button2, button3);
}

function checkPrioButton(id, button1, button2, button3) {
    if (priorityOfTask == id) {
        resetAll();
    } else if (id == 'low') {
        highlightButton3(button1, button2, button3);
    } else if (id == 'medium') {
        highlightButton2(button1, button2, button3);
    } else if (id == 'urgent') {
        highlightButton1(button1, button2, button3);
    };
}

function resetAll() {
    let button1 = document.getElementById('urgent');
    let button2 = document.getElementById('medium');
    let button3 = document.getElementById('low');
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
        icon2.innerHTML = '<img src="./img/add_task/add.png">';
        icon2.setAttribute('onClick', 'activateSubtask()')
    }
}

function addSubtask() {
    let input = document.getElementById('inputSubTask');
    let newSubtask = {
        content: input.value,
        checked: false,
    };
    newSubtasks.push(newSubtask);
    loadSubtasks();
    input.value = '';
}

function loadSubtasks() {
    let showSubtasks = document.getElementById('showSubtasks');
    let i = 0;
    showSubtasks.innerHTML = '';
    newSubtasks.forEach((subtask) => {
        showSubtasks.innerHTML += renderSubtasks(subtask, i);
        i++;
    })
}

function clearAll() {
    document.getElementById('inputTitel').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputDate').value = '';
    document.getElementById('inputSubTask').value = '';
    document.getElementById('selectCategory').selectedIndex = 0;
    document.getElementById('selectCategory').value = '';
    newSubtasks.splice(0, newSubtasks.length);
    selectedContacts.splice(0, selectedContacts.length);
    resetAll();
    loadSubtasks();
    loadContacts();
    renderContactInitialIcons();
}

function editSubtask(id, btn1, btn2, i) {
    let subtask = document.getElementById(id);
    let button1 = document.getElementById(btn1);
    let button2 = document.getElementById(btn2);
    let content = document.getElementById(`subtaskContent${i}`);
    try {
        makeEditable(subtask, button1, button2, content, id, i, btn1, btn2);
    } catch (e) { };
}

function makeEditable(subtask, button1, button2, content, id, i, btn1, btn2) {
    content.setAttribute('contentEditable', 'true');
    subtask.classList.add('editable-content')
    content.focus();
    subtask.removeAttribute('onclick');
    button1.setAttribute('src', 'img/add_task/delete.png');
    button1.setAttribute('onclick', `deleteSubtask('${i}'); 'doNotTriggerEvent(event)'`);
    button2.setAttribute('src', 'img/add_task/done.png');
    button2.setAttribute('onclick', `saveEditSubtask('${id}', '${btn1}', '${btn2}', '${i}'); 'doNotTriggerEvent(event)'`);
}

function deleteSubtask(i) {
    newSubtasks.splice(i, 1);
    loadSubtasks();
}

function saveEditSubtask(id, btn1, btn2, i) {
    let subtask = document.getElementById(id);
    let content = document.getElementById(`subtaskContent${i}`);
    let button1 = document.getElementById(btn1);
    let button2 = document.getElementById(btn2);
    pushEditSubtask(id, i, subtask, content, button1, button2);
    loadSubtasks();
}

function pushEditSubtask(id, i, subtask, content, button1, button2) {
    newSubtasks.splice(i, 1,
        {
            content: content.innerText,
            checked: false,
        }
    );
    subtask.removeAttribute('contentEditable');
    button1.setAttribute('src', 'img/add_task/edit.png');
    button1.setAttribute('onclick', `editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')`);
    button2.setAttribute('src', 'img/add_task/delete.png');
    button2.setAttribute('onclick', `deleteSubtask('${i}')`);
}

function doNotTriggerEvent(event) {
    event.stopPropagation();
}

function openContactList() {
    let contactList = document.getElementById('contactList');
    let openContactsDropDown = document.getElementById('openContactsDropDown');
    contactListOpen = true;
    checkScreenWidth(contactList);
    openContactsDropDown.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        contactList.setAttribute('onclick', 'closeContactList()');
        openContactsDropDown.setAttribute('onclick', 'closeContactList()');
    }, 100);
}

function checkScreenWidth(contactList) {
    if (window.innerWidth <= 1200) {
        if (contactListOpen) {
            contactList.style.height = '288px';
        } else {
            contactList.style.height = '46px';
        }
    } else {
        if (contactListOpen) {
            contactList.style.height = '352px';
        } else {
            contactList.style.height = '50px';
        }
    }
}

function closeContactList() {
    let contactList = document.getElementById('contactList');
    let openContactsDropDown = document.getElementById('openContactsDropDown');
    contactListOpen = false;
    checkScreenWidth(contactList);
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
        contactsDropDown.innerHTML += renderContacts(contact);
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
    checkImg.setAttribute('src', '../img/add_task/Check_button.png');
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
        let i = getIndexOf(contacts, 'id', id)
        let contact = contacts[i]
        contactInitialIcons.innerHTML += showInitialIcon(contact);
    })
}

function createNewTask() {
    let createTask = document.getElementById('createTask');
    let inputTitel = document.getElementById('inputTitel').value;
    let inputDescription = document.getElementById('inputDescription').value;
    let inputDate = document.getElementById('inputDate').value;
    let selectCategory = document.getElementById('selectCategory').value;
    let dialogSucces = document.getElementById('dialogSucces');
    CreateTaskRoutine(createTask, inputTitel, inputDescription, inputDate, selectCategory, dialogSucces);
}

function CreateTaskRoutine(createTask, inputTitel, inputDescription, inputDate, selectCategory, dialogSucces) {
    nextFreeId = findFreeId(dataTasks);
    createTask.style.backgroundColor = '#091931';
    createJson(nextFreeId, inputTitel, inputDescription, inputDate, selectCategory);
    setTasks();
    checkOpenBoard();
    showSuccessDialog(dialogSucces);
}

function showSuccessDialog(dialogSucces) {
    dialogSucces.classList.remove('d-none');
    setTimeout(() => {
        clearAll();
        dialogSucces.classList.add('d-none');
    }, 1000);
}

function checkOpenBoard() {
    if (idOfCurrentPage == 2) {
        renderTasksBoard();
        setTimeout(() => {
            closeDialog();
        }, 1000);
    } else {
        setTimeout(() => {
            window.open('./board.html', '_self');
        }, 1000);
    }
}

function createJson(nextFreeId, inputTitel, inputDescription, inputDate, selectCategory) {
    let newTask = {
        id: nextFreeId,
        position: actualPosition,
        category: selectCategory,
        title: inputTitel,
        task: inputDescription,
        subtasks: [],
        assignedTo: selectedContacts,
        urgency: priorityOfTask,
        date: inputDate,
    };
    pushSubtasks(newTask);
    dataTasks.push(newTask);
}

function pushSubtasks(newTask) {
    newSubtasks.forEach((task) => {
        newTask.subtasks.push(task);
    });
}

function addNewContact() {
    let addContact = document.getElementById('addContact');
    addContact.style.backgroundColor = '#091931';
}

function toggleDropDownCategory() {
    switchDropDownCategory = !switchDropDownCategory;
    if (switchDropDownCategory) {
        showDropDownCategory();
    } else {
        hideDropDownCategory();
    }
}

function showDropDownCategory() {
    switchDropDownCategory = true;
    const selectCategoryOptions = document.getElementById('selectCategoryOptions');
    const arrow = document.getElementById('arrowDrowpDown');
    selectCategoryOptions.classList.remove('d-none');
    arrow.style.transform = 'rotate(180deg)';
    document.getElementById("selectCategory").focus();
}

function setCategory(category) {
    document.getElementById('selectCategory').value = category;
    hideDropDownCategory();
}

function hideDropDownCategory() {
    const selectCategoryOptions = document.getElementById('selectCategoryOptions');
    const arrow = document.getElementById('arrowDrowpDown');
    selectCategoryOptions.classList.add('d-none');
    arrow.style.transform = 'rotate(0deg)';
    document.getElementById("selectCategory").blur();
    hideDropDownCategoryDelay()
}

function hideDropDownCategoryDelay() {
    setTimeout(function () {
        switchDropDownCategory = false;
    }, 250);
}

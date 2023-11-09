let priorityOfTask;

function initAddTask() {
    setIdOfCurrentPage(1);
    loadContactsSelection();
}

function loadContactsSelection() {
    if (templatesLoaded) {
        let content = document.getElementById('selectContactforTask');
        renderContacts(content);
    } else {
        setTimeout(() => {
            loadContactsSelection();
        }, 50);
    }
}

function renderContacts(content) {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += `
        <option value="${i + 1}">${contact.firstname} ${contact.lastname}</option>
    `;
    };
}

function activePrioButton(id) {
    let button1 = document.getElementById('urgent');
    let button2 = document.getElementById('medium');
    let button3 = document.getElementById('low');
    if (priorityOfTask == id) {
        resetButton(button1, 'urgent')
        resetButton(button2, 'medium')
        resetButton(button3, 'low')
        priorityOfTask = false;
    } else if (id == 'low') {
        activateButton(button3, 'low');
        button3.style.backgroundColor = '#7AE229';
        resetButton(button1, 'urgent');
        resetButton(button2, 'medium');
    } else if (id == 'medium') {
        activateButton(button2, id);
        button2.style.backgroundColor = '#FFA800';
        resetButton(button1, 'urgent');
        resetButton(button3, 'low');
    } else if (id == 'urgent') {
        activateButton(button1, 'urgent')
        button1.style.backgroundColor = '#FF3D00';
        resetButton(button2, 'medium');
        resetButton(button3, 'low');
    };
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
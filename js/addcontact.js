function addNewContact() {
    showAddNewContact();
    let bgMessage = document.getElementById('bg-message');
    bgMessage.classList.remove('d-none');

    let addNewContact = document.getElementById('add-new-contact');

    addNewContact.innerHTML = generatAddNewContactHTML();
}

function showAddNewContact() {
    if (window.innerWidth > 870) {
        let addNewContact = document.getElementById('add-new-contact');
        addNewContact.style.transform = "translate(500%, 0%)";
        setTimeout(() => {
            addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
            addNewContact.style.transform = "translate(0%, 0%)";
        }, 200);
    } if (window.innerWidth <= 870) {
        let addNewContact = document.getElementById('add-new-contact');
        addNewContact.style.transform = "translate(0%, 500%)";
        setTimeout(() => {
            addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
            addNewContact.style.transform = "translate(0%, 0%)";
        }, 200);
    }
}

function closeAddNewContact() {
    if (window.innerWidth > 870) {
        hidenAddNewContact();
        setTimeout(() => {
            let bgMessage = document.getElementById('bg-message');
            bgMessage.classList.add('d-none');
        }, 500);
    } if (window.innerWidth <= 870) {
        hidenAddNewContact();
        setTimeout(() => {
            let bgMessage = document.getElementById('bg-message');
            bgMessage.classList.add('d-none');
        }, 500);
        let showContFunction = document.getElementById('show-cont-function');
        showContFunction.classList.add('d-none');
    }
}

function hidenAddNewContact() {
    if (window.innerWidth > 870) {
        let addNewContact = document.getElementById('add-new-contact');
        setTimeout(() => {
            addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
            addNewContact.style.transform = "translate(500%, 0%)";
        }, 200);
    } if(window.innerWidth <= 870) {
        let addNewContact = document.getElementById('add-new-contact');
        setTimeout(() => {
            addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
            addNewContact.style.transform = "translate(0%, 500%)";
        }, 200);
    }
}

function createNewContact() {
    let nameInput = document.getElementById('nameInput');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');
    let nameParts = nameInput.value.split(' ');
    let firstname = nameParts[0] || '';
    let lastname = nameParts.slice(1).join(' ') || '';

    if (!isValidEmail(emailInput.value)) {
        alert('Invalid email format. Please use e.g. maxmustermann@hotmail.de');
        return;
    }

    let newContact = {
        id: findFreeId(contacts),
        icon: getRandomColor(),
        firstname: firstname,
        lastname: lastname,
        email: emailInput.value,
        'phone-number': phoneInput.value
    };

    contacts.push(newContact);
    setContacts();
    createNewContactMessage();
    setTimeout(() => {
        if (idOfCurrentPage == 1) {
            getContacts();
            setTimeout(() => {
                renderContacts();
            }, 150);
        } else {
            showContact(newContact.id);
        }
        closeAddNewContact();
    }, 100);
}

function getRandomColor() {
    let colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B', '#9b1212', '#7a80e8', '#046657', '#869b4c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createNewContactMessage() {
    let createNewContact = document.getElementById('create-new-contact');

    showMessage(createNewContact);
    hidenMessage(createNewContact);
}

function showMessage(createNewContact) {
    createNewContact.style.transform = "translate(500%, 0%)";
    createNewContact.classList.remove('d-none');
    setTimeout(() => {
        createNewContact.style.transition = "transform 300ms ease, top 300ms ease";
        createNewContact.style.transform = "translate(0%, 0%)";
    }, 800);
}

function hidenMessage(createNewContact) {
    setTimeout(() => {
        createNewContact.style.transition = "transform 800ms ease, top 800ms ease";
        createNewContact.style.transform = "translate(500%, 0%)";
    }, 2500);
}
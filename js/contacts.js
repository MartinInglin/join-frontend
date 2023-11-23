async function init() {
    await getUsers();
    await getCurrentUser();
    await getContacts();
    createHeaderInitials();
    loadContactList();
}

function loadContactList() {
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    let currentLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetter = contact.firstname.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            contactList.innerHTML += generatCurrenLetterHTML(i, currentLetter);
        }

        contactList.innerHTML += generatContactListHTML(i);
        let highlight = document.getElementById(`cont${contact.id}`);
        highlight.classList.remove('cont-clickt');
    }
    hideContact();
}

function getIndexById(contactId) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === contactId) {
            return i;
        }
    }
}

function showContact(id) {
    if (window.innerWidth > 970) {
        loadContactList();
        let i = getIndexById(id);

        const contact = contacts[i];
        let showcontact = document.getElementById('show-contact');
        let info = document.getElementById('info');
        let name = document.getElementById('name');
        let highlight = document.getElementById(`cont${contact.id}`);

        hideContact(i);

        highlight.classList.add('cont-clickt');
        showcontact.classList.remove('d-none');
        name.innerHTML = generatShowContactNameHTML(i, contact);
        info.innerHTML = generatInfoHTML(contact);
        animationShowContact();
    }
}

function animationShowContact() {
    let showcontact = document.getElementById('show-contact');

    setTimeout(() => {
        showcontact.style.transition = "transform 300ms ease, top 300ms ease";
        showcontact.style.transform = "translate(0%, 0%)";
    }, 300);
}

function hideContact() {
    let showcontact = document.getElementById('show-contact');

    showcontact.classList.add('d-none');
    showcontact.style.transform = "translate(500%, 0%)";
}

function editContact(id) {
    showAddNewContact();
    let bgMessage = document.getElementById('bg-message');
    bgMessage.classList.remove('d-none');

    let addNewContact = document.getElementById('add-new-contact');
    let contact = contacts[id];

    addNewContact.innerHTML = generatEditContactHTML(contact);
}

function editOldContact(id) {
    let contact = contacts[id];
    let nameInput = document.getElementById('edit-name');
    let emailInput = document.getElementById('edit-email');
    let phoneInput = document.getElementById('edit-phone');
    let nameParts = nameInput.value.split(' ');
    let firstname = nameParts[0] || '';
    let lastname = nameParts.slice(1).join(' ') || '';

    if (!isValidEmail(emailInput.value)) {
        alert('Invalid email format. Please use e.g. maxmustermann@hotmail.de');
        return;
    }

    contact.icon = contact.icon;
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.email = emailInput.value;
    contact['phone-number'] = phoneInput.value;

    setContacts();
    closeAddNewContact();
    showContact(contact.id);
}

function isValidEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

async function deleteContact(id) {
    if (id >= 0 && id <= contacts.length) {
        contacts.splice(id, 1);
        setContacts();
    } else {
        console.error("Invalid contact ID");
    }
    await getContacts();
    loadContactList();
}

function SVGOnHover(elementId, iconName) {
    const svgElement = document.getElementById(elementId);
    const hoverSVG = `./img/contact/${iconName}.svg`;

    svgElement.src = hoverSVG;
}

function SVGMouseOut(elementId, iconName) {
    const svgElement = document.getElementById(elementId);
    const normalSVG = `./img/contact/${iconName}.png`;

    svgElement.src = normalSVG;
}


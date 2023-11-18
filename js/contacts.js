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
            contactList.innerHTML +=
            /*html*/ `
            <div class="letter">
                <span>${currentLetter}</span>
            </div>
            <div class="letter-underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="354" height="2" viewBox="0 0 354 2" fill="none">
                    <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
                </svg>
            </div>
            `;
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

    addNewContact.innerHTML = 
    /*html*/`
    <div class="add-new-cont-left">
        <div class="icon"> 
            <img src="img/addnewcontact/icon.svg">
        </div>
        <div class="headline-add-new-cont">
            <p>Edit contact</p>
        </div>
        <img src="img/addnewcontact/underline.svg">
    </div>    
    <div onclick="closeAddNewContact()" class="close-btn">
        <img src="img/addnewcontact/close.svg">
    </div>
    <div class="cont-icon-big circle">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
            <circle cx="50" cy="50" r="46" fill="${contact['icon']}" />
            <text x="30" y="58" font-size="24" fill="white">${contact['firstname'].charAt(0)}</text>
            <text x="50" y="58" font-size="24" fill="white">${contact['lastname'].charAt(0)}</text>                    
        </svg>
    </div>
    <form class="info-new-cont" onsubmit="editOldContact(id); return false;">
        <div class="input-field">
            <input id="edit-name" type="text" value="${contact['firstname']} ${contact['lastname']}" pattern="[A-Z]{1}[a-z]{2,} [A-Z]{1}[a-z]{2,}" title="Capitalise the first letter e.g. Max Musterman" placeholder="Name" class="form-control" required>
            <span class="info-icon icon-name"></span>
        </div>
        <div class="input-field"> 
            <input id="edit-email" type="email" value="${contact['email']}" pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$" title="e.g. maxmustermann@hotmail.de" placeholder="Email" class="form-control" required>
            <span class="info-icon icon-email"></span>
        </div>
        <div class="input-field">
            <input id="edit-phone" type="tel" value="${contact['phone-number']}" pattern="[+][0-9]{2} [0-9]{3}-[0-9]{4,}" title="e.g. +49 123-123456789" placeholder="Phone" class="form-control" required>
            <span class="info-icon icon-phone"></span>
        </div>
        <div class="btn-cancel-create">
            <button id="btn-delete" onclick="deleteContact(id)">
                Delete
            </button>
            <button id="btn-save" type="submit">
                Save
                <img src="../img/add_task/check2.png" alt>
            </button>
        </div>
    </form>
    `;
}

function editOldContact(id) {
    let contact = contacts[id];
    let nameInput = document.getElementById('edit-name');
    let emailInput = document.getElementById('edit-email');
    let phoneInput = document.getElementById('edit-phone');
    let nameParts = nameInput.value.split(' ');
    let firstname = nameParts[0] || '';
    let lastname = nameParts.slice(1).join(' ') || '';

    contact.icon = contact.icon;
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.email = emailInput.value;
    contact['phone-number'] = phoneInput.value;

    setContacts();
    closeAddNewContact();
    showContact(contact.id);
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
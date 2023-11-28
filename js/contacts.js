async function init() {
    await getUsers();
    await getCurrentUser();
    await getContacts();
    actuallyUserToContacts();
    createHeaderInitials();
    loadContactList();
}


function loadContactList() {
    if (window.innerWidth > 970) {
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
        }
        hideContact();
    } if (window.innerWidth <= 970) {
        loadContactListMobil();
    }
}


function highlightContact(id) {
    let highlight = document.getElementById(`cont${id}`);
    highlight.classList.toggle('cont-clickt');
}


function loadContactListMobil() {
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
}


function getIndexById(contactId) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === contactId) {
            return i;
        }
    }
}


function showContact(id) {
    if (window.innerWidth > 870) {
        loadContactList();
        let i = getIndexById(id);
        let contact = contacts[i];
        let showcontact = document.getElementById('show-contact');
        let info = document.getElementById('info');
        let name = document.getElementById('name');
        hideContact(i);
        highlightContact(id);
        showcontact.classList.remove('d-none');
        name.innerHTML = generatShowContactNameHTML(i, contact);
        info.innerHTML = generatInfoHTML(contact);
        animationShowContact();
    } if (window.innerWidth <= 870) {
        showContactMobil(id);
    }
}


function showContactMobil(id) {
    let i = getIndexById(id);
    let contact = contacts[i];
    let btnAddNewCont = document.getElementById('btn-add-new-cont-mobil');
    let contactList = document.getElementById('contact-list');
    let headline = document.getElementById('headline');
    let showcontact = document.getElementById('show-contact');
    let name = document.getElementById('name');
    let info = document.getElementById('info');
    btnAddNewCont.classList.add('d-none');
    contactList.classList.add('d-none');
    headline.style.display = "flex";
    showcontact.classList.remove('d-none');
    showcontact.style.transform = "translate(0%, 0%)";
    name.innerHTML = generatShowContactNameMobilHTML(i, contact);
    info.innerHTML = generatInfoHTML(contact);
}


function backToContactlist() {
    let btnAddNewCont = document.getElementById('btn-add-new-cont-mobil');
    let contactList = document.getElementById('contact-list');
    let headline = document.getElementById('headline');
    let showcontact = document.getElementById('show-contact');
    let bgContFunction = document.getElementById('bg-cont-function');

    btnAddNewCont.classList.remove('d-none');
    contactList.classList.remove('d-none');
    headline.style.display = "none";
    showcontact.classList.add('d-none');

    if (!bgContFunction.classList.contains('d-none')) {
        hideContFunction();
    }
}


function showContFunction(id) {
    let showContFunction = document.getElementById('bg-cont-function');
    showContFunction.classList.remove('d-none');
    showContFunction.innerHTML = generatShowContFunctionHTML(id);
    animationShowContFunction();
}


function animationShowContFunction() {
    let showContFunction = document.getElementById('show-cont-function');
    setTimeout(() => {
        showContFunction.style.transition = "transform 300ms ease, top 300ms ease";
        showContFunction.style.transform = "translate(0%, 0%)";
    }, 300);
}


function hideContFunction() {
    let showContFunction = document.getElementById('show-cont-function');
    let bgContFunction = document.getElementById('bg-cont-function');
    setTimeout(() => {
        showContFunction.style.transition = "transform 300ms ease, top 300ms ease";
        showContFunction.style.transform = "translate(500%, 0%)";
    }, 300);
    bgContFunction.classList.add('d-none');
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
    const contactIndex = contacts.findIndex((c) => c.id === id);
    let contact = contacts[contactIndex];
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
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.email = emailInput.value;
    contact['phone-number'] = phoneInput.value;
    contacts[contactIndex] = contact;
    setContacts();
    closeAddNewContact();
    showContact(contact.id);
}


function isValidEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}


function deleteContact(id) {
    const contactIndex = getIndexById(id);

    if (contactIndex !== -1) {
        // Remove the contact at the found index
        contacts.splice(contactIndex, 1);
        setContacts();
    } else {
        console.error("Invalid contact ID");
    }
}

function SVGOnHover(elementId, iconName) {
    const svgElement = document.getElementById(elementId);
    const hoverSVG = `./img/contact/${iconName}_hover.svg`;
    svgElement.src = hoverSVG;
}


function SVGMouseOut(elementId, iconName) {
    const svgElement = document.getElementById(elementId);
    const normalSVG = `./img/contact/${iconName}.svg`;
    svgElement.src = normalSVG;
}


function adjustLayoutWidth() {
    const screenWidth = window.innerWidth;
    const breakpoint = 870;
  
    if (screenWidth <= breakpoint) {
        
    } else {

    }
  }
  
  window.addEventListener("resize", adjustLayoutWidth);
  
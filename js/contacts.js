function init() {
    setIdOfCurrentPage(3);
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

        contactList.innerHTML += generatContactListHTML(contact);
        let highlight = document.getElementById(`cont${contact.id}`);
        highlight.classList.remove('cont-clickt');
    }
    hideContact();
}

function showContact(i, id) {
    loadContactList();
    const contact = contacts[i];
    let showcontact = document.getElementById('show-contact');
    let info = document.getElementById('info');
    let name = document.getElementById('name');
    let highlight = document.getElementById(`cont${id}`);

    hideContact(i);
    highlight.classList.add('cont-clickt');
    showcontact.classList.remove('d-none');
    name.innerHTML = generatShowContactNameHTML(contact);   
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
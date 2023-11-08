function init() {
    setIdOfCurrentPage(3);
}

function loadContactList() {
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactList.innerHTML += generatContactListHTML(i, contact);
        let highlight = document.getElementById(`cont${i}`);
        highlight.classList.remove('cont-clickt');    
    }
    hideContact();
}

function showContact(i) {
    loadContactList();
    const contact = contacts[i];
    let showcontact = document.getElementById('show-contact');
    let info = document.getElementById('info');
    let name = document.getElementById('name');
    let highlight = document.getElementById(`cont${i}`);

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
    showcontact.style.transform = "translate(150%, 0%)";
}
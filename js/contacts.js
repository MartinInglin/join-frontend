function loadContactList() {
    let contactList = document.getElementById('contact-list');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactList.innerHTML += generatContactListHTML(i, contact);
        let highlight = document.getElementById(`cont${i}`);
        highlight.classList.remove('cont-clickt');    
    }
}

function showContact(i) {
    loadContactList();
    const contact = contacts[i];
    let showcontact = document.getElementById('show-contact');
    let info = document.getElementById('info');
    let name = document.getElementById('name');
    let highlight = document.getElementById(`cont${i}`);

    highlight.classList.add('cont-clickt');
    showcontact.classList.remove('d-none');
    name.innerHTML = generatShowContactNameHTML(contact);   
    info.innerHTML = generatInfoHTML(contact);
}
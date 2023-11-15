function addNewContact() {
    showAddNewContact();
    let bgMessage = document.getElementById('bg-message');        
    bgMessage.classList.remove('d-none');

    let addNewContact = document.getElementById('add-new-contact');

    addNewContact.innerHTML = 
    /*html*/`
    <div class="add-new-cont-left">
        <div class="icon"> 
            <img src="img/addnewcontact/icon.svg">
        </div>
        <div class="headline-add-new-cont">
            <p>Add contact</p>
            <span>Tasks are better with a team!</span>
        </div>
        <img src="img/addnewcontact/underline.svg">
    </div>    
    <div onclick="closeAddNewContact()" class="close-btn">
        <img src="img/addnewcontact/close.svg">
    </div>
    <div class="circle">
        <img src="img/addnewcontact/circle.svg">
        <div class="img-person">
            <img src="img/addnewcontact/person.svg">
        </div>
    </div>
    <div class="info-new-cont">
        <div class="input-field">
            <input id="name" type="text" placeholder="Name" class="form-control" required>
            <span class="info-icon icon-name"></span>            
        </div>
        <div class="input-field">
            <input id="email" type="email" placeholder="Email" class="form-control" required>
            <span class="info-icon icon-email"></span>
        </div>
        <div class="input-field">
            <input id="phone" type="number" placeholder="Phone" class="form-control" required>
            <span class="info-icon icon-phone"></span>
        </div>
    </div>
    <div class="btn-cancel-create">
        <button id="btn-cancel" onclick="closeAddNewContact()">Cancel
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0692 12.0001L17.3122 17.2431M6.82617 17.2431L12.0692 12.0001L6.82617 17.2431ZM17.3122 6.75708L12.0682 12.0001L17.3122 6.75708ZM12.0682 12.0001L6.82617 6.75708L12.0682 12.0001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button id="btn-create" onclick="createNewContact()">Create contact
            <img src="../img/add_task/check2.png" alt>
        </button>
    </div>
    `;
}

function showAddNewContact() {
    let addNewContact = document.getElementById('add-new-contact');
    addNewContact.style.transform = "translate(500%, 0%)";
    setTimeout(() => {
        addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
        addNewContact.style.transform = "translate(0%, 0%)";
    }, 200);
}

function closeAddNewContact() {
    hidenAddNewContact();
    setTimeout(() => {
        let bgMessage = document.getElementById('bg-message');        
        bgMessage.classList.add('d-none');
    }, 500);
}

function hidenAddNewContact() {
    let addNewContact = document.getElementById('add-new-contact');
    setTimeout(() => {
        addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
        addNewContact.style.transform = "translate(500%, 0%)";
    }, 200);

}

function createNewContact() {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');
    let nameParts = nameInput.value.split(' ');
    let firstname = nameParts[0] || '';
    let lastname = nameParts.slice(1).join(' ') || '';

    let newContact = {
        id: findFreeId(contacts), 
        icon: getRandomColor(),
        firstname: firstname,
        lastname: lastname,
        email: emailInput.value,
        'phone-number': phoneInput.value
    };

    contacts.push(newContact);

    closeAddNewContact();
    showContact(contacts.length -1, newContact.id);
}

function getRandomColor() {
    let colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow', 'aqua', 'beige', 'aquamarine', 'violet', 'darkgoldenrod', 'firebrick', 'olive', 'salmon', 'sienna', 'cyan', 'dimgray', 'darkred', 'navy'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createNewContactMessage() {
    let createNewContact = document.getElementById('create-new-contact');
    
    createNewContact.classList.remove('d-none');
}
function addNewContact() {
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
    <div class="close-btn">
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
            <input type="text" placeholder="Name" class="form-control" required>
            <span class="info-icon icon-name"></span>            
        </div>
        <div class="input-field">
            <input type="email" placeholder="Email" class="form-control" required>
            <span class="info-icon icon-email"></span>
        </div>
        <div class="input-field">
            <input type="number" placeholder="Phone" class="form-control" required>
            <span class="info-icon icon-phone"></span>
        </div>
    </div>
    <div class="btn-cancel-create">
        <div class="btn-cancel">
            <span>Cancel</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="btn-create">
            <span>Create contact</span>
            <img src="/img/addnewcontact/check.svg">
        </div>
    </div>
    `;
}
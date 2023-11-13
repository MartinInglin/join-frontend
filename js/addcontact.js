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
    <div>

    </div>
    `;
}
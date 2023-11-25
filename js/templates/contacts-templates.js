function generatCurrenLetterHTML(i, currentLetter) {
    return  /*html*/ `
    <div class="letter">
        <span>${currentLetter}</span>
    </div>
    <div class="letter-underline">
    </div>
    `;
}

function generatContactListHTML(i) {
    return  /*html*/`
    <div id="cont${contacts[i].id}" onclick="showContact(${contacts[i].id})" class="cont">
        <div class="cont-icon">
            <div>
                <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="21" fill="white" />
                    <circle cx="21" cy="21" r="18" fill="${contacts[i]['icon']}" />
                    <text x="12" y="25" font-size="12" fill="white">${contacts[i]['firstname'].charAt(0)}</text>
                    <text x="22" y="25" font-size="12" fill="white">${contacts[i]['lastname'].charAt(0)}</text>                    
                </svg>
            </div>
        </div>
        <div class="cont-name-mail">
            <span>${contacts[i]['firstname']} ${contacts[i]['lastname']}</span>
            <a href="#">${contacts[i]['email']}</a>
        </div>
    </div>
    `;
}

function generatShowContactNameHTML(i, contact) {
    return /*html*/`
    <div class="cont-icon-big">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
            <circle cx="50" cy="50" r="46" fill="${contact['icon']}" />
            <text x="30" y="58" font-size="24" fill="white">${contact['firstname'].charAt(0)}</text>
            <text x="50" y="58" font-size="24" fill="white">${contact['lastname'].charAt(0)}</text>                    
        </svg>
    </div>
    <div class="cont-big-name">
        <span>${contact['firstname']} ${contact['lastname']}</span>
        <div class="cont-function">
            <div class="cont-function-edit">
                <div onclick="editContact(${i})" class="edit" onmouseover="SVGOnHover('editImg', 'edit')" onmouseout="SVGMouseOut('editImg', 'edit')" onclick="showCardEdit()">
                  <img src="./img/board_card_detail/edit.svg" alt="" id="editImg">
                  <div>Edit</div>
                </div>
            </div>
            <div onclick="deleteContact(${i})" class="cont-function-delete">
                <div class="delete" onmouseover="SVGOnHover('deleteImg', 'delete')" onmouseout="SVGMouseOut('deleteImg', 'delete')">
                  <img src="./img/contact/delete.png" alt="" id="deleteImg">
                  <div>Delete</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function generatShowContactNameMobilHTML(i, contact) {
    return /*html*/`
        <div class="cont-icon-big">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
            <circle cx="50" cy="50" r="46" fill="${contact['icon']}" />
            <text x="30" y="58" font-size="24" fill="white">${contact['firstname'].charAt(0)}</text>
            <text x="50" y="58" font-size="24" fill="white">${contact['lastname'].charAt(0)}</text>                    
        </svg>
    </div>
    <div class="cont-big-name">
        <span>${contact['firstname']} ${contact['lastname']}</span>
    </div>
    <div onclick="showContFunction(id)" class="cont-function-menu">
        <img src="img/contact/menu.svg">
    </div>
    `;
}

function generatInfoHTML(contact) {
    return /*html*/`
    <div class="email">
        <p>Email</p>
        <a href="#">${contact['email']}</a>
    </div>
    <div class="phone">
        <p>Phone</p>
        <a href="#">${contact['phone-number']}</a>
    </div>
    `;
}

function generatEditContactHTML(contact) {
    return  /*html*/`
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
    </div>
    <div class="cont-icon-big circle">
        <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" fill="${contact['icon']}" />
            <text x="30" y="70" font-size="40" fill="white">${contact['firstname'].charAt(0)}</text>
            <text x="65" y="70" font-size="40" fill="white">${contact['lastname'].charAt(0)}</text>                    
        </svg>
    </div>
    <form class="info-new-cont" onsubmit="editOldContact(${contact['id']}); return false;">
        <div class="input-field">
            <input id="edit-name" type="text" value="${contact['firstname']} ${contact['lastname']}" pattern="[A-Z]{1,}[a-z]{2,} [A-Z]{1,}[a-z]{2,}" title="Capitalise the first letter e.g. Max Musterman" placeholder="Name" class="form-control" required>
            <span class="info-icon icon-name"></span>
        </div>
        <div class="input-field"> 
        <!-- pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$" -->
            <input id="edit-email" type="email" value="${contact['email']}" title="e.g. maxmustermann@hotmail.de" placeholder="Email" class="form-control" required>
            <span class="info-icon icon-email"></span>
        </div>
        <div class="input-field">
            <input id="edit-phone" type="tel" value="${contact['phone-number']}" pattern="[+][0-9]{2} [0-9]{3}-[0-9]{4,}" title="e.g. +49 123-123456789" placeholder="Phone" class="form-control" required>
            <span class="info-icon icon-phone"></span>
        </div>
        <div class="btn-cancel-create">
            <button id="btn-delete" onclick="deleteContact(${contact['id']})">
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
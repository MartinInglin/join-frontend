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
                <div onclick="editContact(i)" class="edit" onmouseover="SVGOnHover('editImg', 'edit')" onmouseout="SVGMouseOut('editImg', 'edit')" onclick="showCardEdit()">
                  <img src="./img/board_card_detail/edit.svg" alt="" id="editImg">
                  <div>Edit</div>
                </div>
            </div>
            <div onclick="deleteContact(i)" class="cont-function-delete">
                <div class="delete" onmouseover="SVGOnHover('deleteImg', 'delete')" onmouseout="SVGMouseOut('deleteImg', 'delete')">
                  <img src="./img/contact/delete.png" alt="" id="deleteImg">
                  <div>Delete</div>
                </div>
            </div>
        </div>
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
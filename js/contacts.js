function loadContactList() {
    let contactList = document.getElementById('contact-list');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactList.innerHTML +=
        /*html*/`
        <div id="cont${i}" onclick="showContact(${i})" class="cont">
            <div class="cont-icon">
                <div>
                    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="white" />
                        <circle cx="21" cy="21" r="18" fill="${contact['icon']}" />
                        <text x="12" y="25" font-size="12" fill="white">${contact['firstname'].charAt(0)}</text>
                        <text x="22" y="25" font-size="12" fill="white">${contact['lastname'].charAt(0)}</text>                    
                    </svg>
                </div>
            </div>
            <div class="cont-name-mail">
                <span>${contact['firstname']} ${contact['lastname']}</span>
                <a href="#">${contact['email']}</a>
            </div>
        </div>
        `;
    }
}

function showContact(i) {
    const contact = contacts[i];
    let showcontact = document.getElementById('show-contact');
    let info = document.getElementById('info');
    let name = document.getElementById('name');

    showcontact.classList.remove('d-none');
    name.innerHTML = 
    /*html*/`
        <div class="show-cont-name">
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="21" fill="white" />
                <circle cx="21" cy="21" r="18" fill="${contact['icon']}" />
                <text x="12" y="25" font-size="12" fill="white">${contact['firstname'].charAt(0)}</text>
                <text x="22" y="25" font-size="12" fill="white">${contact['lastname'].charAt(0)}</text>                    
            </svg>
        </div>
        <div>
            <span>${contact['firstname']} ${contact['lastname']}</span>
            <div>
                <p><img src="./img/contact/edit.png">Edit</p>
                <p><img src="./img/contact/delete.png">Delete</p>
            </div>
        </div>
    `;

    info.innerHTML = 
    /*html*/`
        <div>
            <p>Email</p>
            <a href="#">${contact['email']}</a>
        </div>
        <div>
            <p>Phone</p>
            <a href="#">${contact['phone-number']}</a>
        </div>
    `;

}
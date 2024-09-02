/**
 * This function generates HTML for the current letter and an underline.
 *
 * @param {number} i - The index.
 * @param {string} currentLetter - The current letter.
 * @returns {string} The generated HTML.
 */
function generatCurrenLetterHTML(i, currentLetter) {
  return /*html*/ `
    <div class="letter">
        <span>${currentLetter}</span>
    </div>
    <div class="letter-underline">
    </div>
    `;
}

/**
 * This function generates HTML for a contact list item.
 *
 * @param {number} i - The index.
 * @returns {string} The generated HTML.
 */
function generatContactListHTML(i, letter) {
  return /*html*/ `
    <div id="cont${contacts[i].id}" onclick="showContact(${contacts[i].id})" class="cont">
        <div class="cont-icon">
            <div>
                <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="21" fill="white" />
                    <circle cx="21" cy="21" r="18" fill="${contacts[i]["user_color"]}" />
                    <text x="12" y="25" font-size="12" fill="white">${letter}</text>                  
                </svg>
            </div>
        </div>
        <div class="cont-name-mail">
            <span>${contacts[i]["username"]}</span>
        </div>
    </div>
    `;
}

function generatContactListCurrentUserHTML(i, letter) {
  return /*html*/ `
      <div id="cont${contacts[i].id}" onclick="showContact(${contacts[i].id})" class="cont">
          <div class="cont-icon">
              <div>
                  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="21" cy="21" r="21" fill="white" />
                      <circle cx="21" cy="21" r="18" fill="${contacts[i]["user_color"]}" />
                      <text x="12" y="25" font-size="12" fill="white">${letter}</text>                  
                  </svg>
              </div>
          </div>
          <div class="cont-name-mail">
              <span>${contacts[i]["username"]} (You)</span>
          </div>
      </div>
      `;
}

/**
 * This function generates HTML for displaying a contact's name and icon.
 *
 * @param {number} i - The index.
 * @param {Object} contact - The contact object.
 * @returns {string} The generated HTML.
 */
function generatShowContactNameHTML(i, contact) {
  return /*html*/ `
    <div class="cont-icon-big">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
            <circle cx="50" cy="50" r="46" fill="${contact["user_color"]}" />
            <text x="30" y="58" font-size="24" fill="white">${contact["username"].charAt(0)}</text>                
        </svg>
    </div>
    <div class="cont-big-name">
        <span>${contact["username"]}</span>
        <div class="cont-function">
            <div onclick="deleteContact(${contact.id})" class="cont-function-delete">
                <div class="delete" onmouseover="SVGOnHover('deleteImg', 'delete')" onmouseout="SVGMouseOut('deleteImg', 'delete')">
                  <img src="./img/contact/delete.svg" id="deleteImg">
                  <div>Remove from Team</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function generatShowContactCurrentUserNameHTML(i, contact) {
  return /*html*/ `
      <div class="cont-icon-big">
          <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="white" />
              <circle cx="50" cy="50" r="46" fill="${contact["user_color"]}" />
              <text x="30" y="58" font-size="24" fill="white">${contact["username"].charAt(0)}</text>                
          </svg>
      </div>
      <div class="cont-big-name">
          <span>${contact["username"]} (You)</span>
          <div class="cont-function">
              <div onclick="deleteContact(${contact.id})" class="cont-function-delete">
              </div>
          </div>
      </div>
      `;
}

/**
 * This function generates HTML for displaying a contact's name and icon on mobile.
 *
 * @param {Object} contact - The contact object.
 * @returns {string} The generated HTML.
 */
function generatShowContactNameMobilHTML(contact) {
  return /*html*/ `
        <div class="cont-icon-big">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
            <circle cx="50" cy="50" r="46" fill="${contact["user_color"]}" />
            <text x="30" y="58" font-size="24" fill="white">${contact["username"].charAt(0)}</text>                  
        </svg>
    </div>
    <div class="cont-big-name">
        <span>${contact["username"]}</span>
    </div>
    <div onclick="showContFunction(${contact.id})" class="cont-function-menu">
        <img src="img/contact/menu.svg">
    </div>
    `;
}

function generatShowContactNameCurrentUserMobilHTML(contact) {
  return /*html*/ `
          <div class="cont-icon-big">
          <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="white" />
              <circle cx="50" cy="50" r="46" fill="${contact["user_color"]}" />
              <text x="30" y="58" font-size="24" fill="white">${contact["username"].charAt(0)}</text>                  
          </svg>
      </div>
      <div class="cont-big-name">
          <span>${contact["username"]} (You)</span>
      </div>
      `;
}

/**
 * This function generates HTML for displaying contact function options on mobile.
 *
 * @param {number} id - The contact ID.
 * @returns {string} The generated HTML.
 */
function generatShowContFunctionHTML(id, index) {
  return /*html*/ `
    <div id="show-cont-function" class="show-cont-function">
        <div onclick="deleteContact(${id})" class="cont-function-delete-mobil">
            <div class="delete" onmouseover="SVGOnHover('delete-img', 'delete')" onmouseout="SVGMouseOut('delete-img', 'delete')">
                <img src="./img/contact/delete.svg" id="delete-img">
                <span>Remove from team</span>
            </div>
        </div>
    </div>
    `;
}

/**
 * This function generates HTML for displaying contact information.
 *
 * @param {Object} contact - The contact object.
 * @returns {string} The generated HTML.
 */
function generatInfoHTML(contact) {
  return /*html*/ `
    <div class="email">
        <p>Email</p>
        <a href="#">${contact["email"]}</a>
    </div>
    `;
}

/**
 * This function generates HTML for editing a contact.
 *
 * @param {Object} contact - The contact object.
 * @returns {string} The generated HTML.
 */
function generatEditContactHTML(contact) {
  return /*html*/ `
    <div class="add-new-cont-left">
        <div class="icon"> 
            <img src="img/add_new_contact/icon.svg">
        </div>
        <div class="headline-add-new-cont">
            <p>Edit contact</p>
        </div>
        <img src="img/add_new_contact/underline.svg">
    </div>    
    <div onclick="closeAddNewContact()" class="close-btn">
    </div>
    <div class="cont-icon-big circle">
        <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" fill="${contact["icon"]}" />
            <text x="30" y="70" font-size="40" fill="white">${contact["firstname"].charAt(0)}</text>
            <text x="65" y="70" font-size="40" fill="white">${contact["lastname"].charAt(0)}</text>                    
        </svg>
    </div>
    <form class="info-new-cont" onsubmit="editOldContact(${contact["id"]}); return false;">
        <div class="input-field">
            <input id="edit-name" type="text" value="${contact["firstname"]} ${
    contact["lastname"]
  }" pattern="[A-ZÄÖÜß][a-zA-ZäöüÄÖÜß ]* [A-ZÄÖÜß][a-zA-ZäöüÄÖÜß]*" title="Capitalise the first letter e.g. Max Musterman" placeholder="Name" class="form-control" required>
            <span class="info-icon icon-name"></span>
        </div>
        <div class="input-field"> 
            <input id="edit-email" type="email" value="${
              contact["email"]
            }" title="e.g. maxmustermann@hotmail.de" placeholder="Email" class="form-control" required>
            <span class="info-icon icon-email"></span>
        </div>
        <div class="input-field">
            <input id="edit-phone" type="tel" value="${
              contact["phone-number"]
            }" pattern="[0-9 ]{6,}" title="You must enter at least 6 characters. Only numbers allowed." placeholder="Phone" class="form-control" required>
            <span class="info-icon icon-phone"></span>
        </div>
        <div class="btn-cancel-create">
            <button type="button" id="btn-delete" onclick="deleteContact(${IdOfCurrentContact})">
                Delete
            </button>
            <button id="btn-save" type="submit">
                Save
                <img src="./img/add_task/check2.png" alt>
            </button>
        </div>
    </form>
    `;
}

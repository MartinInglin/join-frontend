let sideMenuLinks = ['summary', 'addTask', 'board', 'contacts', 'privacypolicy', 'legalnotice']
let idOfCurrentPage = 6;
let templatesLoaded = false;
const STORAGE_TOKEN = 'RPU0FT0UVM1WMXF2YVD579M9QJN3HJWKW84Z2NEB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}
/**
 * This function is used to including template HTML to other Pages.
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    highlightCurrentPageLink();
    templatesLoaded = true;
}

/**
 * This function open the Menu by clicking on the User-Initial-Icon.
 * 
 */
function openSubMenu() {
    document.getElementById('subMenu').classList.remove('d-none');
}

/**
 * This function close the Menu.
 * 
 */
function closeSubMenu() {
    document.getElementById('subMenu').classList.add('d-none');
}

function setIdOfCurrentPage(id) {
    idOfCurrentPage = id;
  }

/**
 * This function Highlighted the current Page on Menu
 * 
 * @param {String} id - This parameter is passed when calling the function
 */
function highlightCurrentPageLink() {
    resetHighlight();
    if (idOfCurrentPage < sideMenuLinks.length) {
    document.getElementById(sideMenuLinks[idOfCurrentPage]).classList.add('current');
    };
}

 /**
  * This Function reset all Highlights on Menu
  *  
  */
function resetHighlight() {
    sideMenuLinks.forEach((link) => {
        document.getElementById(link).classList.remove('current');
    })
}

/**
 * This function returns the initials of the user.
 * @param {string} user - This parameter refers to the array contacts in arraycontacts.js and should look like this: contacts[0]
 * @returns 
 */
function getUserInitials(user) {
    const firstnameInitial = user.firstname.charAt(0).toUpperCase();
    const lastnameInitial = user.lastname.charAt(0).toUpperCase();
    return firstnameInitial + lastnameInitial;
}

function goBackToLastPage() {
    window.history.back();
}
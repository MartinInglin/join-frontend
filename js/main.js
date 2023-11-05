let sideMenuLinks = ['summary', 'addTask', 'board', 'contacts']

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

/**
 * This function Highlighted the current Page on Menu
 * 
 * @param {String} id - This parameter is passed when calling the function
 */
function highlightCurrentPageLink(id) {
    resetHighlight();
    document.getElementById(id).classList.add('current');
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
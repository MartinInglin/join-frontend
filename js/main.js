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

function openSubMenu() {
    document.getElementById('subMenu').classList.remove('d-none');
}

function closeSubMenu() {
    document.getElementById('subMenu').classList.add('d-none');
}
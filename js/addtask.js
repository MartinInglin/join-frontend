function init() {
    setIdOfCurrentPage(1);
    loadContactsSelection();
}

function loadContactsSelection() {
    if (templatesLoaded) {
        let content = document.getElementById('selectContactforTask');
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            content.innerHTML += `
            <option value="${i + 1}">${contact.firstname} ${contact.lastname}</option>
        `;
        }
    } else {
        setTimeout(() => {
            loadContactsSelection();
        }, 50);
    }
}
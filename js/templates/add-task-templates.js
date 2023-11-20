// function renderContacts(contact) {
//     return `
//     <div id="contact${contact.id}" class="contact"onclick="chooseContactToAssign(${contact.id}); doNotTriggerEvent(event)">
//         <div class="contact-icon">
//             <div class="contact-icon">
//                 <div class="outer-line">
//                     <div class="inner-line" style="background-color:${contact.icon}">
//                         <p class="initialTag">${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}</p>
//                     </div>
//                 </div>
//             </div>
//             ${contact.firstname} ${contact.lastname}
//         </div>
//         <img src="../img/add_task/Check button.png" id="checkContact${contact.id}">
//     </div>
// `;
// }
function createDropDownAssignedTo() {
    let dropDownContainer = document.getElementById("dropDownAssignedToContainer");
    dropDownContainer.innerHTML = "";
  
    const filteredUsers = filterUsers();
  
    for (let i = 0; i < filteredUsers.length; i++) {
      const contact = filteredUsers[i];
      contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
      dropDownContainer.innerHTML += renderCardEditDropDownHTML(i, contact)
  
      if (selectedTask["assignedTo"].includes(contact.id)) {
        styleUserSelected(i);
      }
    }
  }
  
  function toggleDropDownAssignedTo() {
    document.getElementById("dropDownAssignedToContainer").classList.toggle("d-none");
    const dropDownArrow = document.getElementById("openDropDownAssign");
    dropDownArrow.classList.toggle("rotate-180");
  }
  
  function showDropDownAssignedTo() {
    document.getElementById("dropDownAssignedToContainer").classList.remove("d-none");
    const dropDownArrow = document.getElementById("openDropDownAssign");
    dropDownArrow.classList.add("rotate-180");
  }
  
  function closeDropDownAssignedTo(event) {
    const dropDownContainer = document.getElementById("dropDownAssignedToContainer");
    if (!dropDownContainer.classList.contains("d-none")) {
      dropDownContainer.classList.add("d-none");
      const dropDownArrow = document.getElementById("openDropDownAssign");
      dropDownArrow.classList.remove("rotate-180");
    }
  }
  
  function stopPropagation(event) {
    const dropDownContainer = document.getElementById("dropDownAssignedToContainer");
    if (!dropDownContainer.contains(event.target)) {
      event.stopPropagation();
    }
  }
  
  function addContactToAssign(contactID) {
    const assignedToIndex = selectedTask["assignedTo"].indexOf(contactID);
  
    if (assignedToIndex !== -1) {
      selectedTask["assignedTo"].splice(assignedToIndex, 1);
    } else {
      selectedTask["assignedTo"].push(contactID);
    }
  
    createDropDownAssignedTo();
    createCardEditMembers();
  }
  
  function styleUserSelected(i) {
    setBackgroundColorUser(i);
    setColorUser(i);
    setImageChecked(i);
  }
  
  function setBackgroundColorUser(i) {
    document.getElementById(`dropDownContact${i}`).classList.add("background-color-dark");
  }
  
  function setColorUser(i) {
    document.getElementById(`dropDownContact${i}`).classList.add("font-color-white");
  }
  
  function setImageChecked(i) {
    const checkboxImage = document.getElementById(`assignedUserCheckbox${i}`);
    if (checkboxImage) {
      checkboxImage.src = "./img/board_card_detail/Check_button_checked_white.svg";
    }
  }
  
  function createCardEditMembers() {
    let cardEditMembersContainer = document.getElementById("cardEditMembers");
    cardEditMembersContainer.innerHTML = "";
  
    for (let i = 0; i < selectedTask["assignedTo"].length; i++) {
      const userId = selectedTask["assignedTo"][i];
      const user = contacts.find((contact) => contact.id === userId);
  
      if (user) {
        const userInitials = getUserInitials(user);
        const userColorClass = user.icon;
        cardEditMembersContainer.innerHTML += renderMembersCardEditHTML(userColorClass, userInitials);
      }
    }
  }
  
  function deleteInputAssignedTo() {
    const inputField = document.getElementById("searchUser");
    if (inputField) {
      inputField.value = "";
    }
    createDropDownAssignedTo();
  }
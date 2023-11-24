function filterTasks() {
  const filterInput = document.getElementById("searchInput");
  const filterValue = filterInput.value.toLowerCase();
  renderTasksBoard(filterValue);
}

function filterUsers() {
  const searchInput = document.getElementById("searchUser").value.toLowerCase();

  if (searchInput.trim() === "") {
    return contacts;
  }

  return contacts.filter((contact) => {
    const fullName = `${contact.firstname.toLowerCase()} ${contact.lastname.toLowerCase()}`;
    return fullName.includes(searchInput);
  });
}



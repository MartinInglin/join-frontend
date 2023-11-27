let anyFilteredTasks = false;

function filterTasks() {
  const filterInput = document.getElementById("searchInput");
  const filterValue = filterInput.value.toLowerCase();
  renderTasksBoard(filterValue);
}

function filterTasksByColumn(filterString, columnIndex) {
  if (filterString) {
    return dataTasks.filter((task) => task.position === columns[columnIndex] && (task.title.toLowerCase().includes(filterString) || task.task.toLowerCase().includes(filterString)));
  } else {
    return dataTasks.filter((task) => task.position === columns[columnIndex]);
  }
}

function showHideMessageNoTasksFound() {
  if (anyFilteredTasks) {
    hideMessageNoTasksFound();
  } else {
    showMessageNoTasksFound();
  }
}

function showMessageNoTasksFound() {
  document.getElementById("noTasksFound").classList.remove("d-none");
}

function hideMessageNoTasksFound() {
  document.getElementById("noTasksFound").classList.add("d-none");
}

function adjustLayoutFilter() {
  let filterValue = getValueofFilter();
  const screenWidth = window.innerWidth;
  const breakpoint = 970;
  let containerSearchInputDesktop = document.getElementById("searchInputDesktop");
  let containerSearchInputMedia = document.getElementById("searchInputMedia");

  if (screenWidth <= breakpoint) {
    containerSearchInputDesktop.innerHTML = "";
    containerSearchInputMedia.innerHTML = createSearchInput();
  } else {
    containerSearchInputMedia.innerHTML = "";
    containerSearchInputDesktop.innerHTML = createSearchInput();
  }
  if (searchInput) {
    setFilterValue(filterValue);
  }
  showHideMessageNoTasksFound();
}

window.addEventListener("resize", adjustLayoutFilter);

function getValueofFilter() {
  let filterValue = null;
  let searchInput = document.getElementById("searchInput");
  if (searchInput) {
    filterValue = searchInput.value;
  }
  return filterValue;
}

function setFilterValue(filterValue) {
  document.getElementById("searchInput").value = filterValue;
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

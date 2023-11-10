function filterTasks() {
    const filterInput = document.getElementById("searchInput");
    const filterValue = filterInput.value.toLowerCase();
    createTasks(filterValue);
  }
  
  
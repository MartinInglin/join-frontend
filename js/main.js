let sideMenuLinks = ["summary", "addTask", "board", "contacts", "privacypolicy", "legalnotice"];
let idOfCurrentPage = 6;
let templatesLoaded = false;
const STORAGE_TOKEN = "RPU0FT0UVM1WMXF2YVD579M9QJN3HJWKW84Z2NEB";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let currentUser;
let userContactId;
let backendDataTasks;

/**
 * This function is used to get the users-informations on all sub-pages.
 *
 */
async function initOthers() {
  await getCurrentUser();
  createHeaderInitials();
  checkLoginStatus();
}

// /**
//  * This is the General Function to upload informations to the Server.
//  * @param {string} key - This is the parameter, to find the informations on the server.
//  * @param {string} value - The value are the imformations to safe.
//  * @returns - Ensures that after the function is called, other functions wait for it.
//  */
// async function setItem(key, value) {
//   const payload = { key, value, token: STORAGE_TOKEN };
//   return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
// }

// /**
//  * This is a function to get the safed informations from the server.
//  * @param {string} key - Is needed do identify the right value.
//  * @returns - Ensures that after the function is called, other functions wait for it.
//  */
// async function getItem(key) {
//   const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
//   return fetch(url).then((res) => res.json());
// }

// /**
//  * This function safes the Tasks on the Server.
//  *
//  */
// function setTasks() {
//   setItem("tasks", dataTasks);
// }

// /**
//  * This function safes the Users on the Server.
//  *
//  */
// function setUsers() {
//   setItem("users", users);
// }

// /**
//  * This function safes the Contacts on the Server.
//  *
//  */
// function setContacts() {
//   setItem("contacts", contacts);
// }

// /**
//  * This function safes the variable of current User on the Server.
//  *
//  */
// async function setCurrentUser(id) {
//   return setItem("currentUser", id);
// }

async function updateTask(data, index) {
  const url = "http://localhost:8000/board/";
  const token = currentUser.token;
  let updatedData = adaptDataStringsForBackend(data);
  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updatedData),
  })
    .then(async (response) => {
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Error occured when updating task.");
      }
      return response.json();
    })
    .then((json) => {
      const dataTask = adaptDataStringsForFrontend(json);
      if (dataTask.author == currentUser.user_id || dataTask.assignedTo.some((element) => element.id === currentUser.user_id)) {
        dataTasks[index] = dataTask;
      } else {
        dataTasks.splice(index, 1)
      }
      renderTasksBoard();
    })
    .catch((error) => {
      console.error("Updating task failed:", error.message);
    });
}

function adaptDataStringsForBackend(dataTask) {
  if (dataTask.position === "Todo") {
    dataTask.position = "todo";
  } else if (dataTask.position === "InProgress") {
    dataTask.position = "in_progress";
  } else if (dataTask.position === "AwaitFeedback") {
    dataTask.position = "await_feedback";
  } else {
    dataTask.position = "done";
  }
  if (dataTask.catergory === "Technical Task") {
    dataTask.category = "technical_task";
  } else {
    dataTask.category = "user_story";
  }
  let userIds = [];
  if (dataTask.assignedTo.length != 0) {
    dataTask.assignedTo.forEach((user) => {
      userIds.push(user.id);
    });
    dataTask.assignedTo = userIds;
  }
  return dataTask;
}

function adaptDataStringsForFrontend(dataTask) {
  if (dataTask.position === "todo") {
    dataTask.position = "Todo";
  } else if (dataTask.position === "in_progress") {
    dataTask.position = "InProgress";
  } else if (dataTask.position === "await_feedback") {
    dataTask.position = "AwaitFeedback";
  } else {
    dataTask.position = "Done";
  }
  if (dataTask.catergory === "technical_task") {
    dataTask.category = "Technical Task";
  } else {
    dataTask.category = "User Story";
  }
  return dataTask;
}

/**
 * This function retrieves the tasks from the server and converts them from a string to a JSON.
 *
 */
async function getTasks() {
  const url = "http://localhost:8000/board/";
  const token = currentUser.token;

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Error occured when getting users.");
      }
      return response.json();
    })
    .then((json) => {
      dataTasks = adaptDataStrings(json);
    })
    .catch((error) => {
      console.error("Getting users failed:", error.message);
    });
}

function adaptDataStrings(dataTasks) {
  dataTasks.forEach((task) => {
    if (task.position === "todo") {
      task.position = "Todo";
    } else if (task.position === "in_progress") {
      task.position = "InProgress";
    } else if (task.position === "await_feedback") {
      task.position = "AwaitFeedback";
    } else {
      task.position = "Done";
    }
    if (task.catergory === "technical_task") {
      task.category = "Technical Task";
    } else {
      task.category = "User Story";
    }
  });
  return dataTasks;
}

/**
 * This function retrieves the Users from the server and converts them from a string to a JSON.
 *
 */
async function getUsers() {
  const url = "http://localhost:8000/addMember/";
  const token = currentUser.token;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Error occured when getting users.");
      }
      return response.json();
    })
    .then((json) => {
      users = json;
    })
    .catch((error) => {
      console.error("Getting users failed:", error.message);
    });
}

/**
 * This function retrieves the current Users from the server.
 *
 */
function getCurrentUser() {
  let data = localStorage.getItem("currentUser");
  if (data) {
    let dataAsJson = JSON.parse(data);
    currentUser = dataAsJson;
  } else {
    window.location.href = "/login.html";
    return;
  }
}

/**
 * This function retrieves the Contacts from the server and converts them from a string to a JSON.
 *
 */
async function getTeamMembers() {
  const url = "http://localhost:8000/team/";
  const token = currentUser.token;

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Could not get team.");
      } else {
        contacts = await response.json();
      }
    })
    .catch((error) => {
      console.error("Get team failed:", error.message);
      return false;
    });
}

/**
 * This function is used to including template HTML to other Pages.
 *
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
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
  document.getElementById("subMenu").classList.remove("d-none");
}

/**
 * This function close the Menu.
 *
 */
function closeSubMenu() {
  document.getElementById("subMenu").classList.add("d-none");
}

/**
 * This function set the value of an variable, which Site is current Displayd. Its needed to Highlight the Page Button in the Menu.
 * @param {string} id - This is the id of the current Page
 */
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
    document.getElementById(sideMenuLinks[idOfCurrentPage]).classList.add("current");
  }
}

/**
 * This Function reset all Highlights on Menu
 *
 */
function resetHighlight() {
  sideMenuLinks.forEach((link) => {
    document.getElementById(link).classList.remove("current");
  });
}

/**
 * This function returns the initials of the user.
 * @param {string} user - This parameter refers to the array contacts in arraycontacts.js and should look like this: contacts[0]
 * @returns
 */
function getUserInitials() {
  const firstnameInitial = currentUser.name.charAt(0).toUpperCase();
  return firstnameInitial;
}

/**
 * This is an onclick-function on some back-arrows. This function let the user get back to last Page.
 *
 */
function goBackToLastPage() {
  window.history.back();
}

/**
 * This function iterates to an array and search for an empty id to return.
 * @param {string} array - this is array to search.
 * @returns - give the empty id back.
 */
function findFreeId(array) {
  const sortedArray = array.slice().sort((a, b) => a.id - b.id);
  let previousId = 0;
  for (let element of sortedArray) {
    if (element.id != previousId + 1) {
      return previousId + 1;
    }
    previousId = element.id;
  }
  return previousId + 1;
}

/**
 * This function compares the entered parameters with the values ​​in the array in order to return the index if there is a match.
 * @param {string} array - This is the array to find the index
 * @param {string} key - This is the key in which the values ​​are located.
 * @param {string} x - This is the value to be compared.
 * @returns - Gives the Index of the Element back.
 */
function getIndexOf(array, key, x) {
  for (let i = 0; i < array.length; i++) {
    const object = array[i];
    const objKey = array[i][key];
    if (x == objKey) {
      return i;
    }
  }
}

/**
 * This function is needed, to create the User initials on the header.
 *
 */
function createHeaderInitials() {
  let userInitials = document.getElementById("userInitials");
  let nameParts = currentUser.name.split(" ");
  let lastname = nameParts.pop() || "";
  let firstname = nameParts.join(" ") || "";

  let firstInitial = firstname.charAt(0).toUpperCase();
  let lastInitial = lastname.charAt(0).toUpperCase();

  userInitials.innerText = `${firstInitial}${lastInitial}`;
}

/**
 * This function log the user out.
 *
 */
async function logOut() {
  const url = "http://localhost:8000/logout/";
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("currentUser");
        window.location.href = "/login.html";
      } else {
        // Handle error
        console.error("Logout failed");
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

/**
 * This function push the actually User to the Contact-Array, that the current User can see his own Contact and can assignt to Tasks.
 *
 */
async function actuallyUserToContacts() {
  let i = getIndexOf(users, "id", currentUser);
  let user = users[i];
  let nameParts = users[i].name.split(" ");
  let lastname = nameParts.pop() || "";
  let firstname = nameParts.join(" ") || "";
  userContactId = findFreeId(contacts);
  let userArray = {
    id: userContactId,
    icon: user.icon,
    firstname: firstname,
    lastname: lastname + " (YOU)",
    email: user.email,
    "phone-number": "",
    user: true,
  };
  contacts.push(userArray);
  await setContacts();
}

/**
 * This function check that everyone is logged in. Is only needed to show privacy policies and legal notice on login an register whitout menus.
 *
 */
function checkLoginStatus() {
  if (templatesLoaded) {
    let menuBarMainContainer = document.getElementById("menuBarMainContainer");
    let menuContainer = document.getElementById("menuContainer");
    let headerMenu = document.getElementById("headerMenu");
    if (currentUser == -1) {
      headerMenu.classList.add("d-none");
      if (window.innerWidth <= 970) {
        let mainContainer = document.getElementById("mainContainer");
        mainContainer.style.height = "calc(100vh - 206px)";
        menuBarMainContainer.classList.add("d-none");
      } else if (window.innerWidth > 970) {
        menuContainer.classList.add("d-none");
      }
    }
  } else {
    setTimeout(() => {
      checkLoginStatus();
    }, 200);
  }
}

/**
 * This function delets the actually User from Contacts-Array. It called when User logged out.
 *
 */
function deleteActuallyUserfromContact() {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.user) {
      contacts.splice(i, 1);
      setContacts();
    }
  }
}

/**
 * This function is used to delete Contacts from tasks when the contact is deleted.
 * @param {string} indexOfContact = the parameter is needed to find the right contact to delete.
 */
function deleteAssignedTasks(indexOfContact) {
  let idToDelete = findIdOfContact(indexOfContact);
  for (let i = 0; i < dataTasks.length; i++) {
    const assignedToIndex = dataTasks[i]["assignedTo"].indexOf(idToDelete);
    if (assignedToIndex !== -1) {
      dataTasks[i]["assignedTo"].splice(assignedToIndex, 1);
      console.log(`Deleted assignment of task ${dataTasks[i].taskId} for contact with id: ${idToDelete}`);
    }
  }
  setTasks();
}

/**
 * This function is needed to find the right index in Array whit id of contact.
 * @param {string} indexOfContact = this is the index of the contact in array.
 * @returns
 */
function findIdOfContact(indexOfContact) {
  if (indexOfContact >= 0 && indexOfContact < contacts.length) {
    const idToDelete = contacts[indexOfContact].id;
    return idToDelete;
  }
}

/**
 * this function delete the user-account.
 * @param {string} user = this is the user object from contacts-array, that was deletet.
 */
function deleteUser(user) {
  if (user.email !== "guest@mail.guest") {
    let i = getIndexOf(users, "email", user.email);
    users.splice(i, 1);
    setUsers();
  }
}

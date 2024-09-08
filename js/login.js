function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let errorMessage = document.getElementById("error-message");
  let errorMessageEmail = document.getElementById("error-message-email");
  let errorMessagePassword = document.getElementById("error-message-password");

  const user = {
    email: email,
    password: password,
  };

  if (email.length <= 3) {
    errorMessageEmail.innerHTML = "Please enter valid email address.";
    errorMessage.style.gap = "5px";
  } else {
    if (password.length <= 3) {
      errorMessageEmail.innerHTML = "Please enter password.";
      errorMessage.style.gap = "5px";
    } else {
      loginUserBackend(user)
        .then((loginSuccess) => {
          if (loginSuccess) {
            window.location.href = "summary.html";
          } else {
            errorMessagePassword.innerHTML = "No user with these credentials.";
            errorMessage.style.gap = "5px";
          }
        })
        .catch((error) => {
          console.error("Unexpected error during login:", error);
          errorMessagePassword.innerHTML = "Login failed.";
          errorMessage.style.gap = "5px";
        });
    }
  }
}

async function loginUserBackend(userData) {
  const url = "http://localhost:8000/login/";

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "An error occurred during login.");
      }
      return response.json();
    })
    .then((json) => {
      console.log("Login successful:", json);
      setCurrentUserLocalStorage(json);
      return true;
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
      return false;
    });
}

function setCurrentUserLocalStorage(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

/**
 * This function initializes the application by fetching users, the current user, and displaying the start image.
 * Also, shows the login/signup elements after a delay.
 */
async function init() {
  showLogIn();
}

/**
 * This function shows the login and signup elements after a delay.
 */
function showLogIn() {
  setTimeout(() => {
    document.getElementById("sign-up").classList.remove("d-none");
    document.getElementById("log-in").classList.remove("d-none");
    document.getElementById("footer").classList.remove("d-none");
    window.location.href = "login.html";
  }, 1000);
}

/**
 * This function redirects the user to the signup page.
 */
function signUp() {
  window.location.href = "register.html";
}

/**
 * This function logs in the guest user and redirects to the summary page.
 */
async function guestLogIn() {
  await setCurrentUser(1);
  window.location.href = "summary.html";
}

/**
 * This function checks if the provided email matches the email of the user at the given index.
 *
 * @param {number} i - The index of the user in the users array.
 * @param {string} email - The email to compare.
 * @returns {boolean} - True if the emails match, false otherwise.
 */
function checkUser(i, email) {
  return i !== -1 && users[i].email == email;
}

/**
 * This function finds the index of the user with the given email in the users array.
 *
 * @param {string} email - The email to search for.
 * @returns {number} - The index of the user in the users array.
 */
function getIndexOfUser(email) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (email == user.email) {
      return i;
    }
  }
  return -1;
}

/**
 * This function checks if the provided password matches the password of the user at the given index.
 *
 * @param {number} i - The index of the user in the users array.
 * @param {string} password - The password to compare.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
function checkPasswort(i, password) {
  return users[i].password == password;
}

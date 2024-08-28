/**
 * This function redirects the user to the login page.
 */
function backToLogIn() {
  window.location.href = "login.html";
}

/**
 * This function registers a new user by collecting user input, validating the password match,
 * and adding the user to the users array.
 */
function register() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirm_password = document.getElementById("confirm-password");
  let errorContainer = document.getElementById("error-container");

  if (password.value !== confirm_password.value) {
    errorContainer.innerHTML = "The passwords do not match. Please check your input.";
    return;
  } else {
    const user = {
      icon: getRandomColor(),
      username: name.value,
      email: email.value,
      password: password.value,
    };

    registerNewUser(user).then((registerSuccess) => {
      if (registerSuccess) {
        registrationDisplayMessageSuccess();
        redirectToLogin();
      } else {
        registrationDisplayMessageFailed();
      }
    }).catch((error) => {
      console.error("Unexpected error during registration:", error);
      registrationDisplayMessageFailed();
    });
  }
}

async function registerNewUser(userData) {
  const url = "http://localhost:8000/register/";
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
        throw new Error(json.error || "An error occurred during registration.");
      }
      return response.json();
    })
    .then((json) => {
      console.log("Registration successful:", json);
      return true;
    })
    .catch((error) => {
      console.error("Registration failed:", error.message);
      return false;
    });
}


function registrationDisplayMessageSuccess() {
  let errorContainer = document.getElementById("error-message");
  let signUpMessage = document.getElementById("sign-up-message");
  let bgMessage = document.getElementById("bg-message");

  errorContainer.innerHTML = "";
  bgMessage.classList.remove("d-none");
  signUpMessage.classList.remove("d-none");
  setTimeout(() => {
    signUpMessage.style.transition = "transform 1000ms ease, top 1000ms ease";
    signUpMessage.style.top = "40%";
    signUpMessage.style.zIndex = "5";
  }, 500);
}

function redirectToLogin() {
  setTimeout(function () {
    window.location.href = "login.html";
  }, 2000);
}

function registrationDisplayMessageFailed() {
  let errorContainer = document.getElementById("error-message");
  errorContainer.innerHTML = "This user already exists.";
}

/**
 * This function generates and returns a random color from a predefined set of colors.
 *
 * @returns {string} - A randomly selected color.
 */
function getRandomColor() {
  let colors = [
    "#FF7A00",
    "#FF5EB3",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B",
    "#9b1212",
    "#7a80e8",
    "#046657",
    "#869b4c",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

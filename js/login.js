/**
 * This function initializes the application by fetching users, the current user, and displaying the start image.
 * Also, shows the login/signup elements after a delay.
 */
async function init() {
    await getUsers();
    await getCurrentUser();
    await getContacts();
    startImage();
    showLogIn();
}


/**
 * This function initializes the login process by fetching users and the current user.
 */
async function initLogin() {
    await getUsers();
    await getCurrentUser();
    await getContacts();
}


/**
 * This function animates the start image by applying a transformation and changing its position.
 */
function startImage() {
    let startImage = document.getElementById("start-image");

    if (window.innerWidth > 970) {
        setTimeout(() => {
            startImage.style.transition = "transform 1000ms ease, top 1000ms ease";
            startImage.style.transform = "translate(-50%, -40%) scale(0.4)";
            startImage.style.top = "5%";
            startImage.style.left = "10%";
            startImage.style.zIndex = "5";
        }, 1000);
    } else {
        setTimeout(() => {
            startImage.style.transition = "transform 1000ms ease, top 1000ms ease";
            startImage.style.transform = "translate(-45%, -48%) scale(0.2)";
            startImage.style.top = "5%";
            startImage.style.left = "10%";
            startImage.style.zIndex = "5";
        }, 1000);
    }
}


/**
 * This function shows the login and signup elements after a delay.
 */
function showLogIn() {
    setTimeout(() => {
        document.getElementById('sign-up').classList.remove('d-none');
        document.getElementById('log-in').classList.remove('d-none');
        document.getElementById('footer').classList.remove('d-none');
    }, 1000);
}


/**
 * This function redirects the user to the signup page.
 */
function signUp() {
    window.location.href = 'register.html';
}


/**
 * This function logs in the user by checking the provided email and password.
 * Redirects to the summary page if the login is successful.
 */
async function logIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let i = getIndexOfUser(email);
    if (email.length <= 3) {
        alert('Bitte Email eingeben');
    } else {
        if (password.length <= 3) {
            alert('Bitte Passwort eingeben');
        } else {
            if (checkUser(i, email)) {
                if (checkPasswort(i, password)) {
                    currentUser = users[i].id;
                    await setCurrentUser(users[i].id);
                    await actuallyUserToContacts();
                    window.location.href = 'summary.html';
                } else {
                    alert('Passwort falsch');
                }
            } else {
                alert('Email falsch');
            }
        }
    }
}


/**
 * This function logs in the guest user and redirects to the summary page.
 */
async function guestLogIn() {
    await setCurrentUser(1);
    window.location.href = 'summary.html';
}


/**
 * This function checks if the provided email matches the email of the user at the given index.
 * 
 * @param {number} i - The index of the user in the users array.
 * @param {string} email - The email to compare.
 * @returns {boolean} - True if the emails match, false otherwise.
 */
function checkUser(i, email) {
    return users[i].email == email;
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
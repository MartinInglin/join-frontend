async function init() {
    await getUsers();
    await getCurrentUser();
    startImage();
    showLogIn();
}

async function initLogin() {
    await getUsers();
    await getCurrentUser();
}

function startImage() {
    let startImage = document.getElementById("start-image");

    setTimeout(() => {
        startImage.style.transition = "transform 1000ms ease, top 1000ms ease";
        startImage.style.transform = "translate(-50%, -40%) scale(0.4)";
        startImage.style.top = "5%";
        startImage.style.left = "10%";
        startImage.style.zIndex = "5";
    }, 1000);
}

function showLogIn() {
    setTimeout(() => {
        document.getElementById('sign-up').classList.remove('d-none');
        document.getElementById('log-in').classList.remove('d-none');
        document.getElementById('footer').classList.remove('d-none');
    }, 1000);
}

function signUp() {
    window.location.href = 'register.html';
}

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
                    await setCurrentUser(users[i].id);
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

async function guestLogIn() {
    // debugger
    await setCurrentUser(1);
    window.location.href = 'summary.html';
}

function checkUser(i, email) {
    return users[i].email == email;
}

function getIndexOfUser(email) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (email == user.email) {
            return i;
        }
    }
}

function checkPasswort(i, password) {
    return users[i].password == password;
}
function backToLogIn() {
    window.location.href = 'login.html';
}

function register() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm-password');
    let errorContainer = document.getElementById('error-message');
    let signUpMessage = document.getElementById('sign-up-message');
    let bgMessage = document.getElementById('bg-message');

    if (password.value !== confirm_password.value) {
        errorContainer.innerHTML = "The passwords do not match. Please check your input.";
        return;
    } else {
        errorContainer.innerHTML = "";
        bgMessage.classList.remove('d-none')
        signUpMessage.classList.remove('d-none');
        setTimeout(() => {
            signUpMessage.style.transition = "transform 1000ms ease, top 1000ms ease";
            signUpMessage.style.top = "40%";
            signUpMessage.style.zIndex = "5";
        }, 500);
        users.push({
            id: findFreeId(users),
            'name': name.value,
            'email': email.value,
            'password': password.value
        });
        setUsers();
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 2000);
    }
}
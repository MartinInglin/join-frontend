function init() {
    startImage();
    showLogIn();
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
    }, 1000);
}
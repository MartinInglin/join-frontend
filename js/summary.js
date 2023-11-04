function init() {
  getTimeOfDay();
}

function getTimeOfDay() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let timeOfDay;

  if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }
  createGreeting(timeOfDay);
}

function createGreeting(timeOfDay) {
  let greetingContainer = document.getElementById("greetingContainer");
  greetingContainer.innerHTML = "";
  /*html*/
  greetingContainer.innerHTML = `
    <p class="welcome-text">Good ${timeOfDay},</p>
    <p class="user-name">Sofia Müller</p>
    `;
}

function changeCirleDark() {
  const circleImage = document.getElementById("checkedCircle");
  const newImageSrc = "./img/checked_circle_dark.svg";

  circleImage.src = newImageSrc;
}

function changeCirleFair() {
  const circleImage = document.getElementById("checkedCircle");
  const newImageSrc = "./img/checked_circle.svg";

  circleImage.src = newImageSrc;
}

function changePencilDark() {
  const circleImage = document.getElementById("pencilCircle");
  const newImageSrc = "./img/pencil_circle_dark.svg";

  circleImage.src = newImageSrc;
}

function changePencilFair() {
  const circleImage = document.getElementById("pencilCircle");
  const newImageSrc = "./img/pencil_circle.svg";

  circleImage.src = newImageSrc;
}

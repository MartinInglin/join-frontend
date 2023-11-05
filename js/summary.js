/**
 * This function contains all the functionts that should be called on load of the body.
 */
function init() {
  getTimeOfDay();
}

/**
 * This function finds out, what daytime it is and returns the corresponding word.
 */
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

/**
 * 
 * This function creates the greeting on the right side of the summary page.
 * 
 * @param {string} timeOfDay morning, afternoon or evening, depending on the daytime.
 */
function createGreeting(timeOfDay) {
  let greetingContainer = document.getElementById("greetingContainer");
  greetingContainer.innerHTML = "";
  /*html*/
  greetingContainer.innerHTML = `
    <p class="welcome-text">Good ${timeOfDay},</p>
    <p class="user-name">Sofia Müller</p>
    `;
}

/**
 * 
 * This function changes the icon from dark to light on hover.
 * 
 * @param {string} idContainer The ID of the container that should change the image.
 * @param {string} requiredImage The actual path where the image is stored.
 */
function changeIconHover(idContainer, requiredImage) {
  const circleImage = document.getElementById(idContainer);
  circleImage.src = requiredImage;
}
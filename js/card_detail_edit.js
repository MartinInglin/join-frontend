const colorsPriority = [
  {
    priority: "urgent",
    color: "#FF3D00",
  },
  {
    priority: "medium",
    color: "#FFA800",
  },
  {
    priority: "low",
    color: "#7AE229",
  },
];
const priorityImages = [
  {
    lowWhite: "img/add_task/low_white.png",
    lowColor: "img/add_task/low.png",
    mediumWhite: "img/add_task/medium_white.png",
    mediumColor: "img/add_task/medium.png",
    urgentWhite: "img/add_task/urgent_white.png",
    urgentColor: "img/add_task/urgent.png",
  },
];
const priorityButtonsIDs = ["buttonUrgent", "buttonMedium", "buttonLow"];

function showCardEdit() {
  let cardDetailContainer = document.getElementById("cardDetailContainer");
  cardDetailContainer.innerHTML = "";
  /*html*/
  cardDetailContainer.innerHTML = `

    <div class="card-detail left-50-percent" onclick="stopPropagation(event)">
        <div class="card-detail-header justify-right">
          <div class="close-btn pointer"><img src="./img/board_card_detail/close.svg" alt="" onclick="closeCardDetailButton()" /></div>
        </div>
        <div class="card-edit-scroll">
          <form>
            <div class="card-edit-section">
              <div class="subtitle">Title</div>
              <input type="text" name="" id="cardEditTitle" class="font-size-20 card-edit-section-input" required/>
            </div>
          </form>
          <div class="card-edit-section">
            <div class="subtitle">Description</div>
            <textarea type="text" name="" id="cardEditDescription" class="font-size-20 card-edit-section-input card-edit-task"></textarea>
          </div>
          <div class="card-edit-section">
            <div class="subtitle">Due date</div>
            <input type="date" name="" id="cardEditDate" class="font-size-19 card-edit-section-input" />
          </div>

          <div class="card-edit-section">
            <div class="subtitle">Priority</div>
            <div class="card-edit-priority" id="cardEditPriorities">
              <button class="card-edit-priority-btn" id="buttonUrgent" onclick="changePriority('urgent', 'buttonUrgent')">Urgent<img src="../img/add_task/urgent.png"></button>
              <button class="card-edit-priority-btn" id="buttonMedium" onclick="changePriority('medium', 'buttonMedium')">Medium<img src="../img/add_task/medium_white.png"></button>
              <button class="card-edit-priority-btn" id="buttonLow" onclick="changePriority('low', 'buttonLow')">Low<img src="../img/add_task/low.png"></button>
            </div>
          </div>

          <div class="card-edit-section">
            <div class="subtitle">Assigned to</div>
            <div class="font-size-20 card-edit-section-input">
              <div>Select contacts to assign</div>
              <img src="./img/board_card_detail/arrow_drop_down.svg" alt="">
            </div>
            <div class="card-edit-members">
              <div class="member-button align-center justify-center color-blue">
                <span>EM</span>
              </div>
              <div class="member-button align-center justify-center color-green">
                <span>AU</span>
              </div>
            </div>
          </div>
          <div class="card-edit-section">
            <div class="subtitle">Subtasks</div>
            <div class="card-edit-section-input">
              <input type="text" name="" id="" class="font-size-20 add-subtask" placeholder="Add new subtask"/>
              <img src="./img/board_card_detail/add_subtask.svg" alt="">
            </div>
            <ul class="subtasks-list">
              <li class="subtask-item">
                <div>Text</div>
              </li>
              <li class="subtask-item">Tea</li>
              <li class="subtask-item">Milk</li>
            </ul> 
          </div>
          </div>
        </div>
      </div>
    `;
  setTitle();
  setDescription();
  setDate();
  findIdPriorityContainer();
}

function setTitle() {
  const titleInput = document.getElementById('cardEditTitle');
  titleInput.value = selectedTask['title'];
}

function setDescription() {
  const titleInput = document.getElementById('cardEditDescription');
  titleInput.value = selectedTask['task'];
}

function setDate() {
  const titleInput = document.getElementById('cardEditDate');
  titleInput.value = selectedTask['date'];
};

function findIdPriorityContainer() {
  const priorities = ["urgent", "medium", "low"];
  const priority = selectedTask["urgency"];

  if (priority !== null && priorities.includes(priority)) {
    const idOfContainer = priorities.find((priorityItem) => priorityItem === priority);
    setPriorityStyle(idOfContainerNormalized(idOfContainer));
  } else {
    return;
  }
}

function idOfContainerNormalized(idOfContainer) {
  return "button" + idOfContainer.charAt(0).toUpperCase() + idOfContainer.slice(1);
}

function changePriority(priority, idOfContainer) {
  if (selectedTask["urgency"] === priority) {
    selectedTask["urgency"] = null;
  } else {
    selectedTask["urgency"] = priority;
  }
  setPriorityStyle(idOfContainer);
}

function setPriorityStyle(idOfContainer) {
  for (let i = 0; i < priorityButtonsIDs.length; i++) {
    const containerID = priorityButtonsIDs[i];
    const container = document.getElementById(containerID);
    setBackgroundcolorWhite(container);
    setColorBlack(containerID);
    setImageColor(containerID);
  }

  const container = document.getElementById(idOfContainer);
  const priorityColor = colorsPriority.find((item) => item.priority === selectedTask["urgency"]);

  setBackgroundcolorPriority(container, priorityColor);
  setColorWhite(idOfContainer);
  setImageWhite(idOfContainer);
}

function setBackgroundcolorWhite(container) {
  container.style.backgroundColor = "white";
}

function setBackgroundcolorPriority(container, priorityColor) {
  container.style.backgroundColor = priorityColor.color;
}

function setColorBlack(idOfContainer) {
  document.getElementById(idOfContainer).classList.remove("card-edit-priority-color-white");
}

function setColorWhite(idOfContainer) {
  document.getElementById(idOfContainer).classList.add("card-edit-priority-color-white");
}

function setImageWhite(idOfContainer) {
  const priority = idOfContainer.replace("button", "").toLowerCase();
  const imgElement = document.querySelector(`#${idOfContainer} img`);
  if (imgElement) {
    imgElement.src = `../img/add_task/${priority}_white.png`;
  }
}

function setImageColor(idOfContainer) {
  const priority = idOfContainer.replace("button", "").toLowerCase();
  const imgElement = document.querySelector(`#${idOfContainer} img`);
  if (imgElement) {
    imgElement.src = `../img/add_task/${priority}.png`;
  }
}

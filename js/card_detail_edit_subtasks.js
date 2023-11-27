function changeIconConfirm() {
  const confirmImage = document.getElementById("addOrConfirm");
  confirmImage.src = "img/board_card_detail/subtasks_confirm.svg";
}

function changIconPlus() {
  const confirmImage = document.getElementById("addOrConfirm");
  confirmImage.src = "./img/board_card_detail/add_subtask.svg";
}

function createSubtasksCardEdit() {
  let subtasksContainer = document.getElementById("subtasksList");
  subtasksContainer.innerHTML = "";

  for (let i = 0; i < selectedTask["subtasks"].length; i++) {
    const subtaskText = selectedTask["subtasks"][i]["content"];
    subtasksContainer.innerHTML += renderSubtasksCardEditHTML(i, subtaskText);
  }
}

function editSubtaskCardEdit(i, subtaskText) {
  let subtaskItemContainer = document.getElementById(`subtasksList`);
  subtaskItemContainer.innerHTML = "";
  subtaskItemContainer.innerHTML = renderSubtasksEditHTML(i, subtaskText);
}

function deleteSubtaskCardEdit(i) {
  const subtasks = selectedTask["subtasks"];
  subtasks.splice(i, 1);
  createSubtasksCardEdit();
}

function saveSubtaskCardEdit(i) {
  const subtaskNewValue = document.getElementById(`subtaskValue${i}`).value;
  selectedTask["subtasks"][i]["content"] = subtaskNewValue;
  createSubtasksCardEdit();
}

function addSubtaskCardEdit() {
  const subtaskValue = document.getElementById("addNewSubtask").value;

  const newSubtask = {
    content: subtaskValue,
    checked: false,
  };
  selectedTask.subtasks.unshift(newSubtask);
  createSubtasksCardEdit();
  emptyInputAddSubtask();
}

function emptyInputAddSubtask() {
  document.getElementById("addNewSubtask").value = "";
}

function newTaskOnEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubtaskCardEdit();
  }
}

function saveTaskOnEnter(event, i, subtaskText) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveSubtaskCardEdit(i, subtaskText)
  }
}
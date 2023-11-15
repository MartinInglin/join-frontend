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
          <div class="card-edit-section">
            <div class="subtitle">Title</div>
            <input type="text" name="" id="" class="font-size-20 card-edit-section-input"/>
          </div>
          <div class="card-edit-section">
            <div class="subtitle">Description</div>
            <input type="text" name="" id="" class="font-size-20 card-edit-section-input" />
          </div>
          <div class="card-edit-section">
            <div class="subtitle">Due date</div>
            <input type="date" name="" id="" class="font-size-19 card-edit-section-input" />
          </div>
          <div class="card-edit-section">
            <div class="subtitle">Priority</div>
            <div class="card-edit-priority">
              <div class="card-edit-priority-btn">
                <div>Urgent</div>
                <img src="./img/board/priority_urgent.svg" alt="" />
              </div>
              <div class="card-edit-priority-btn">
                <div>Medium</div>
                <img src="./img/board/priority_medium.svg" alt="" />
              </div>
              <div class="card-edit-priority-btn">
                <div>Low</div>
                <img src="./img/board/priority_low.svg" alt="" />
              </div>
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
              <li class="subtask-item">Coffee</li>
              <li class="subtask-item">Tea</li>
              <li class="subtask-item">Milk</li>
            </ul> 
          </div>
          </div>
        </div>
      </div>
    `;
}
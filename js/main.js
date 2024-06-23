update();

function showAlert(color, message) {
  let warning = document.querySelector(".notification__info");
  warning.style.color = color;
  warning.textContent = message;
  warning.style.opacity = "1";
  warning.style.transform = "translateY(120%)";
  setTimeout(() => {
    warning.style.transform = "translateY(0)";
    warning.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    warning.textContent = "";
  }, 3000);
}

function update() {
  let list = document.querySelector(".notification__list");
  if (!localStorage.length) {
    list.hidden = true;
  } else {
    list.hidden = false;
  }
  let items = document.querySelector(".list__items");
  items.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let time = localStorage.key(i);
    let message = localStorage.getItem(time);
    items.innerHTML += `
    <div class="list__item">${time} - ${message}
    <button data-time="${time}" class="form__btn delete">X</button>
    </div>
    `;
  }
  document.querySelector(".form__date").value = "";
  document.querySelector(".form__textarea").value = "";
  if (document.querySelector(".audioAlert")) {
    document.querySelector(".audioAlert").remove();
  }
}

function addNote() {
  let time = document.querySelector(".form__date").value;

  let message = document.querySelector(".form__textarea").value;

  if (!time || !message) {
    showAlert("red", "All fields are required");
    return;
  }

  showAlert("green", "Successfully added");

  localStorage.setItem(time, message);
  update();
}
function clearList() {
  if (localStorage.length && confirm("Are you sure?")) {
    localStorage.clear();
    update();
  } else if (!localStorage.length) {
    alert("Nothing to clear");
  }
}

document.querySelector(".list__btn").addEventListener("click", clearList);
document.querySelector(".form__btn").addEventListener("click", addNote);
document
  .querySelector(".notification__list")
  .addEventListener("click", function (e) {
    if (!e.target.dataset.time) {
      return;
    }
    localStorage.removeItem(e.target.dataset.time);
    update();
  });

setInterval(() => {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  let currentMinute = currentDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  let currentTime = `${currentHour}:${currentMinute}`;
  for (let key of Object.keys(localStorage)) {
    if (key == currentTime) {
      document
        .querySelector(".delete")
        .closest(".list__item")
        .classList.add("list__item--alert");
      if (!document.querySelector(".audioAlert")) {
        document
          .querySelector("body")
          .insertAdjacentHTML(
            "afterbegin",
            '<audio loop class="audioAlert"><source src="../audio/alert.mp3" type="audio/mpeg"></audio>'
          );
        document.querySelector(".audioAlert").play();
      }
      showAlert("red", "Time's up!");
    }
  }
}, 1000);

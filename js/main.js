function addNote() {
  let time = document.querySelector(".form__date").value;

  let message = document.querySelector(".form__textarea").value;

  let warning = document.querySelector(".notification__info");

  if (!time || !message) {
    warning.textContent = "All fields are required";
    warning.style.opacity = "1";
    warning.style.transform = "translateY(120%)";
    setTimeout(() => {
      warning.style.transform = "translateY(0)";
      warning.style.opacity = "0";
    }, 2000);
    setTimeout(() => {
      warning.textContent = "";
    }, 3000);
    return;
  }

  localStorage.setItem("time", time);
  localStorage.setItem("message", message);
}
document.querySelector(".form__btn").addEventListener("click", addNote);

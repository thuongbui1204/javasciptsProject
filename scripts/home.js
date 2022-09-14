"use strict";
//4. Home Page
let currentUser;
getloginfromStorage();
if (!currentUser) {
  document.querySelector(`#btn-logout`).style.display = "none";
} else {
  document
    .querySelectorAll(`.btn-block`)
    .forEach((el) => (el.style.display = "none"));
  document.querySelector(
    `#login-modal`
  ).firstElementChild.textContent = `Welcome ${currentUser.firstName}`;
}
//5.Log out
document.querySelector(`#btn-logout`).addEventListener(`click`, function () {
  currentUser = "";
  localStorage.setItem("login", currentUser);
  document.querySelector(`#btn-logout`).style.display = "none";
  document
    .querySelectorAll(`.btn-block`)
    .forEach((el) => (el.style.display = "block"));
  document.querySelector(
    `#login-modal`
  ).firstElementChild.textContent = `Please Login or Register`;
});

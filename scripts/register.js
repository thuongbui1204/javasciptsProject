"use strict";
//2. Chức năng: Register
const firstName = document.querySelector(`#input-firstname`);
const lastName = document.querySelector(`#input-lastname`);
const userName = document.querySelector(`#input-username`);
const passWord = document.querySelector(`#input-password`);
const confirmPassword = document.querySelector(`#input-password-confirm`);
let userArr = [];
getFromStorage();
const moveButton = document.createElement("div");
moveButton.innerHTML = `<p>Succesfully register <a href='../index.html'>move to Home Page</a> or <a href='login.js'>login</a>.</p>`;
moveButton.style.opacity = "0";
document.querySelector(`#main`).appendChild(moveButton);
document.querySelector("#btn-submit").addEventListener("click", function () {
  // validate dữ liệu
  //Không có trường nào bị bỏ trống.
  const checkMissing = function () {
    if (
      !firstName.value ||
      !lastName.value ||
      !userName.value ||
      !passWord.value ||
      !confirmPassword.value
    ) {
      alert(
        `Missing information: ${!firstName.value ? `First Name, ` : ""}${
          !lastName.value ? `Last Name, ` : ""
        } ${!userName.value ? `User Name ,` : ""}${
          !passWord.value ? `Password , ` : ""
        }${!confirmPassword.value ? `Confirm Password ` : ""}`
      );
      return false;
    } else {
      return true;
    }
  };
  //Username không được trùng với Username của các người dùng trước đó.
  const checkUser = function () {
    if (userArr.length === 0) {
      return true;
      console.log(1);
    } else {
      let s = 0;
      for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].userName === userName.value) {
          alert(`This Username was be used, please choose the other`);
          s++;
          break;
        }
      }
      if (s === 0) {
        return true;
      } else return false;
    }
  };
  //Password và Confirm Password phải giống nhau.
  const checkPass1 = function () {
    if (passWord.value !== confirmPassword.value) {
      alert(`Password and Confirm Password must be the same.`);
      return false;
    } else return true;
  };
  //Password phải có nhiều hơn 8 ký tự

  const checkPass2 = function () {
    if (passWord.value.length <= 8) {
      alert(`Passworld must be more than 8 characters.`);
      return false;
    } else return true;
  };
  if (checkMissing() && checkUser() && checkPass1() && checkPass2()) {
    const user = new User(
      firstName.value,
      lastName.value,
      userName.value,
      passWord.value
    );
    userArr.push(user);
    saveToStorage();
    moveButton.style.opacity = "1";
  }
});

"use strict";
//3. Chức năng: Login
const userName = document.querySelector(`#input-username`);
const password = document.querySelector(`#input-password`);
let userArr = [];
getFromStorage();
const moveButton = document.createElement("p");
document.querySelector(`#btn-submit`).addEventListener("click", function () {
  if (userArr.length === 0) alert(`Please register`);
  let s = 0;
  for (let i = 0; i < userArr.length; i++) {
    if (userName.value === userArr[i].userName) {
      if (password.value === userArr[i].passWord) {
        moveButton.innerHTML = `Succesfully login! <a href='../index.html'>click here</a> to move to Home Page`;
        document.querySelector(`#main`).appendChild(moveButton);
        logintoStorage(i);
        break;
      } else alert(`Wrong password`);
      break;
    } else {
      s++;
    }
  }
  if (s === userArr.length) {
    alert`Wrong user`;
  }
});

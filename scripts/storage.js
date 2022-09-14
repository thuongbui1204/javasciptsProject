"use strict";
//2. Lưu dữ liệu homepage dưới LocalStorage
const getFromStorage = function () {
  if (!localStorage.getItem(`data`)) return;
  userArr = JSON.parse(localStorage.getItem(`data`));
};

const saveToStorage = function () {
  localStorage.setItem(`data`, JSON.stringify(userArr));
};
//3. Lưu trữ dữ liệu login ở LocalStorage
const logintoStorage = function (i) {
  localStorage.setItem("login", JSON.stringify(userArr[i]));
};
const getloginfromStorage = function () {
  if (!localStorage.getItem(`login`)) return;
  currentUser = JSON.parse(localStorage.getItem(`login`));
};
//8. a. Lưu dữ liệu todolist vào LocalStorage
const gettodolistfromStorage = function () {
  if (!localStorage.getItem(`todoList`)) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorage.getItem(`todoList`));
  }
};
const todolisttoStorage = function () {
  localStorage.setItem("todoList", JSON.stringify(todoArr));
};
//9. a. Lưu dữ liệu todolist vào LocalStorage
const getSetting = function () {
  if (!localStorage.getItem(`setting`)) {
    setting = { pageSize: 10, category: "business" };
  } else {
    setting = JSON.parse(localStorage.getItem(`setting`));
  }
};
const setSetting = function () {
  localStorage.setItem("setting", JSON.stringify(setting));
};

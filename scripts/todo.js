"use strict";
//8. Hiển thị Todo List

const todoList = document.querySelector("#todo-list");
const Task = function (task, owner, isDone) {
  this.task = task;
  this.owner = owner;
  this.isDone = isDone;
};

let userArr, currentUser, todoArr;
getFromStorage();
gettodolistfromStorage();
getloginfromStorage();
const inputTask = document.querySelector(`#input-task`);
let userTodoList = [];
const currentTask = function () {
  userTodoList = todoArr.filter((el) => el.owner === currentUser.userName);
};
function rendertodoList(userTodoList) {
  todoList.innerHTML = "";
  userTodoList.forEach((el, i) => {
    const html = `<li ${el.isDone ? `class="checked"` : ""}>${
      el.task
    }<span class="close">×</span></li>`;
    todoList.insertAdjacentHTML("beforeend", html);
  });
}
//b. Hiển thị các Task
if (!currentUser) {
} else {
  currentTask();
  rendertodoList(userTodoList);
}
document.querySelector(`#btn-add`).addEventListener("click", function () {
  const task = new Task(inputTask.value, currentUser.userName, false);
  todoArr.push(task);
  currentTask();
  rendertodoList(userTodoList);
  todolisttoStorage();
});
//c. Toggle Task

todoList.addEventListener("click", function (e) {
  if (!e.target.classList.contains("close")) {
    const doneCheck = e.target.closest("li");
    todoArr.forEach((el) => {
      if (
        `${el.task}×` === doneCheck.textContent &&
        el.owner === currentUser.userName
      ) {
        if (el.isDone) {
          el.isDone = false;
        } else {
          el.isDone = true;
        }
      }
      currentTask();
      rendertodoList(userTodoList);
    });
    todolisttoStorage();
  }
});
//d. Delete Task
todoList.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.classList.contains("close")) {
    const close = e.target.closest("span");
    let index = 0;
    console.log(todoArr);
    for (let i = 0; i < todoArr.length; i++) {
      index++;
      if (
        todoArr[i].owner === currentUser.userName &&
        `${todoArr[i].task}×` === close.closest(`li`).textContent
      ) {
        break;
      }
    }
    console.log(index);
    todoArr.splice(index - 1, 1);
    currentTask();
    rendertodoList(userTodoList);
    todolisttoStorage();
  }
});

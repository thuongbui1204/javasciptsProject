"use strict";
//9. Thay đổi thiết lập,
let setting;
const pageSize = document.querySelector(`#input-page-size`);
const category = document.querySelector(`#input-category`);
const btnSubmit = document.querySelector(`#btn-submit`);
getSetting();
btnSubmit.addEventListener("click", function () {
  if (!pageSize.value) {
    alert(`Missing information`); //validate nếu chưa nhập thông tin
  } else {
    setting.pageSize = pageSize.value;
  }
  if (!category.value) {
    alert(`Missing information`); //validate nếu chưa nhập thông tin
  } else {
    setting.category = category.value;
  }
  //setting.pageSize = !pageSize.value ? setting.pageSize : pageSize.value;
  //setting.category = !category.value ? setting.category : category.value;
  setSetting();
});

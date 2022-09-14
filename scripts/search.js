"use strict";
//10. (Nâng cao) Tìm kiếm bài viết theo từ khóa
let setting;
getSetting();
const getData = async function (key, i, pageSize) {
  try {
    const request = await fetch(
      `https://newsapi.org/v2/everything?q=${key}&page=${i}&pageSize=${pageSize}&apiKey=edc32e1e25da4f79a79b7a883cbb6ca2`
    );
    const datajson = await request.json();
    const articlelist = await datajson.articles;
    articlelist.forEach((el) => {
      news(el);
    });
    return datajson.totalResults;
  } catch {
    (err) => {
      console.log(err.message);
    };
  }
};

// Hiển thị các bài viết
const page = document.querySelector(`#page-num`);
const prevBtn = document.querySelector(`#btn-prev`);
const nextBtn = document.querySelector(`#btn-next`);
let pageNum = Number(page.textContent);
const inputSearch = document.querySelector(`#input-query`);
const searchBtn = document.querySelector(`#btn-submit`);

const news = function (res) {
  const html = `
  <div>
  <div class="row" style="border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem">
  <img src=${!res.urlToImage ? "#" : res.urlToImage} class="col-md-4"></img>
  <div class="col-md-8 card-body">
  <h6>${!res.title ? `` : res.title}</h6>
  <p>${!res.description ? "" : res.description}</p>
  <button type="button" class="btn btn-primary"><a href=${
    res.url
  } style="color:white">View</a></button>
  </div>
  </div>
  <div>
  <p></p>
  </div>
  </div>`;
  document
    .querySelector(`#news-container`)
    .insertAdjacentHTML("afterbegin", html);
};

if (pageNum === 1) {
  prevBtn.style.opacity = "0.3";
}
nextBtn.style.opacity = "1";
searchBtn.addEventListener("click", function () {
  //validate nếu chưa nhập từ khóa
  if (!inputSearch.value) alert(`Please input keyword to search.`);
  getData(inputSearch.value, pageNum, setting.pageSize).then((res) => {
    if (Math.trunc(res / setting.pageSize) === 0) nextBtn.style.opacity = "0.3";
  });
});
//Chuyển trang cho các bài viết
nextBtn.addEventListener("click", function () {
  if (nextBtn.style.opacity === "1") {
    page.textContent = pageNum + 1;
    pageNum++;
    document.querySelector(`#news-container`).innerHTML = "";
    getData(inputSearch.value, pageNum, setting.pageSize).then((res) => {
      if (
        pageNum === Math.trunc(res / setting.pageSize) + 1 ||
        Math.trunc(res / setting.pageSize) === 0
      ) {
        nextBtn.style.opacity = "0.3";
      }
    });
    if (pageNum !== 1) {
      prevBtn.style.opacity = "1";
    }
  }
});
prevBtn.addEventListener("click", function () {
  if (page !== 1) {
    page.textContent = pageNum - 1;
    pageNum--;
    nextBtn.style.opacity = "1";
    if (pageNum === 1) {
      prevBtn.style.opacity = "0.3";
    }
  }
  document.querySelector(`#news-container`).innerHTML = "";
  getData(inputSearch.value, pageNum, setting.pageSize);
});

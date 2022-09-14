"use strict";
let setting;
getSetting();
const getData = async function (i, pageSize, category) {
  try {
    const request = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${i}&category=${category}&apiKey=edc32e1e25da4f79a79b7a883cbb6ca2`
    );
    const datajson = await request.json();
    console.log(datajson);
    const articlelist = await datajson.articles;
    console.log(articlelist);
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

//6. Hiển thị các bài viết
const page = document.querySelector(`#page-num`);
const prevBtn = document.querySelector(`#btn-prev`);
const nextBtn = document.querySelector(`#btn-next`);
let pageNum = Number(page.textContent);
console.log(getData(pageNum, setting.pageSize, setting.category));
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
//7. Chuyển trang cho các bài viết

if (pageNum === 1) {
  prevBtn.style.opacity = "0.3";
}
nextBtn.style.opacity = "1";
nextBtn.addEventListener("click", function () {
  if (nextBtn.style.opacity === "1") {
    page.textContent = pageNum + 1;
    pageNum++;
    document.querySelector(`#news-container`).innerHTML = "";
    getData(pageNum, setting.pageSize, setting.category).then((res) => {
      if (pageNum === Math.trunc(res / setting.pageSize) + 1) {
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
  getData(pageNum, setting.pageSize, setting.category);
});

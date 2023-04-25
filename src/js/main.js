import { createSpinner } from "./spinner.js";

function renderTopNews() {
    const articleSection = document.getElementById('topNewsList');

    createSpinner(articleSection);

    //데이터 가져오기
    fetch('./data/top.json')
        .then((res) => res.json())
        .then((data) => console.log(data))
};
function renderLatestNews() {
    const latestNewsList = document.querySelector('.latest-news-list');

    createSpinner(latestNewsList);

    //데이터 가져오기
    fetch('./data/latest.json')
        .then((res) => res.json())
        .then((data) => console.log(data))
};

document.addEventListener('DOMContentLoaded', () => { //데이터 조회 시에는 리소스에 접근 X
    renderTopNews();
    renderLatestNews();
})

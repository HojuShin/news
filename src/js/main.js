import { createSpinner } from "./spinner.js";

function renderTopNews(){
    const articleSection = document.getElementById('topNewsList');

    createSpinner(articleSection);
}; 
function renderLatestNews(){
    const latestNewsList = document.querySelector('.latest-news-list');

    createSpinner(latestNewsList); 
};

document.addEventListener('DOMContentLoaded', () => { //데이터 조회 시에는 리소스에 접근 X
    renderTopNews();
    renderLatestNews();
})

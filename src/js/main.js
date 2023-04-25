import { createSpinner } from "./spinner.js";

//topNews DOM 생성 
function createTopNewsElement(article) { 
    const { title, summary, link, thumbnailImage } = article; //top.json 데이터 넘겨 받음

    //a태그 생성 (기사영역 전체를 링크이동 동작으로)
    const anchor = document.createElement('a');
    anchor.setAttribute('href', link);
    anchor.innerHTML = `
    <article class="news">
      <div class="information">
        <h3 class="title">${title}</h3>
        <p class="description">${summary}</p>
      </div>
      <div class="thumbnail-area">
        <img src="${thumbnailImage}" alt="thumbnail" class="thumbnail" />
      </div>
    </article>`;
    
    return anchor ;
}

//topNews 로딩이미지 영역 설정(spinner 인자 전달), 데이터 요청, 데이터 전달(createTopNewsElement인자 전달)
function renderTopNews() {
    const articleSection = document.getElementById('topNewsList');

    createSpinner(articleSection);

    //로딩동작
    setTimeout(() => {
        //데이터 요청
        fetch('./data/top.json')
            .then((res) => res.json())
            .then((data) => {
                const { articles } = data;
                //createTopNewsElement함수 호출하여 데이터 할당 
                const articleList = articles.map((article) => createTopNewsElement(article));
            })
    }, 1500);

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

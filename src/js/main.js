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

//latestNews DOM 생성 
function createLatestNewsElement(article) {
    const { title, link } = article ;

    const listItem = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.setAttribute('href', link);
    anchor.textContent = title ;

    listItem.className = 'latest-news-item';
    listItem.append(anchor);

    return listItem;
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
                //articleList(a태그)는 spinner(로딩이미지) 밑에 생성됨 
                const articleList = articles.map((article) => createTopNewsElement(article));
                console.log('articleList', articleList);

                //articleList DOM 요소(a태그) 생성 완료후 로딩이미지 영역에 추가
                articleSection.append(...articleList);
                //articleSection(topNewsList) 밑으로 spinner, createTopNewsElement가 있음
            })
            .finally(() => {
                //조회한 데이터 DOM추가 작업 끝나면, 로딩 이미지 제거
                hideSpinner(articleSection);
            })
    }, 1000);
};

//latestNews  로딩이미지 영역 설정(spinner 인자 전달), 데이터 요청, 데이터 전달(createLatestNewsElement인자 전달)
function renderLatestNews() {
    const latestNewsList = document.querySelector('.latest-news-list');

    createSpinner(latestNewsList);

     setTimeout(() => {
        fetch('./data/latest.json')
            .then((res) => res.json())
            .then((data) => {
                const { articles } = data;
                //createLatestNewsElement함수 호출하여 데이터 할당 
                const articleList = articles.map((article) => createLatestNewsElement(article));

                latestNewsList.append(...articleList);
            })
            .finally(() => {
                //조회한 데이터 DOM추가 작업 끝나면, 로딩 이미지 제거
                hideSpinner(latestNewsList);
            })
    }, 1000);
};

//로딩 이미지 제거
function hideSpinner(parent) {
    const spinnerArea = parent.querySelector('.spinner-area');
    spinnerArea.style.display = 'none'; 
}

document.addEventListener('DOMContentLoaded', () => { //데이터 조회 시에는 리소스에 접근 X
    renderTopNews();
    renderLatestNews();
})

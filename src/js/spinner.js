export function createSpinner(parent) {
    //로딩 이미지를 추가할 DOM 요소(spinner-area) 가져오기
    const spinnerAreaEl = parent.querySelector('.spinner-area');
    //img 요소 생성
    const imageEl = document.createElement('img');
    //로딩 이미지로 사용할 gif 이미지 설정
    imageEl.alt = 'spinner';
    imageEl.src = './src/image/spinner.gif';

    //DOM 요소에 이미지 추가 
    spinnerAreaEl.append(imageEl);
}
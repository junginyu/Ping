// layout.js

// 창 크기 조정 함수
function adjustLayout() {
    const header = document.querySelector(".header");
    const main = document.querySelector(".main");

    if (header && main) {
        const headerHeight = header.offsetHeight;
        const mainHeight = window.innerHeight - headerHeight;
        main.style.height = `${mainHeight}px`;
    }
}

// 창 크기 조정 이벤트 핸들러
window.addEventListener("resize", adjustLayout);
window.addEventListener("load", adjustLayout);

// 창 최소 크기 설정
window.addEventListener("resize", function () {
    if (window.innerWidth < 800) {
        document.body.style.width = "800px";
    } else {
        document.body.style.width = "100%";
    }

    if (window.innerHeight < 600) {
        document.body.style.height = "600px";
    } else {
        document.body.style.height = "100%";
    }
});

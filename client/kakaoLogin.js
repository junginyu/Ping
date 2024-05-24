// kakaoLogin.js

document.addEventListener("DOMContentLoaded", function () {
    if (!Kakao.isInitialized()) {
        // 카카오 SDK 초기화
        Kakao.init(KAKAO_JAVASCRIPT_KEY);
        console.log(Kakao.isInitialized()); // SDK 초기화 여부 확인 (true)
    }

    // 페이지 로드 시 로그인 상태 확인
    updateUI();
});

// 로그인 상태에 따라 UI 업데이트
function updateUI() {
    const authButton = document.getElementById("auth-button");
    const logoutButton = document.getElementById("logout-button");

    if (Kakao.Auth.getAccessToken()) {
        if (authButton) {
            authButton.textContent = "프로필";
            authButton.href = "profile.html";
            authButton.onclick = null;
        }
        if (logoutButton) {
            logoutButton.style.display = "block";
        }
    } else {
        if (authButton) {
            authButton.textContent = "로그인";
            authButton.href = "login.html";
            authButton.onclick = handleAuthButtonClick;
        }
        if (logoutButton) {
            logoutButton.style.display = "block";
        }
    }
}

// 로그인 함수
function loginWithKakao() {
    Kakao.Auth.authorize({
        redirectUri: "https://ping-chat.pages.dev/kakaoCallback", // 리디렉트 URI 설정
    });
}

// 로그아웃 함수
function logout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.Auth.logout(function () {
            window.location.href = "index.html"; // 로그아웃 후 메인 페이지로 이동
        });
    }
}

// 로그인 버튼 클릭 핸들러
function handleAuthButtonClick() {
    loginWithKakao();
}

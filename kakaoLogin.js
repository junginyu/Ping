// kakaoLogin.js

document.addEventListener("DOMContentLoaded", function () {
  if (!Kakao.isInitialized()) {
    // 카카오 SDK 초기화
    Kakao.init(KAKAO_JAVASCRIPT_KEY); // 발급받은 JavaScript 키를 사용합니다.
    console.log(Kakao.isInitialized()); // SDK 초기화 여부 확인 (true)
  }

  // 페이지 로드 시 로그인 상태 확인
  updateUI();
});

// 로그인 상태에 따라 UI 업데이트
function updateUI() {
  const authButton = document.getElementById("auth-button");

  if (Kakao.Auth.getAccessToken()) {
    authButton.textContent = "로그아웃";
    authButton.onclick = function () {
      logout();
    };
  } else {
    authButton.textContent = "로그인";
    authButton.onclick = function () {
      loginWithKakao();
    };
  }
}

// 로그인 또는 로그아웃 버튼 클릭 핸들러
function handleAuthButtonClick() {
  if (Kakao.Auth.getAccessToken()) {
    logout();
  } else {
    loginWithKakao();
  }
}

// 로그인 함수
function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: "http://localhost:5500/kakaoCallback.html", // 리디렉트 URI 설정
  });
}

// 로그아웃 함수
function logout() {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.Auth.logout(function () {
      // alert("로그아웃 완료");
      updateUI();
    });
  }
}

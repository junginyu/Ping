document.addEventListener("DOMContentLoaded", function () {
  // 사용자 정보 표시
  const nickname = localStorage.getItem("nickname");
  const email = localStorage.getItem("email");
  const profileImage = localStorage.getItem("profile_image");

  console.log("Nickname:", nickname);
  console.log("Email:", email);
  console.log("Profile Image:", profileImage);

  if (nickname && email && profileImage) {
    document.getElementById("nickname").textContent = nickname;
    document.getElementById("email").textContent = email;
    document.getElementById("profile-image").src = profileImage;
  } else {
    console.log("User information is missing from localStorage");
  }

  // 닉네임 수정 함수
  window.updateNickname = function () {
    const newNickname = document.getElementById("nickname-input").value;
    if (newNickname) {
      // 서버로 닉네임 업데이트 요청 보내기
      fetch("https://your-server-url/update-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: newNickname }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("nickname", newNickname);
            document.getElementById("nickname").textContent = newNickname;
            alert("닉네임이 성공적으로 수정되었습니다.");
          } else {
            alert("닉네임 수정에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("서버와의 통신 중 오류가 발생했습니다.");
        });
    } else {
      alert("새 닉네임을 입력하세요.");
    }
  };

  window.updateNickname = updateNickname;

  // 로그아웃 함수
  window.logout = function () {
    Kakao.Auth.logout(function () {
      localStorage.removeItem("nickname");
      localStorage.removeItem("email");
      localStorage.removeItem("profile_image");
      window.location.href = "index.html";
    });
  };
});

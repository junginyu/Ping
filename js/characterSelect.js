// characterSelect.js

document.addEventListener("DOMContentLoaded", function () {
  // 채팅 메뉴 클릭 시 로그인 여부 확인
  const chatMenu = document.getElementById("chat-menu");
  if (chatMenu) {
    chatMenu.addEventListener("click", function () {
      if (Kakao.Auth.getAccessToken()) {
        window.location.href = "chat.html";
      } else {
        window.location.href = "login.html";
      }
    });
  }

  // 캐릭터 이름 표시
  const characterNameDiv = document.getElementById("character-name");
  if (characterNameDiv) {
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    if (selectedCharacter) {
      switch (selectedCharacter) {
        case "haily":
          characterNameDiv.textContent = "Haily와 대화하기";
          break;
        case "jun":
          characterNameDiv.textContent = "JUN과 대화하기";
          break;
        case "linda":
          characterNameDiv.textContent = "Linda와 대화하기";
          break;
        default:
          characterNameDiv.textContent = "캐릭터와 대화하기";
          break;
      }
    } else {
      characterNameDiv.textContent = "캐릭터가 선택되지 않았습니다.";
    }
  }
});

function handleChatButtonClick(character) {
  if (Kakao.Auth.getAccessToken()) {
    selectCharacter(character);
  } else {
    window.location.href = "login.html";
  }
}

function selectCharacter(character) {
  const selectedCharacter = localStorage.getItem("selectedCharacter");

  // 이미 선택된 캐릭터가 아니면 저장
  if (selectedCharacter !== character) {
    localStorage.setItem("selectedCharacter", character);
  }

  window.location.href = "chat.html";
}

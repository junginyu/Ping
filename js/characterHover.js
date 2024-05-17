// characterHover.js

document.addEventListener("DOMContentLoaded", function () {
  const characters = document.querySelectorAll(".character-img-container");
  const mainTitle = document.getElementById("main-title");

  characters.forEach((character) => {
    const chatButton = character.querySelector(".chat-button");

    character.addEventListener("mouseenter", () => {
      if (!chatButton.matches(":hover")) {
        hoverCharacter(character.dataset.character);
      }
    });

    character.addEventListener("mouseleave", () => {
      if (!chatButton.matches(":hover")) {
        resetTitle();
      }
    });

    chatButton.addEventListener("mouseenter", () => {
      // 버튼 위에 마우스가 있을 때 타이틀 이벤트를 막음
      character.removeEventListener("mouseenter", hoverCharacter);
      character.removeEventListener("mouseleave", resetTitle);
    });

    chatButton.addEventListener("mouseleave", () => {
      // 버튼 위에서 마우스가 떠날 때 타이틀 이벤트 재설정
      character.addEventListener("mouseenter", () => {
        hoverCharacter(character.dataset.character);
      });
      character.addEventListener("mouseleave", resetTitle);
    });
  });

  function hoverCharacter(character) {
    switch (character) {
      case "Haily":
        mainTitle.innerHTML =
          "<div class='hover-title'>Hi, I'm Haily.</div><div class='hover-subtitle'>안녕하세요, 헤일리입니다.</div>";
        break;
      case "JUN":
        mainTitle.innerHTML =
          "<div class='hover-title'>こんにちは、ジュンです。</div><div class='hover-subtitle'>안녕하세요, 준입니다.</div>";
        break;
      case "Linda":
        mainTitle.innerHTML =
          "<div class='hover-title'>Hola, soy Linda.</div><div class='hover-subtitle'>안녕하세요, 린다입니다.</div>";
        break;
      default:
        resetTitle();
        break;
    }
  }

  function resetTitle() {
    const mainTitle = document.getElementById("main-title");
    mainTitle.innerHTML = `
    <h1>어떤 <span class="highlight">외국인 친구</span>를 사귀고 싶나요?</h1>
  `;
    mainTitle.className = "default-title";
  }
  
  window.hoverCharacter = hoverCharacter;
  window.resetTitle = resetTitle;
});

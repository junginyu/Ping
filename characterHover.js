// characterHover.js

function hoverCharacter(character) {
  const mainTitle = document.getElementById("main-title");

  switch (character) {
    case "Haily":
      mainTitle.innerHTML = `
        <p class="hover-title">Hi, I'm Haily.</p>
        <p class="hover-subtitle">안녕하세요, 헤일리입니다.</p>
      `;
      break;
    case "JUN":
      mainTitle.innerHTML = `
        <p class="hover-title">こんにちは、ジュンです。</p>
        <p class="hover-subtitle">안녕하세요, 준입니다.</p>
      `;
      break;
    case "Linda":
      mainTitle.innerHTML = `
        <p class="hover-title">Hola, soy Linda.</p>
        <p class="hover-subtitle">안녕하세요, 린다입니다.</p>
      `;
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

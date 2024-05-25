// characterSelect.js
// 페이지 로드 완료 후 실행되는 함수들을 설정합니다.
document.addEventListener("DOMContentLoaded", function () {
    setupChatMenu();
    if (document.getElementById("chat-container")) {
        updateCharacterNav();
        selectCurrentCharacter();
    }
});

// 채팅 페이지로의 이동을 관리하는 로직
function setupChatMenu() {
    document.body.addEventListener("click", function (event) {
        if (event.target.id === "chat-menu") {
            event.preventDefault();
            if (Kakao.Auth.getAccessToken()) {
                window.location.href = "../chat.html";
            } else {
                window.location.href = "../login.html";
            }
        } else if (
            event.target.classList.contains("character-img-container") ||
            event.target.parentNode.classList.contains("character-img-container")
        ) {
            const characterElement = event.target.closest(".character-img-container");
            const characterId = characterElement.getAttribute("data-character");
            handleChatButtonClick(characterId);
        } else if (
            event.target.tagName === "BUTTON" &&
            event.target.parentNode.classList.contains("character-avatar")
        ) {
            const character = event.target.parentNode.id.replace("-avatar", "");
            deleteCharacter(character);
        }
    });
}

// 대화 시작 버튼 클릭 시 실행되는 함수입니다.
function handleChatButtonClick(character) {
    const formattedCharactereId = character.toLowerCase();
    if (Kakao.Auth.getAccessToken()) {
        startChat(formattedCharactereId);
    } else {
        window.location.href = "../login.html"; // 로그인 페이지로 리디렉션
    }
}

// 대화를 시작하고, 캐릭터 선택을 저장합니다.
function startChat(character) {
    console.log("Starting chat with:", character);
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    if (!chatHistory[character]) {
        chatHistory[character] = [];
    }
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    localStorage.setItem("currentCharacter", character);
    window.location.href = "../chat.html";
}

// 채팅 페이지에서 캐릭터 목록을 업데이트합니다.
function updateCharacterNav() {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    const navContainer = document.querySelector(".chat-with");
    const noCharacterSection = document.querySelector(".no-characters");
    const chatContainer = document.querySelector("#chat-container");
    navContainer.innerHTML = ""; // 초기화

    const characterKeys = Object.keys(chatHistory);
    if (characterKeys.length === 0) {
        noCharacterSection.style.display = "block";
        chatContainer.style.display = "none";
    } else {
        noCharacterSection.style.display = "none";
        chatContainer.style.display = "flex";
        Object.keys(chatHistory).forEach((character) => {
            const characterElement = document.createElement("div");
            characterElement.className = "character-avatar";
            characterElement.id = `${character}-avatar`;

            const charImg = document.createElement("img");
            charImg.src = `../media/${character.toLowerCase()}Nav.png`;
            charImg.alt = `${character}`;
            characterElement.appendChild(charImg);

            const flagImg = document.createElement("img");
            flagImg.src = `../media/${character.toLowerCase()}Flag.png`;
            flagImg.alt = `${character} Flag`;
            flagImg.className = "flag";
            characterElement.appendChild(flagImg);

            navContainer.appendChild(characterElement);

            characterElement.addEventListener("click", () => {
                localStorage.setItem("currentCharacter", character);
                selectCurrentCharacter();
                window.location.reload();
            });
        });
    }

    // 새 캐릭터 추가 버튼 항상 표시
    const addButton = document.createElement("div");
    addButton.className = "add-character";
    addButton.innerHTML = '<img src="../media/addFriend.png" alt="Add" />';
    addButton.onclick = () => (window.location.href = "../index.html");
    navContainer.appendChild(addButton);
}

// 현재 선택된 캐릭터를 활성화하고 표시
function selectCurrentCharacter() {
    const selectedCharacter = localStorage.getItem("currentCharacter");
    if (!selectedCharacter) return;

    const avatars = document.querySelectorAll(".character-avatar");
    avatars.forEach((avatar) => {
        avatar.classList.remove("active");
        if (avatar.id === `${selectedCharacter}-avatar`) {
            avatar.classList.add("active");
        }
    });

    const characterImage = document.getElementById("character-image");
    characterImage.src = `../media/${selectedCharacter.toLowerCase()}.svg`;
}

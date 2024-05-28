//chat.js
import { getInitialMessages } from "./gptPromptClient.js";

let currentCharacter = localStorage.getItem("currentCharacter") || "default";

async function postJSON() {
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();
    if (!message) return;

    displayMessage(message, "user", currentCharacter);
    chatInput.value = ""; // 채팅 보내고 나서 초기화

    try {
        const initialMessages = getInitialMessages(currentCharacter);
        console.log("Selected Character: ", currentCharacter);
        const response = await fetch(
            "https://2y2fxobbnie5brsnwa3cm6ei6a0cxpuk.lambda-url.ap-northeast-2.on.aws/ping",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 쿠키 등 인증 정보 포함
                body: JSON.stringify({
                    userMessages: [message],
                    assistantMessages: initialMessages,
                    character: currentCharacter,
                }),
            }
        );
        const result = await response.json();
        console.log("성공:", result);
        displayMessage(result.assistant, "assistant", currentCharacter);
    } catch (error) {
        console.error("실패:", error);
        displayMessage(getErrorMessage(currentCharacter), "assistant", currentCharacter);
    }
}

// 캐릭터별로 다른 오류 메시지를 설정
function getErrorMessage(character) {
    const errorMessages = {
        haily: "I'm a little tired today... See you next time!",
        jun: "今日はちょっと疲れた...。また今度ね！",
        linda: "Hoy estoy un poco cansado... Hasta la próxima.",
        default: "이제 잘래.. 다음에 보자!",
    };
    return errorMessages[character] || errorMessages.default;
}

function displayMessage(message, type, character) {
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    if (!chatHistory[character]) {
        chatHistory[character] = [];
    }

    chatHistory[character].push({ type: type, text: message }); // 채팅 기록에 메시지 추가
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    const chatContainer = document.getElementById("chat-history"); // 채팅 컨테이너 엘리먼트를 선택

    const messageElement = document.createElement("div"); // 새 메시지 엘리먼트 생성
    messageElement.classList.add("message", type === "user" ? "user" : "assistant");

    const textContainer = document.createElement("div"); // 텍스트 컨테이너 엘리먼트 생성 및 설정
    textContainer.classList.add("text-container");
    textContainer.textContent = message;

    messageElement.appendChild(textContainer); // 메시지 엘리먼트에 텍스트 컨테이너를 추가

    chatContainer.prepend(messageElement); // 메시지 엘리먼트를 채팅 컨테이너에 추가
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
    const currentCharacter = localStorage.getItem("currentCharacter");
    if (currentCharacter) {
        sendInitialMessage(currentCharacter); // 초기 메시지 전송 및 채팅 기록 로드
    }

    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    chatInput.addEventListener("keyup", function (event) {
        sendButton.disabled = chatInput.value.trim() === "";
        if (event.keyCode === 13 && !sendButton.disabled) {
            event.preventDefault();
            postJSON();
        }
    });

    sendButton.addEventListener("click", function () {
        if (!sendButton.disabled) {
            postJSON();
        }
    });

    if (currentCharacter) {
        loadChatHistory(currentCharacter); // 로드 시 이전 대화 내역을 불러옵니다.
    }
});

function sendInitialMessage(character) {
    const initialMessagesText = {
        haily: "Hi! I'm Haily. What do you want to talk about?",
        jun: "私はジュンといいます。私とどんな話をしたいですか？",
        linda: "¡Hola, amigo! Soy Linda. ¿De qué podemos hablar?",
    };
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "{}");

    if (!chatHistory[character] || chatHistory[character].length === 0) {
        chatHistory[character] = chatHistory[character] || [];
        chatHistory[character].push({ type: "assistant", text: initialMessagesText[character] });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

        loadChatHistory(character);
    }
}

function loadChatHistory(character) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "{}")[character] || [];
    const chatContainer = document.getElementById("chat-history");
    chatContainer.innerHTML = "";

    chatHistory.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", message.type === "user" ? "user" : "assistant");

        const textContainer = document.createElement("div");
        textContainer.classList.add("text-container");
        textContainer.textContent = message.text;

        messageElement.appendChild(textContainer);
        chatContainer.prepend(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

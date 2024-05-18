// chat.js
let userMessages = [];
let assistantMessages = [];

async function postJSON(data) {
  const chatInput = document.getElementById("chat-input");
  const message = chatInput.value.trim();
  displayMessage(message, "sent");

  try {
    //userMessages에 사용자의 메시지 저장
    userMessages.push(chatInput.value);

    // clear input after sending
    chatInput.value = "";

    const response = await fetch(
      "https://rwvirffmt5en7wbzof5yyinsua0quade.lambda-url.ap-northeast-2.on.aws/portfolio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 등 인증 정보 포함
        body: JSON.stringify({
          userMessages: userMessages,
          assistantMessages: assistantMessages,
        }),
      }
    );
    const result = await response.json();
    console.log("성공:", result);

    displayMessage(result.assistant, "received");

    //assistantMessages에 gpt의 메시지 저장
    assistantMessages.push(result.assistant);
  } catch (error) {
    console.error("실패:", error);
    displayMessage("이제 잘래.. 다음에 보자!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");

  // 입력 필드에서 키를 누를 때마다 호출될 함수
  chatInput.addEventListener("keyup", function (event) {
    sendButton.disabled = chatInput.value.trim() === "";

    if (event.keyCode === 13 && !sendButton.disabled) {
      event.preventDefault();
      postJSON();
    }
  });

  // '전송' 버튼 클릭 이벤트
  sendButton.addEventListener("click", function () {
    if (!sendButton.disabled) {
      postJSON();
    }
  });
});

function displayMessage(message, type) {
  const chatHistory = document.getElementById("chat-history");

  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "message",
    type === "sent" ? "user" : "assistant"
  );

  const textElement = document.createElement("div");
  textElement.classList.add("text-container");
  textElement.textContent = message;

  messageElement.appendChild(textElement);
  chatHistory.prepend(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");

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
});

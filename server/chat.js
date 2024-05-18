// chat.js
let userMessages = [];
let assistantMessages = [];

async function postJSON(data) {
  const chatInput = document.getElementById("chat-input");
  const message = chatInput.value.trim();
  displayMessage("You", message, "sent");
  displayMessage("Ria", "", "received", true); // 스피너 활성화

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
    // 스피너 제거하고 새 메시지 추가
    const chatHistory = document.getElementById("chat-history");
    chatHistory.removeChild(chatHistory.lastChild);
    displayMessage("Ria", result.assistant, "received");

    //assistantMessages에 gpt의 메시지 저장
    assistantMessages.push(result.assistant);
  } catch (error) {
    console.error("실패:", error);
    displayMessage("Ria 채팅권이 다 나갔어요 🥲", "내일 또 방문해주세요!");
  } finally {
    spinner.style.display = "none"; // 스피너 숨김
  }
}

function displaySpinner(show) {
  const spinner = document.getElementById("spinner");
  spinner.style.display = show ? "block" : "none";
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

function displayMessage(username, message, type, isSpinner = false) {
  const chatHistory = document.getElementById("chat-history");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);

  const profileElement = document.createElement("div");
  profileElement.classList.add("profile-circle");

  const textElement = document.createElement("div");
  textElement.classList.add("text-container");

  const usernameElement = document.createElement("div");
  usernameElement.classList.add("username");
  usernameElement.textContent = username;

  const messageContentElement = document.createElement("div");
  messageContentElement.classList.add("message-content");

  if (isSpinner) {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    messageContentElement.appendChild(spinner);
  } else {
    if (type === "received") {
      // 보조원 메시지에만 타이핑 애니메이션 적용
      messageContentElement.textContent = ""; // 초기 메시지 설정을 비움
      // typeMessage(message, messageContentElement);
    } else {
      // 사용자 메시지는 즉시 표시
      messageContentElement.textContent = message;
    }
  }

  textElement.appendChild(usernameElement);
  textElement.appendChild(messageContentElement);

  messageElement.appendChild(profileElement);
  messageElement.appendChild(textElement);

  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight; // 스크롤을 최신 메시지 위치로 이동
}

// function typeMessage(message, element) {
//   let index = 0;
//   const speed = 75; // 타이핑 속도 조절 (밀리초 단위)

//   function type() {
//     if (index < message.length) {
//       element.textContent += message.charAt(index);
//       index++;
//       setTimeout(type, speed);
//     }
//   }

//   type();
// }

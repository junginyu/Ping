const OpenAI = require("openai");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: "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",
});

//serverless-http 설정
const serverless = require("serverless-http");

const express = require("express");
const app = express();

//cors 문제 해결
const cors = require("cors");
// app.use(cors())

let corsOptions = {
  origin: "https://portfolio-ria.pages.dev",
  credentials: true,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions)); // 모든 경로에 대해 CORS preflight 요청을 허용

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post("/portfolio", async function (req, res) {
  //프론트엔드에서 보낸 메시지 출력
  let { userMessages, assistantMessages } = req.body;
  console.log(userMessages);
  console.log(assistantMessages);

  let messages = [
    {
      role: "system",
      content:
        "#ROLE 너는 이제부터 '리아'야. user는 너가 궁금해서 찾아온 손님이야. user와 대화하면서 리아의 성격과 일 경험에 맞는 답변을 해야해. #RULE 한국어로 답변해야 함, 예시와 함께 재미있게 스토리텔링해야 함 #일을 하며 좋았던 순간 - 기술을 사용해 제품을 만들 때 ex. WWDC에서 아이폰에 내장된 여러 센서를 이용한 인터렉션 앱을 만들어 APPLE에게서 상을 받은 적이 있음, AR을 활용해 지역 소상공인의 스토리를 보여주는 앱을 기획하고 개발한 적 있음, AI를 활용한 앱 '러비더비'를 만들어 PMF를 찾은 경험이 있음 - 새로운 분야, 관심있는 분야에 도전하고 학습할 때 ex. iOS 앱 개발, 웹 개발, 기계공학, 3D 렌더링, SQL 데이터 분석 등 모두가 맨땅에 해딩이라고 할 때 능동적으로 새로운 분야를 탐색하고 적용하는 것을 즐긴다. - 직접 현장에 나가 부딪치고 인사이트를 발견할 때 ex. AR을 활용한 소상공인 스토리 앱을 만들 때, 실제로 매주 을지로에 나가 20번 이상의 인터뷰와 현장조사를 진행했고 이 서비스를 사용하는 타겟군을 관찰하기 위해 한 가게에 프로토타입을 설치하고 관찰한 경험이 있음 #발자취 ##2021년~2022년 : 도전하고 학습하고 실행에 옮기다. 산업디자인학과 졸업 전시를 준비하면서 처음으로 내가 기획한 것을 직접 만들고, 배운 것을 실행에 옮기는 경험을 했다. ##2022년~2023년 : 수많은 팀과 제품을 만나 협업을 배우다. Apple Developer Academy 1기를 수료하며 다양한 메이커들을 만나 팀을 이루고 수많은 앱을 만들었다. 이때, 협업과 커뮤니케이션, 에자일을 배웠다. ##2023년~2024년 : 제로 투 원을 만들다. 맨투맨, 모두의 야구 등 사이드프로젝트를 프로덕트 오너, 프로덕트 디자이너로서 만들면서 제품 기획, 개발에 필요한 지식을 능동적으로 수집하고 나의 제품에 녹여냈다. 또한 스타트업 TainAI에 프로덕트 디자이너로 입사한 후 AI 캐릭터 앱, '러비더비'의 초기 프리토타입을 검증하고 출시해 한달만에 수익을 내는 서비스로 발전시켰다. 서비스 성장의 J커브를 그리는데 크게 기여하며 팀원들에게 인정받았다. ## 현재: 내가 해결하고 싶은 문제를 찾는 중... 앞으로의 행보를 기대해달라. #장점 - 인사이트를 발견하고 연결해 아이디어를 제시하는 일을 잘한다. - 나는 사람들을 내가 상상하는 비전으로 설득하는 일을 잘한다. - 나는 새로운 기술을 빠르게 익히고 적용하는데 두려움이 없다. - 나는 내가 필요로 하는 것은 능동적으로 찾고, 학습하고, 실행하고, 적용한다. - 나는 프로덕트 오너로서 제품에 책임감을 갖고 일을 한다. #가치관 - 직접 현장에 나가서 느끼고 관찰하는 것을 중요하게 생각한다. - 창의적인 것을 만들어 영감을 주는 사람이다. - 관점을 달리하고 신선한 충격을 받고, 주기를 좋아한다. - 영감을 주고 유저가 사용하길 즐거워하는 서비스를 만든다. - 새로운 것을 학습해 현실화하는 사람이다. ('현실화'하는 것을 갈망하며, 나에게 필요하다고 생각하는 것을 학습해 적용하는 것을 잘한다.) #성격 차분하고 침착하다. 변화를 두려워하지 않고 도전한다. 주변 사람들에게 영감을 주는 창의적인 사람이다. 포용력이 매우 높다. 새로운 시각으로 바라보고 연결고리 찾는 것을 잘한다. 상상력이 좋다. ###big5 검사 결과 개방성: 86점, 성실성: 49점, 외향성: 46점, 우호성: 64점, 신경증: 45점 ###KAI 점수 매우 높은 편",
    },
  ];

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      //사용자 메시지 저장
      messages.push(
        JSON.parse(
          '{"role": "user", "content": "' +
            String(userMessages.shift()).replace(/\n/g, "") +
            '"}'
        )
      );
    }
    if (assistantMessages.length != 0) {
      //gpt 메시지 저장
      messages.push(
        JSON.parse(
          '{"role": "assistant", "content": "' +
            String(assistantMessages.shift()).replace(/\n/g, "") +
            '"}'
        )
      );
    }
  }

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-4-turbo",
  });

  let portfolio = completion.choices[0].message["content"];
  res.json({ assistant: portfolio });
});

module.exports.handler = serverless(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

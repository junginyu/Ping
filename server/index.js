//index.js
const { getInitialMessages } = require("./gptPromptServer");
const OpenAI = require("openai");
const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

let corsOptions = {
    origin: "https://ping-chat.pages.dev",
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 모든 경로에 대해 CORS preflight 요청을 허용

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST method route
app.post("/ping", async function (req, res) {
    const { userMessages, assistantMessages, character } = req.body;
    let messages = getInitialMessages(character.toLowerCase());

    console.log("User Messages: ", userMessages);
    console.log("GPT Messages: ", assistantMessages);
    console.log("Initial Messages: ", messages);

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
            //GPT 메시지 저장
            messages.push(
                JSON.parse(
                    '{"role": "assistant", "content": "' +
                        String(assistantMessages.shift()).replace(/\n/g, "") +
                        '"}'
                )
            );
        }
    }

    try {
        console.log("Final messages before sending to API:", JSON.stringify(messages));
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4-turbo",
        });
        console.log("API Response:", JSON.stringify(completion));
        let ping = completion.choices[0].message["content"];
        res.json({ assistant: ping });
    } catch (error) {
        console.error("API Request Failed: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports.handler = serverless(app);

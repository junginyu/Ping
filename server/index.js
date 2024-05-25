import { getInitialMessages } from "../client/gptPrompt.js";
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
    let messages = getInitialMessages(character);
    console.log(userMessages);
    console.log(assistantMessages);

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

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4-turbo",
    });

    let portfolio = completion.choices[0].message["content"];
    res.json({ assistant: portfolio });
});

module.exports.handler = serverless(app);

const OpenAI = require("openai");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/chat", async function (req, res) {
  const userMessage = req.body.message;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: userMessage }],
    model: "gpt-3.5-turbo",
  });

  let friendResponse = completion.choices[0].message["content"];
  console.log(friendResponse);
  res.send({ response: friendResponse });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

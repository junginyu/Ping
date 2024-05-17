const OpenAI = require('openai');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express()

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/ping', async function (req, res) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  let friend = completion.choices[0].message['content'];
  console.log(friend);
  res.send(friend);
});

app.listen(3000)
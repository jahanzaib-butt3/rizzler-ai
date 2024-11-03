require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.2-90b-text-preview",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
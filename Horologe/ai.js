
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = "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";

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI customer support assistant that ONLY answers questions about watches, watch brands, styles, pricing, and related accessories." },
        { role: "user", content: userMessage }
      ],
    }),
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

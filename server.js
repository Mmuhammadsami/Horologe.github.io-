import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ⚠️ Replace with your actual OpenRouter key
const OPENROUTER_API_KEY = "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";

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // free fast model
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await aiResponse.json();

    if (!data.choices) {
      console.error("❌ OpenRouter Error:", data);
      return res.status(500).json({ reply: "⚠️ AI error: " + JSON.stringify(data) });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("❌ Server crash:", err);
    res.status(500).json({ reply: "⚠️ Error: " + err.message });
  }
});

app.listen(3000, "0.0.0.0", () => 
  console.log("✅ Server running at http://0.0.0.0:3000")
);

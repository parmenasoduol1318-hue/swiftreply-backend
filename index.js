import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/reply", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are SwiftReply, a fast helpful assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SwiftReply backend running on http://localhost:${PORT}`);
});

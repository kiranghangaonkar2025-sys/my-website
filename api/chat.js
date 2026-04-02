import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,   // messages[0] is already the system prompt
      max_tokens: 400,
      temperature: 0.7,
    });

    res.status(200).json(completion);
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: err.message });
  }
}

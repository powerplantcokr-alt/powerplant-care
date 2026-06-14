// ════════════════════════════════════════════════════════════
// POWERPLANT care — Claude API 프록시 (Vercel Serverless Function)
// 위치: 저장소의 api/chat.js
// 필요: Vercel → Settings → Environment Variables → ANTHROPIC_API_KEY
// ════════════════════════════════════════════════════════════
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }
  try {
    const { system, messages, max_tokens } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: "messages required" } });
    }
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        // 비용 우선: 하이쿠 / 품질 우선으로 바꾸려면 "claude-sonnet-4-6"
        model: "claude-haiku-4-5-20251001",
        max_tokens: Math.min(Number(max_tokens) || 1000, 1500),
        system,
        messages,
      }),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: { message: "proxy error" } });
  }
}

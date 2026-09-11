import { GoogleGenAI } from "@google/genai";

function sanitizeInput(input: unknown, maxLen = 8000): string {
  if (typeof input !== "string") return "";
  let clean = input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .trim();
  if (clean.length > maxLen) {
    clean = clean.substring(0, maxLen);
  }
  return clean;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const rawMessage = body.message;
    const rawAgentType = body.agentType || "headhunter";
    const message = sanitizeInput(rawMessage);
    const agentType = sanitizeInput(rawAgentType);

    if (!message || message.length < 2) {
      res.status(400).json({ error: "El mensaje es requerido." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: message,
          config: {
            systemInstruction: "Eres NexIA, la Inteligencia Artificial y Consultora Senior de Headhunting de Nexo Talento en España (Madrid y Barcelona). Responde de forma ejecutiva, cercana y profesional en Markdown sobre selección directiva, tiempos de entrega de 18 días hábiles y garantías de 3 a 6 meses.",
          }
        });
        if (response.text) {
          res.json({ reply: response.text, agentType, provider: "gemini" });
          return;
        }
      } catch (geminiErr) {
        console.warn("Gemini error:", geminiErr);
      }
    }

    // Heuristic fallback response
    res.json({
      reply: `### 🤝 Consultoría Estratégica Nexo Talento\n\nGracias por tu consulta. En **Nexo Talento** garantizamos ternas de finalistas contrastados en **18 días hábiles** con garantía contractual de 3 a 6 meses.\n\nUn Senior Partner puede asesorarte de forma personalizada o coordinar por WhatsApp al **+34 614 143 763**.`,
      agentType,
      provider: "heuristic"
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Error en el chat" });
  }
}

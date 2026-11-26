import { GoogleGenAI } from '@google/genai';

const MAX_CV_BYTES = 3.5 * 1024 * 1024;

function clean(value: unknown, maxLength = 8000): string {
  return typeof value === 'string'
    ? value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, maxLength)
    : '';
}

function fallbackAnalysis(cvText: string) {
  const wordCount = cvText.split(/\s+/).length;
  const isTech = /javascript|typescript|react|python|java|cloud|aws|devops|backend|frontend|ai|data/i.test(cvText);
  const isDirector = /director|gerente|head of|vp|chief|cfo|cto|cmo|ceo|liderazgo/i.test(cvText);
  return {
    candidateName: 'Candidato evaluado',
    seniorityLevel: isDirector ? 'Director / C-Level (+10 años)' : isTech ? 'Senior Tech Specialist (6-9 años)' : 'Senior Professional (5-8 años)',
    fitScore: Math.min(94, Math.max(78, Math.round(75 + wordCount / 40))),
    recommendedRoles: isDirector ? ['Director de Operaciones', 'Director de Unidad de Negocio'] : isTech ? ['Tech Lead', 'Senior Cloud Architect'] : ['Senior Project Manager', 'Business Development Lead'],
    executiveSummary: 'El perfil presenta una base profesional sólida. Recomendamos cuantificar logros, ordenar la experiencia bajo formato STAR y destacar las competencias que mejor conecten con el objetivo profesional.',
    provider: 'heuristic',
  };
}

async function extractText(sourceFile: unknown): Promise<{ text?: string; error?: string; status?: number }> {
  if (!sourceFile || typeof sourceFile !== 'object' || !('base64' in sourceFile) || typeof sourceFile.base64 !== 'string') {
    return { error: 'Envía el contenido del archivo en sourceFile.base64.', status: 400 };
  }
  const base64 = sourceFile.base64.trim().replace(/^data:[^,;]*;base64,/i, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64) || base64.length > Math.ceil(MAX_CV_BYTES / 3) * 4) {
    return { error: 'El archivo no es válido o supera el límite de 3,5 MB.', status: 413 };
  }
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.length > MAX_CV_BYTES) return { error: 'El archivo supera el límite de 3,5 MB.', status: 413 };
  const isPdf = buffer.subarray(0, 1024).includes('%PDF-');
  const isDocx = buffer.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  if (!isPdf && !isDocx) return { error: 'Usa un archivo PDF o DOCX.', status: 415 };
  try {
    if (isPdf) {
      const { PDFParse } = await import('pdf-parse');
      const parser = new PDFParse({ data: new Uint8Array(buffer), isEvalSupported: false });
      try { return { text: clean((await parser.getText()).text) }; } finally { await parser.destroy(); }
    }
    const { default: mammoth } = await import('mammoth');
    return { text: clean((await mammoth.extractRawText({ buffer })).value) };
  } catch {
    return { error: `No se pudo leer el ${isPdf ? 'PDF' : 'DOCX'}.`, status: 422 };
  }
}

async function analyzeWithAi(cvText: string, targetRole: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `CV a evaluar:\n${cvText}`,
    config: { systemInstruction: `Analiza el CV para ${targetRole}. Devuelve exclusivamente JSON con candidateName, seniorityLevel, fitScore, recommendedRoles (array) y executiveSummary.` },
  });
  const raw = response.text?.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  return typeof parsed?.executiveSummary === 'string' ? { ...parsed, provider: 'gemini' } : null;
}

export default async function handler(req: { method?: string; body?: unknown }, res: { setHeader: (name: string, value: string) => void; status: (code: number) => { json: (body: unknown) => void } }) {
  res.setHeader('Allow', 'POST');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const source = body as Record<string, unknown>;
  const extracted = source.sourceFile ? await extractText(source.sourceFile) : undefined;
  const cvText = extracted?.text || clean(source.cvText);
  if (cvText.length < 20) return res.status(extracted?.status || 400).json({ error: extracted?.error || 'Adjunta un PDF o DOCX, o pega al menos 20 caracteres del CV.' });
  try {
    const aiResult = await analyzeWithAi(cvText, clean(source.targetRole, 200) || 'Perfil profesional');
    return res.status(200).json(aiResult || fallbackAnalysis(cvText));
  } catch {
    return res.status(200).json(fallbackAnalysis(cvText));
  }
}

import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// Utility sanitizer
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

function createMailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

async function appendToGoogleSheet(rowData: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!sheetId || !serviceEmail || !privateKey) {
    console.warn("[Sheets] Google Sheets variables missing - skipping");
    return;
  }

  const auth = new google.auth.JWT({
    email: serviceEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Leads!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [rowData] },
  });
}

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

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
    const name        = sanitizeInput(body.name)        || "Sin nombre";
    const email       = sanitizeInput(body.email)       || "Sin email";
    const phone       = sanitizeInput(body.phone)       || "Sin teléfono";
    const company     = sanitizeInput(body.company)     || "Sin empresa";
    const role        = sanitizeInput(body.role)        || "Sin cargo especificado";
    const serviceType = sanitizeInput(body.serviceType) || "Consulta General";
    const message     = sanitizeInput(body.message)     || "Sin mensaje";
    const clientIP    = ((req.headers["x-forwarded-for"] as string) || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const leadId      = "lead_" + Date.now();
    const createdAt   = new Date().toISOString();

    const newLead = { id: leadId, createdAt, name, email, phone, company, role, serviceType, message, clientIP };
    console.log("📨 [NUEVO LEAD]:", JSON.stringify(newLead, null, 2));

    // 1. Email via SMTP
    const toEmail = process.env.CONTACT_TO_EMAIL || "info@nexotalento.com";
    const smtpUser = process.env.SMTP_USER || "";

    if (smtpUser) {
      try {
        const transporter = createMailTransporter();

        const notifHtml = `
          <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#082041,#00A9A3);padding:24px 28px">
              <h1 style="margin:0;font-size:20px;color:#fff">🎯 Nuevo Lead — Nexo Talento</h1>
              <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,.75)">${createdAt}</p>
            </div>
            <div style="padding:24px 28px">
              <table style="width:100%;border-collapse:collapse;font-size:13px">
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8;width:35%">ID Lead</td><td style="padding:8px 0;border-bottom:1px solid #1e293b;font-weight:bold">${leadId}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8">Nombre</td><td style="padding:8px 0;border-bottom:1px solid #1e293b">${name}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8">Email</td><td style="padding:8px 0;border-bottom:1px solid #1e293b">${email}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8">Teléfono</td><td style="padding:8px 0;border-bottom:1px solid #1e293b">${phone}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8">Empresa</td><td style="padding:8px 0;border-bottom:1px solid #1e293b">${company}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8">Servicio</td><td style="padding:8px 0;border-bottom:1px solid #1e293b">${serviceType}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8">Cargo</td><td style="padding:8px 0;border-bottom:1px solid #1e293b">${role}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8">Mensaje</td><td style="padding:8px 0">${message}</td></tr>
              </table>
            </div>
            <div style="padding:16px 28px;background:#0b1526;font-size:11px;color:#475569">
              Enviado desde <strong>www.nexotalento.com</strong> · IP: ${clientIP}
            </div>
          </div>`;

        await transporter.sendMail({
          from: `"Nexo Talento Web" <${smtpUser}>`,
          to: toEmail,
          subject: `🎯 Nuevo Lead: ${name} — ${serviceType}`,
          html: notifHtml,
          replyTo: email,
        });

        if (email && email.includes("@") && email !== "Sin email") {
          const ackHtml = `
            <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#f8fafc;color:#0f172a;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
              <div style="background:linear-gradient(135deg,#082041,#00A9A3);padding:28px">
                <h1 style="margin:0;font-size:20px;color:#fff">Hola, ${name} 👋</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,.85);font-size:14px">Hemos recibido tu solicitud en Nexo Talento</p>
              </div>
              <div style="padding:28px">
                <p style="font-size:15px;line-height:1.7">Gracias por contactar con nosotros. Un <strong>Senior Talent Partner</strong> revisará tu información y se pondrá en contacto contigo en un plazo máximo de <strong>24 horas hábiles</strong>.</p>
                <div style="background:#f0f9ff;border-left:4px solid #00A9A3;border-radius:6px;padding:16px;margin:20px 0">
                  <p style="margin:0;font-size:13px;font-weight:bold;color:#082041">Tu solicitud en resumen:</p>
                  <ul style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#334155;line-height:1.8">
                    <li><strong>Servicio:</strong> ${serviceType}</li>
                    <li><strong>Posición / Perfil:</strong> ${role}</li>
                    ${message !== "Sin mensaje" ? `<li><strong>Tu mensaje:</strong> ${message}</li>` : ""}
                  </ul>
                </div>
                <p style="font-size:13px;color:#475569">Si necesitas respuesta inmediata, puedes contactarnos directamente por WhatsApp:</p>
                <a href="https://wa.me/34614143763" style="display:inline-block;background:#25d366;color:#fff;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px">💬 WhatsApp Directo</a>
              </div>
              <div style="padding:16px 28px;background:#f1f5f9;font-size:11px;color:#64748b;text-align:center">
                © ${new Date().getFullYear()} Nexo Talento Consultores S.L. — info@nexotalento.com<br/>
                Este es un correo automático, responde a este email para contactarnos directamente.
              </div>
            </div>`;

          await transporter.sendMail({
            from: `"Nexo Talento" <${smtpUser}>`,
            to: email,
            subject: `✅ Recibimos tu solicitud, ${name} — Nexo Talento`,
            html: ackHtml,
            replyTo: toEmail,
          });
        }
      } catch (mailErr) {
        console.error("[Email Error]", mailErr);
      }
    }

    // 2. Google Sheets
    try {
      await appendToGoogleSheet([
        leadId, createdAt, name, email, phone, company, role, serviceType, message, clientIP
      ]);
    } catch (sheetErr) {
      console.warn("[Sheets Error]", sheetErr);
    }

    res.status(200).json({
      success: true,
      message: "Lead registrado, email enviado y guardado con éxito.",
      leadId,
    });
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Error procesando el contacto" });
  }
}

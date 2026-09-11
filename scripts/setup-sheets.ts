import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

/**
 * Script para inicializar Google Sheets con las cabeceras requeridas.
 * Se puede ejecutar con: npx tsx scripts/setup-sheets.ts
 */
async function setupSheets() {
  console.log("Iniciando configuración de Google Sheets...");

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Reemplazar saltos de línea literales en la clave
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!sheetId || !serviceEmail || !privateKey) {
    console.error("❌ ERROR: Faltan variables de entorno de Google Sheets.");
    console.log("Por favor, asegúrate de haber configurado GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY en tu archivo .env");
    process.exit(1);
  }

  try {
    // Autenticación con Google usando JWT (JSON Web Token)
    const auth = new google.auth.JWT({
      email: serviceEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 1. Obtener la hoja para ver si existe la pestaña 'Leads' o si tenemos que actualizar la actual
    const sheetData = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    // Validar si existe una hoja que podamos usar, si no existe 'Leads', usaremos la primera y le cambiaremos el nombre
    let targetSheetId = sheetData.data.sheets?.[0]?.properties?.sheetId || 0;
    let targetSheetName = sheetData.data.sheets?.[0]?.properties?.title || "Hoja 1";

    const leadsSheet = sheetData.data.sheets?.find(s => s.properties?.title === "Leads");
    if (leadsSheet) {
      targetSheetId = leadsSheet.properties?.sheetId || 0;
      targetSheetName = "Leads";
    } else {
      console.log(`Renombrando la hoja '${targetSheetName}' a 'Leads'...`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              updateSheetProperties: {
                properties: {
                  sheetId: targetSheetId,
                  title: "Leads"
                },
                fields: "title"
              }
            }
          ]
        }
      });
      targetSheetName = "Leads";
    }

    console.log(`Escribiendo cabeceras en la hoja '${targetSheetName}'...`);
    
    // 2. Definir las cabeceras (10 columnas)
    const headers = [
      "ID", 
      "Fecha", 
      "Nombre", 
      "Email", 
      "Teléfono", 
      "Empresa", 
      "Cargo", 
      "Servicio", 
      "Mensaje", 
      "IP"
    ];

    // 3. Escribir las cabeceras en la fila 1
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${targetSheetName}!A1:J1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [headers]
      }
    });

    // 4. (Opcional) Aplicar formato a las cabeceras para que se vean bien (negrita, color de fondo)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: targetSheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 10
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.05, green: 0.12, blue: 0.25 }, // Color corporativo Nexo (aprox)
                  textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                  horizontalAlignment: "CENTER"
                }
              },
              fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)"
            }
          },
          // Congelar la primera fila
          {
            updateSheetProperties: {
              properties: {
                sheetId: targetSheetId,
                gridProperties: { frozenRowCount: 1 }
              },
              fields: "gridProperties.frozenRowCount"
            }
          }
        ]
      }
    });

    console.log("✅ ¡ÉXITO! Las cabeceras se han escrito y formateado correctamente en tu Google Sheet.");
    console.log("Tu hoja de Leads está lista para recibir registros.");

  } catch (error) {
    console.error("❌ ERROR al conectar con Google Sheets:");
    console.error(error instanceof Error ? error.message : error);
    console.log("\nVerifica que:");
    console.log("1. El GOOGLE_SHEET_ID sea correcto (es la cadena larga en la URL del Sheet).");
    console.log("2. Hayas compartido el Sheet (con permisos de Editor) al email de tu cuenta de servicio.");
    console.log("3. Las credenciales sean correctas.");
  }
}

setupSheets();

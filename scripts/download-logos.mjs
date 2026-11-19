import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

// Mapeo de logos oficiales desde Wikimedia Commons y repositorios confiables (formato PNG transparente o SVG)
const LOGO_SOURCES = {
  'nestle.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nestl%C3%A9_textlogo.svg/640px-Nestl%C3%A9_textlogo.svg.png',
  'banco-pichincha.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Banco_Pichincha_logo.svg/640px-Banco_Pichincha_logo.svg.png',
  'pronaca.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pronaca_logo.svg/640px-Pronaca_logo.svg.png',
  'schlumberger.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/SLB_Logo_2022.svg/640px-SLB_Logo_2022.svg.png',
  'caterpillar.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Caterpillar_logo.svg/640px-Caterpillar_logo.svg.png',
  'claro.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Claro.svg/640px-Claro.svg.png',
  'movistar.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Movistar_2020.svg/640px-Movistar_2020.svg.png',
  'danone.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Danone_logo.svg/640px-Danone_logo.svg.png',
  'banco-guayaquil.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Banco_Guayaquil_logo.svg/640px-Banco_Guayaquil_logo.svg.png',
  'la-fabril.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/La_Fabril_logo.png/640px-La_Fabril_logo.png',
  'grupo-difare.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Grupo_Difare_logo.png/640px-Grupo_Difare_logo.png'
};

async function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      // Manejar redirecciones (301, 302, 307)
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadFile(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        console.warn(`[Skip] HTTP ${res.statusCode} para ${url}`);
        return resolve(false);
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });
      fileStream.on('error', () => resolve(false));
    });
    req.on('error', () => resolve(false));
  });
}

async function run() {
  console.log('Iniciando descarga de logos oficiales con transparencia...');
  for (const [filename, url] of Object.entries(LOGO_SOURCES)) {
    const dest = path.join(LOGOS_DIR, filename);
    try {
      const ok = await downloadFile(url, dest);
      if (ok) {
        console.log(`✅ Descargado: ${filename}`);
      } else {
        console.log(`⚠️ No disponible online directo: ${filename}`);
      }
    } catch (err) {
      console.warn(`Error descargando ${filename}:`, err);
    }
  }
  console.log('Descarga completada.');
}

run();

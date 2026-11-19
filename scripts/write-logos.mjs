import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'logos');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const svgs = {
  'banco-pichincha.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" fill="none">
    <rect width="48" height="48" x="6" y="6" rx="10" fill="#FFDD00"/>
    <path d="M22 18L36 30L22 42" stroke="#002E6E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="66" y="38" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="22" fill="#002E6E">BANCO</text>
    <text x="148" y="38" font-family="'Inter', system-ui, sans-serif" font-weight="500" font-size="22" fill="#002E6E">PICHINCHA</text>
  </svg>`,

  'schlumberger.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60" fill="none">
    <text x="10" y="42" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="36" fill="#001489" letter-spacing="-1.5">SLB</text>
    <text x="88" y="38" font-family="'Inter', system-ui, sans-serif" font-weight="600" font-size="16" fill="#001489" letter-spacing="1">Schlumberger</text>
  </svg>`,

  'caterpillar.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60" fill="none">
    <polygon points="68,44 98,44 83,18" fill="#FFCD11"/>
    <text x="10" y="43" font-family="'Arial Black', 'Impact', sans-serif" font-weight="900" font-size="34" fill="#111827" letter-spacing="1">CAT</text>
    <text x="110" y="39" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="18" fill="#111827">CATERPILLAR</text>
  </svg>`,

  'claro.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
    <circle cx="35" cy="30" r="20" fill="#DA291C"/>
    <circle cx="42" cy="24" r="6" fill="#FFFFFF"/>
    <text x="65" y="40" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="30" fill="#DA291C" letter-spacing="-0.5">Claro</text>
  </svg>`,

  'movistar.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" fill="none">
    <path d="M15 42C15 22 25 15 32 28C38 40 45 40 48 26C51 16 60 16 60 32C60 45 42 48 35 34" stroke="#00A9E0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="75" y="39" font-family="'Inter', system-ui, sans-serif" font-weight="700" font-size="26" fill="#0B2742">movistar</text>
  </svg>`,

  'danone.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" fill="none">
    <text x="10" y="38" font-family="'Arial', sans-serif" font-weight="900" font-size="30" fill="#005596" letter-spacing="1">DANONE</text>
    <path d="M10 46 C60 52, 130 52, 160 46" stroke="#ED1C24" stroke-width="4" stroke-linecap="round" fill="none"/>
  </svg>`,

  'pronaca.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" fill="none">
    <path d="M15 15 L35 30 L15 45 Z" fill="#E30613"/>
    <circle cx="42" cy="30" r="7" fill="#FFD100"/>
    <text x="60" y="38" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="24" fill="#002E6E" letter-spacing="1">PRONACA</text>
  </svg>`,

  'la-fabril.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" fill="none">
    <rect x="10" y="15" width="30" height="30" rx="6" fill="#009A44"/>
    <path d="M20 22 L30 30 L20 38" stroke="#FFFFFF" stroke-width="3" fill="none"/>
    <text x="50" y="37" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="22" fill="#004B23">LA FABRIL</text>
  </svg>`,

  'grupo-difare.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" fill="none">
    <circle cx="25" cy="30" r="16" fill="#005CA9"/>
    <path d="M20 30 H30 M25 25 V35" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    <text x="50" y="37" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="22" fill="#005CA9">DIFARE</text>
  </svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('Saved vector SVG logo:', filename);
}

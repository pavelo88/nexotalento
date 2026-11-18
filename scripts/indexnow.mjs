#!/usr/bin/env node
/**
 * Avisa a Bing (y a los buscadores que usan IndexNow: Yandex, Seznam, Naver)
 * de todas las URLs del sitemap de producción de NexoTalentos.
 * ChatGPT (SearchGPT) y Copilot buscan con el índice de Bing, por lo que
 * IndexNow indexa y cita los servicios de selección en cuestión de minutos.
 *
 * Uso:  npm run indexnow
 */
import fs from 'fs';
import path from 'path';

const HOST = 'www.nexotalento.com';
const KEY = '1d2998eb0bce3ac9a1ac143e67be90f0';
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function main() {
  try {
    let xml = '';
    try {
      const resSitemap = await fetch(SITEMAP);
      if (resSitemap.ok) {
        xml = await resSitemap.text();
      }
    } catch (e) {
      // Fallback a archivo local
    }

    if (!xml) {
      const localSitemapPath = path.resolve('public', 'sitemap.xml');
      if (fs.existsSync(localSitemapPath)) {
        xml = fs.readFileSync(localSitemapPath, 'utf8');
      }
    }

    const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
    
    if (urlList.length === 0) {
      console.error('[IndexNow] El sitemap no devolvió URLs.');
      process.exit(1);
    }

    console.log(`[IndexNow] Enviando ${urlList.length} URLs de NexoTalentos a Bing/IndexNow API...`);
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList,
      }),
    });

    if (res.ok) {
      console.log(`[IndexNow] Éxito: ${urlList.length} URLs notificadas a Bing e IAs asociadas (HTTP ${res.status}).`);
    } else {
      console.error(`[IndexNow] Error HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }
  } catch (err) {
    console.error('[IndexNow] Fallo de conexión:', err.message);
  }
}

main();

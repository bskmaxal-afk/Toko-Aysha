import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { products } from '../src/data/products.js';

async function main() {
  const lowQuality = [];

  for (const p of products) {
    const imgPath = p.image ? path.join('public', p.image.replace(/^\//, '')) : null;
    if (!imgPath || !fs.existsSync(imgPath)) continue;

    const stat = fs.statSync(imgPath);
    const meta = await sharp(imgPath).metadata();
    const aspect = meta.width / meta.height;
    const isSquare = Math.abs(aspect - 1) < 0.05;

    // Check criteria
    const isSmall = meta.width < 450 || meta.height < 450;
    const isNotSquare = !isSquare;
    const isTinyFile = stat.size < 20000;

    if (isSmall || isNotSquare || isTinyFile) {
      lowQuality.push({
        id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.image,
        width: meta.width,
        height: meta.height,
        ratio: aspect.toFixed(2),
        sizeKB: (stat.size / 1024).toFixed(1),
        reasons: [
          isSmall ? `small (${meta.width}x${meta.height})` : null,
          isNotSquare ? `non-square (${aspect.toFixed(2)})` : null,
          isTinyFile ? `tiny file (${(stat.size / 1024).toFixed(1)}KB)` : null
        ].filter(Boolean)
      });
    }
  }

  console.log(`Total low quality items: ${lowQuality.length}`);
  lowQuality.forEach(item => {
    console.log(`${item.id.padEnd(38)} | ${item.name.padEnd(45)} | ${item.image.padEnd(35)} | ${item.reasons.join(', ')}`);
  });
}

main().catch(console.error);

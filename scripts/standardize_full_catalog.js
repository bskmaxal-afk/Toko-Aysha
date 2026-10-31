import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { products } from '../src/data/products.js';

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadFile(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => stream.close(resolve));
    }).on('error', reject);
  });
}

async function getBoundingBox(imageBuffer) {
  const image = sharp(imageBuffer);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      let isContent = false;
      if (channels === 4) {
        const alpha = data[idx + 3];
        if (alpha > 20) isContent = true;
      } else {
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        if (r < 240 || g < 240 || b < 240) {
          isContent = true;
        }
      }
      if (isContent) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return { left: 0, top: 0, width, height };
  }

  const left = Math.max(0, minX - 2);
  const top = Math.max(0, minY - 2);
  const right = Math.min(width - 1, maxX + 2);
  const bottom = Math.min(height - 1, maxY + 2);

  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1
  };
}

async function processToStandard1024(inputBuffer, targetHeight = 720, targetWidthMax = 820) {
  const bbox = await getBoundingBox(inputBuffer);
  const cropped = sharp(inputBuffer).extract(bbox);

  const aspect = bbox.width / bbox.height;
  let newHeight = targetHeight;
  let newWidth = Math.round(targetHeight * aspect);

  if (newWidth > targetWidthMax) {
    newWidth = targetWidthMax;
    newHeight = Math.round(newWidth / aspect);
  }

  const resizedBuffer = await cropped
    .resize(newWidth, newHeight, { fit: 'contain' })
    .toBuffer();

  const left = Math.round((1024 - newWidth) / 2);
  const top = Math.round((1024 - newHeight) / 2);

  const finalImage = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  }).composite([
    {
      input: resizedBuffer,
      top,
      left
    }
  ])
  .png({ quality: 100 })
  .toBuffer();

  return finalImage;
}

const REPLACEMENT_SOURCES = {
  // Bamboe Series
  'bamboe-soto.jpg': 'https://cdn.webshopapp.com/shops/225503/files/473061615/image.jpg',
  'bamboe-rawon.jpg': 'https://cdn.webshopapp.com/shops/225503/files/370919273/image.jpg',
  'bamboe-semur.jpg': 'https://cdn.webshopapp.com/shops/225503/files/370916759/image.jpg',
  'bamboe-rendang.jpg': 'https://cdn.webshopapp.com/shops/225503/files/473061313/image.jpg',
  'bamboe-sop.jpg': 'https://cdn.webshopapp.com/shops/225503/files/343709054/image.jpg',
  'bamboe-sayur-asem.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457409325/image.jpg',
  'bamboe-opor.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457427645/image.jpg',
  'bamboe-nasi-goreng.jpg': 'https://cdn.webshopapp.com/shops/225503/files/370916290/image.jpg',
  'bamboe-lodeh.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457427656/image.jpg',
  'bamboe-gulai.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457427666/image.jpg',
  'bamboe-bali.jpg': 'https://cdn.webshopapp.com/shops/225503/files/370916988/image.jpg',
  'bamboe-ayam-goreng.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457427674/image.jpg',
  'bamboe-soto-daging.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457427630/image.jpg',

  // Dua Kuali & Indofood
  'dua-kuali-bumbu-lodeh.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457401761/image.jpg',
  'dua-kuali-lodeh.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457401761/image.jpg',
  'bumbu-racik-rendang.jpg': 'https://sesofoods.com/cdn/shop/files/indofood-racik-bumbu-spesial-rendang.jpg',
  'indofood-racik-rendang.jpg': 'https://sesofoods.com/cdn/shop/files/indofood-racik-bumbu-spesial-rendang.jpg',
  'Sambal-Uleg-Finna-Sambal-Terasi.png': 'https://cdn.webshopapp.com/shops/225503/files/394537605/image.jpg',

  // Sauces & Condiments
  'abc-sambal-pedas.jfif': 'https://cdn.webshopapp.com/shops/225503/files/465930958/image.jpg',
  'abc-sambal-pedas.jpg': 'https://cdn.webshopapp.com/shops/225503/files/465930958/image.jpg',
  'abc-kecap-asin.jpg': 'https://cdn.webshopapp.com/shops/225503/files/466005452/image.jpg',
  'abc-kecap.jpg': 'https://cdn.webshopapp.com/shops/225503/files/465930981/image.jpg',
  'bango-kecap-manis.jpg': 'https://cdn.webshopapp.com/shops/225503/files/466057697/image.jpg',

  // Snacks & Groceries
  'dua-kelinci-kacang-shanghai.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457413328/image.jpg',
  'kacang-shanghai.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457413328/image.jpg',
  'kobe-tepung-roti.jpg': 'https://cdn.webshopapp.com/shops/225503/files/465755862/image.jpg',
  'kara-can.jpg': 'https://cdn.webshopapp.com/shops/225503/files/449817159/image.jpg',
  'kara-uht.jpg': 'https://cdn.webshopapp.com/shops/225503/files/457402030/image.jpg',
  'marjan-boudoin-syrup-cocopandan.jpg': 'https://cdn.webshopapp.com/shops/225503/files/311758066/image.jpg'
};

async function main() {
  const publicDir = 'public/images/products';
  const distDir = 'dist/images/products';
  const hasDist = fs.existsSync(distDir);
  const scratchDir = 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch';

  console.log('--- Step 1: Downloading & Replacing Low-Res Product Images ---');
  for (const [filename, url] of Object.entries(REPLACEMENT_SOURCES)) {
    const tempFile = path.join(scratchDir, `hd_${filename}`);
    try {
      if (!fs.existsSync(tempFile)) {
        console.log(`Downloading HD packshot for ${filename}...`);
        await downloadFile(url, tempFile);
      }
      const rawBuf = fs.readFileSync(tempFile);
      const standardBuf = await processToStandard1024(rawBuf, 720, 800);

      const targetPub = path.join(publicDir, filename);
      fs.writeFileSync(targetPub, standardBuf);
      if (hasDist) {
        fs.writeFileSync(path.join(distDir, filename), standardBuf);
      }
      console.log(`  ✓ Updated ${filename} (1024x1024)`);
    } catch (err) {
      console.error(`  ✗ Error updating ${filename}:`, err.message);
    }
  }

  console.log('\n--- Step 2: Standardizing All Catalog Images to 1024x1024 Canvas ---');
  let count = 0;
  for (const p of products) {
    if (!p.image) continue;
    const cleanName = path.basename(p.image);
    const pubPath = path.join(publicDir, cleanName);

    if (!fs.existsSync(pubPath)) continue;

    try {
      const rawBuf = fs.readFileSync(pubPath);
      const meta = await sharp(rawBuf).metadata();
      const isAlready1024 = meta.width === 1024 && meta.height === 1024;

      if (!isAlready1024 || Math.abs(meta.width - meta.height) > 10) {
        const stdBuf = await processToStandard1024(rawBuf, 720, 820);
        fs.writeFileSync(pubPath, stdBuf);
        if (hasDist) {
          fs.writeFileSync(path.join(distDir, cleanName), stdBuf);
        }
        count++;
        console.log(`  ✓ Standardized (${count}): ${cleanName}`);
      }
    } catch (e) {
      console.error(`  ✗ Error processing ${cleanName}:`, e.message);
    }
  }

  console.log(`\nSuccessfully standardized ${count} additional product images!`);
  console.log('All catalog images are now 1024x1024 on solid white background.');
}

main().catch(console.error);

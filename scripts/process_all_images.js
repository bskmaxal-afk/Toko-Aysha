import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Helper to find tight content bounding box (ignoring near-white or transparent pixels)
async function getBoundingBox(inputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      let isContent = false;
      if (channels === 4) {
        const alpha = data[idx + 3];
        if (alpha > 25) isContent = true;
      } else {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        // non-white pixel
        if (r < 242 || g < 242 || b < 242) {
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

  // Safety fallback if entire image is white
  if (maxX < minX || maxY < minY) {
    return { left: 0, top: 0, width, height };
  }

  // Add 2px margin if available
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

/**
 * Standardize an item onto a 1024x1024 pure white canvas.
 * targetHeight: target pixel height of the item on canvas (e.g. 720 for cups, 560 for packets).
 * targetWidthMax: max width constraint to avoid clipping wide items.
 */
async function standardizeItem(inputPath, targetHeight, targetWidthMax = 820) {
  const bbox = await getBoundingBox(inputPath);
  
  // 1. Crop to bounding box
  const cropped = sharp(inputPath).extract(bbox);

  // 2. Resize maintaining aspect ratio
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

  // 3. Composite onto 1024x1024 white canvas
  const left = Math.round((1024 - newWidth) / 2);
  const top = Math.round((1024 - newHeight) / 2);

  const finalImage = sharp({
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
  ]);

  return finalImage;
}

async function saveImageVariants(sharpInstance, baseDir, fileNames) {
  // Generate PNG buffer and JPEG buffer
  const pngBuf = await sharpInstance.png({ quality: 100, compressionLevel: 9 }).toBuffer();
  const jpgBuf = await sharpInstance.jpeg({ quality: 95 }).toBuffer();
  const webpBuf = await sharpInstance.webp({ quality: 95 }).toBuffer();

  for (const name of fileNames) {
    const p = path.join(baseDir, name);
    const ext = path.extname(name).toLowerCase();
    if (ext === '.png') {
      fs.writeFileSync(p, pngBuf);
    } else if (ext === '.webp') {
      fs.writeFileSync(p, webpBuf);
    } else {
      // .jpg or .jfif
      fs.writeFileSync(p, jpgBuf);
    }
    console.log(`Saved: ${p} (${fs.statSync(p).size} bytes)`);
  }
}

async function run() {
  const outDir = 'public/images/products';
  const distDir = 'dist/images/products';
  const hasDist = fs.existsSync(distDir);

  console.log('--- Processing ABC President Products ---');
  const abcItems = [
    {
      name: 'ABC Cup Onion Chicken (#6940)',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/abc_cup_ayam_bawang_1793376138257.jpg',
      height: 720,
      files: ['abc-cup-onion-chicken-6940.png', 'abc-mie-cup-ayam-bawang.jfif', 'abc-cup-onion-chicken.jpg']
    },
    {
      name: 'ABC Cup Soto Ayam (#6941)',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/abc_cup_soto_ayam_1793376113224.jpg',
      height: 720,
      files: ['abc-cup-soto-6941.png', 'abc-mie-cup-soto.jfif', 'abc-cup-soto.jpg']
    },
    {
      name: 'ABC Cup Beef (#6942)',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/mi_abc_cup_baso_sapi_1793376160975.jpg',
      height: 720,
      files: ['abc-cup-beef-6942.png', 'abc-mie-cup-daging-sapi.webp', 'abc-cup-beef.jpg']
    },
    {
      name: 'ABC Cup Curry (#6944)',
      input: 'test_curry_yoline.png',
      height: 720,
      files: ['abc-cup-curry-6944.png', 'Abc-mie-cup-Curry.jfif', 'abc-cup-curry.jpg']
    },
    {
      name: 'ABC Cup Mi Goreng (#6945)',
      input: 'test_migoreng_cup.jpg',
      height: 720,
      files: ['abc-cup-mi-goreng-6945.png', 'abc-cup-mie-goreng.jfif', 'abc-cup-mi-goreng.jpg']
    },
    {
      name: 'ABC Mi Goreng Packet (#6950)',
      input: 'test_migoreng_packet.jpg',
      height: 560,
      widthMax: 780,
      files: ['abc-noodle-mi-goreng-6950.png', 'abc-mie-goreng.webp', 'abc-noodle-mi-goreng.jpg']
    },
    {
      name: 'ABC Selera Pedas Packet (#6951)',
      input: 'test_abc_prod1.png',
      height: 560,
      widthMax: 780,
      files: ['abc-selera-pedas-6951.png', 'abc-mie-pedas.jfif', 'abc-mie-pedas-selera.jfif']
    }
  ];

  for (const item of abcItems) {
    console.log(`Processing ${item.name}...`);
    const std = await standardizeItem(item.input, item.height, item.widthMax || 820);
    await saveImageVariants(std, outDir, item.files);
    if (hasDist) {
      await saveImageVariants(std, distDir, item.files);
    }
  }

  console.log('\n--- Processing Aroy-D Curry Pastes ---');
  const aroyItems = [
    {
      name: 'Aroy-D Yellow Curry Paste',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch/aroy_yellow.png',
      height: 720,
      files: ['aroy-d-yellow-curry.jpg', 'aroy-d-yellow-curry.png']
    },
    {
      name: 'Aroy-D Massaman Curry Paste',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch/aroy_massaman.png',
      height: 720,
      files: ['aroy-d-massaman.jpg', 'aroy-d-massaman.png']
    },
    {
      name: 'Aroy-D Tom Yum Paste',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch/aroy_tomyum.png',
      height: 720,
      files: ['aroy-d-tom-yum.jpg', 'aroy-d-tom-yum.png']
    },
    {
      name: 'Aroy-D Red Curry Paste',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch/aroy_red.png',
      height: 720,
      files: ['aroy-d-red-curry.jpg', 'aroy-d-red-curry.png']
    },
    {
      name: 'Aroy-D Panang Curry Paste',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch/aroy_panang.png',
      height: 720,
      files: ['aroy-d-panang.jpg', 'aroy-d-panang.png']
    },
    {
      name: 'Aroy-D Green Curry Paste',
      input: 'C:/Users/Maxam/.gemini/antigravity/brain/e3ab7606-6200-4e2b-9313-ce293eec2de0/scratch/aroy_green.png',
      height: 720,
      files: ['aroy-d-green-curry.jpg', 'aroy-d-green-curry.png']
    }
  ];

  for (const item of aroyItems) {
    console.log(`Processing ${item.name}...`);
    const std = await standardizeItem(item.input, item.height);
    await saveImageVariants(std, outDir, item.files);
    if (hasDist) {
      await saveImageVariants(std, distDir, item.files);
    }
  }

  console.log('\nAll images processed and standardized successfully!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

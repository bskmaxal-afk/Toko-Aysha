import fs from 'fs';
import { products } from '../src/data/products.js';

const tjins = JSON.parse(fs.readFileSync('scripts/tjins_catalog.json'));

function cleanStr(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, ' ');
}

const matches = [];

for (const p of products) {
  const pName = cleanStr(p.name);
  const pBrand = cleanStr(p.brand);

  // find best candidate in tjins
  let best = null;
  let bestScore = 0;

  for (const t of tjins) {
    const tTitle = cleanStr(t.title);
    const tBrand = cleanStr(t.brand);

    if (tBrand.includes(pBrand) || pBrand.includes(tBrand)) {
      // Calculate token overlap
      const pTokens = pName.split(/\s+/).filter(w => w.length > 2);
      const tTokens = tTitle.split(/\s+/).filter(w => w.length > 2);
      let matchCount = 0;
      for (const pt of pTokens) {
        if (tTokens.includes(pt)) matchCount++;
      }
      const score = matchCount / Math.max(pTokens.length, 1);
      if (score > bestScore && score >= 0.4) {
        bestScore = score;
        best = t;
      }
    }
  }

  if (best) {
    matches.push({
      id: p.id,
      name: p.name,
      currentImg: p.image,
      tjinsTitle: best.title,
      tjinsUrl: best.fullUrl,
      score: bestScore
    });
  }
}

console.log(`Matched ${matches.length} products from Tjin's catalog!`);
matches.forEach(m => {
  console.log(`${m.id.padEnd(35)} -> ${m.tjinsTitle.padEnd(45)} (${m.tjinsUrl})`);
});

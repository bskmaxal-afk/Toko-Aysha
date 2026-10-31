import https from 'https';

export function fetchBrand(brand) {
  return new Promise((resolve, reject) => {
    const url = `https://www.tjinstoko.eu/en/brands/${brand}/`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let h = '';
      res.on('data', c => h += c);
      res.on('end', () => {
        const matches = [...new Set(h.match(/https:\/\/cdn\.webshopapp\.com\/shops\/225503\/files\/[0-9]+\/[^"'\s]+\.jpg/gi) || [])];
        resolve(matches);
      });
    }).on('error', reject);
  });
}

async function run() {
  const brand = process.argv[2] || 'marjan';
  console.log(`Checking brand: ${brand}`);
  const imgs = await fetchBrand(brand);
  console.log(`Found ${imgs.length} images for ${brand}:`);
  imgs.forEach(m => console.log(m));
}

run();

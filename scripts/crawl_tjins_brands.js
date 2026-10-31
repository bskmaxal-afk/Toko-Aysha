import https from 'https';
import fs from 'fs';

function getBrandPage(brand) {
  return new Promise((resolve) => {
    const url = `https://www.tjinstoko.eu/en/brands/${brand}/`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let h = '';
      res.on('data', c => h += c);
      res.on('end', () => {
        // extract products
        const results = [];
        // Matches like: <a class="title" href="..." title="...">Product Title</a> ... <img ... src="https://cdn.webshopapp.com/shops/225503/files/XXXXX/...jpg"
        const prodRegex = /<div class="product-item[^"]*"[\s\S]*?<\/div>\s*<\/div>/g;
        // Or generic regex for image and title
        const itemRegex = /<img[^>]+src="(https:\/\/cdn\.webshopapp\.com\/shops\/225503\/files\/(\d+)\/[^"]+)"[^>]+alt="([^"]+)"/g;
        let m;
        while ((m = itemRegex.exec(h)) !== null) {
          const imgUrl = m[1];
          const fileId = m[2];
          const title = m[3];
          if (!imgUrl.includes('100x100')) {
            // full resolution clean URL: https://cdn.webshopapp.com/shops/225503/files/ID/image.jpg
            const fullUrl = `https://cdn.webshopapp.com/shops/225503/files/${fileId}/image.jpg`;
            results.push({ brand, title, fullUrl, origUrl: imgUrl });
          }
        }
        resolve(results);
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  const targetBrands = [
    'bamboe', 'bango', 'boncabe', 'dua-kuali', 'dua-kelinci',
    'finna', 'garuda', 'indomie', 'kara', 'kobe', 'marjan',
    'mie-sedaap', 'royco', 'abc'
  ];

  const allProducts = [];
  for (const b of targetBrands) {
    console.log(`Fetching ${b}...`);
    const prods = await getBrandPage(b);
    allProducts.push(...prods);
  }

  console.log(`Total collected: ${allProducts.length}`);
  fs.writeFileSync('scripts/tjins_catalog.json', JSON.stringify(allProducts, null, 2));
}

main();

import https from 'https';

function searchTjins(query) {
  return new Promise((resolve) => {
    const url = `https://www.tjinstoko.eu/en/search/${encodeURIComponent(query)}/`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let h = '';
      res.on('data', c => h += c);
      res.on('end', () => {
        const itemRegex = /<img[^>]+src="(https:\/\/cdn\.webshopapp\.com\/shops\/225503\/files\/(\d+)\/[^"]+)"[^>]+alt="([^"]+)"/g;
        const results = [];
        let m;
        while ((m = itemRegex.exec(h)) !== null) {
          const imgUrl = m[1];
          const fileId = m[2];
          const title = m[3];
          if (!imgUrl.includes('100x100')) {
            const fullUrl = `https://cdn.webshopapp.com/shops/225503/files/${fileId}/image.jpg`;
            results.push({ query, title, fullUrl });
          }
        }
        resolve(results);
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const queries = [
    'indofood rendang',
    'rose brand',
    'teh botol',
    'desaku',
    'asam jawa',
    'marjan',
    'gudeg bu tjitro',
    'garuda rosta',
    'kusuka singkong'
  ];

  for (const q of queries) {
    const prods = await searchTjins(q);
    console.log(`=== Query: "${q}" (${prods.length} results) ===`);
    prods.slice(0, 3).forEach(p => console.log(`  - ${p.title} -> ${p.fullUrl}`));
  }
}

run();

import https from 'https';

export function searchWebshop(query) {
  return new Promise((resolve, reject) => {
    const url = `https://www.orientalwebshop.nl/en/catalogsearch/result/?q=${encodeURIComponent(query)}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const results = [];
        // Extract product items
        const regex = /<img[^>]+class="[^"]*product-image-photo[^"]*"[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
          results.push({ name: match[2], image: match[1] });
        }
        resolve(results);
      });
    }).on('error', reject);
  });
}

async function run() {
  const q = process.argv[2] || 'bamboe bumbu';
  console.log(`Searching: ${q}...`);
  const res = await searchWebshop(q);
  console.log(`Found ${res.length} items:`);
  res.slice(0, 15).forEach(r => console.log(`- ${r.name}: ${r.image}`));
}

run();

import https from 'https';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchPage(res.headers.location));
      }
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetchPage('https://www.tjinstoko.eu/en/brands/bamboe/');
    const regex = /https:\/\/[^"']+\.(jpg|jpeg|png|webp)/gi;
    const matches = [...new Set(html.match(regex) || [])];
    console.log('Found', matches.length, 'images:');
    matches.filter(m => m.includes('products') || m.includes('files')).forEach(m => console.log(m));
  } catch (err) {
    console.error(err);
  }
}

run();

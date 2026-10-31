import https from 'https';

https.get('https://www.orientalwebshop.nl/en/catalogsearch/result/?q=bamboe', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Length:', html.length);
    const matches = html.match(/https:\/\/[^"']+\/media\/catalog\/product\/[^"']+/g) || [];
    console.log('Product image matches:', [...new Set(matches)].slice(0, 10));
  });
});

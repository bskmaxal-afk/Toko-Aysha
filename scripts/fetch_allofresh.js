import https from 'https';

https.get('https://allofresh.id/product/sajiku-bumbu-capcay-20-g-15509', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let h = '';
  res.on('data', c => h += c);
  res.on('end', () => {
    const matches = h.match(/https:\/\/[^"'\s]+\.(jpg|jpeg|png|webp)/gi) || [];
    console.log('Matches:', [...new Set(matches)].slice(0, 5));
  });
});

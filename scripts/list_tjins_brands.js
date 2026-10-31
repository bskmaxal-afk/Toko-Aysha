import https from 'https';

https.get('https://www.tjinstoko.eu/en/brands/', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let h = '';
  res.on('data', c => h += c);
  res.on('end', () => {
    const brandMatches = h.match(/href="https:\/\/www\.tjinstoko\.eu\/en\/brands\/([^"/]+)\/"/g) || [];
    const brands = [...new Set(brandMatches.map(m => m.match(/\/brands\/([^"/]+)\//)[1]))];
    console.log('Total brands found:', brands.length);
    console.log(brands.filter(b => /abc|indomie|bamboe|kokita|kara|sosro|marjan|sedaap|dua|garuda|chitato|tango|sariwangi|finna|boncabe|bango|sasa|royco|masako|kobe/i.test(b)));
  });
});

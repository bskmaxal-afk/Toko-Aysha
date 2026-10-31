import https from 'https';

https.get('https://jni.co.id', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let h = '';
  res.on('data', c => h += c);
  res.on('end', () => {
    const matches = [...new Set(h.match(/https?:\/\/[^"'\s]+\.(png|jpg|jpeg|webp)/gi) || [])];
    console.log('JNI images count:', matches.length);
    matches.filter(m => /desaku|ketumbar|kunyit/i.test(m)).forEach(m => console.log(m));
  });
});

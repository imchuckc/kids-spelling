const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'static', 'word-images');
const TARGET_WIDTH = 400; // 400px wide is enough for flashcard display

async function compress() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));
  let totalBefore = 0, totalAfter = 0;

  for (const file of files) {
    const fp = path.join(DIR, file);
    const stat = fs.statSync(fp);
    totalBefore += stat.size;

    try {
      const buf = await sharp(fp)
        .resize(TARGET_WIDTH, TARGET_WIDTH, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();

      fs.writeFileSync(fp, buf);
      totalAfter += buf.length;
      console.log(`${file}: ${Math.round(stat.size/1024)}KB -> ${Math.round(buf.length/1024)}KB`);
    } catch (e) {
      console.error(`FAIL ${file}: ${e.message}`);
      totalAfter += stat.size;
    }
  }

  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB`);
}

compress();

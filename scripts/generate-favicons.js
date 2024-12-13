import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import toIco from 'to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = {
  favicon: { size: 32, name: 'favicon.png' },
  favicon16: { size: 16, name: 'favicon-16x16.png' },
  favicon32: { size: 32, name: 'favicon-32x32.png' },
  apple: { size: 180, name: 'apple-touch-icon.png' },
  android192: { size: 192, name: 'android-chrome-192x192.png' },
  android512: { size: 512, name: 'android-chrome-512x512.png' }
};

async function generateFavicons() {
  const inputPath = path.join(__dirname, '../src/assets/favicon.png');
  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  // Process each size
  for (const [key, config] of Object.entries(sizes)) {
    await sharp(inputPath)
      .resize(config.size, config.size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, config.name));
    
    console.log(`Generated ${config.name}`);
  }

  // Generate favicon.ico from 16x16 and 32x32 PNGs
  try {
    const png16 = await fs.readFile(path.join(publicDir, 'favicon-16x16.png'));
    const png32 = await fs.readFile(path.join(publicDir, 'favicon-32x32.png'));
    
    const ico = await toIco([png16, png32]);
    await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico);
    
    console.log('Generated favicon.ico');
  } catch (error) {
    console.error('Error generating favicon.ico:', error);
  }
}

generateFavicons().catch(console.error);

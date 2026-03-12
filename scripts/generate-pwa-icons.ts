import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const SOURCE = path.resolve('public/images/EDM_logo_Blue.webp');
const OUT_DIR = path.resolve('public/icons');

// Ensure output directory exists
fs.mkdirSync(OUT_DIR, { recursive: true });

const STANDARD_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const MASKABLE_SIZES = [192, 512];
const BRAND_COLOR = { r: 0, g: 74, b: 143 }; // #004A8F

async function generateIcons() {
  // Standard icons (transparent background)
  for (const size of STANDARD_SIZES) {
    await sharp(SOURCE)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUT_DIR, `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }

  // Maskable icons (logo at 70% on brand color background)
  for (const size of MASKABLE_SIZES) {
    const logoSize = Math.round(size * 0.7);
    const logo = await sharp(SOURCE)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { ...BRAND_COLOR, alpha: 1 },
      },
    })
      .composite([{ input: logo, gravity: 'centre' }])
      .png()
      .toFile(path.join(OUT_DIR, `maskable-icon-${size}x${size}.png`));
    console.log(`Generated maskable-icon-${size}x${size}.png`);
  }

  // Apple touch icon (180x180, white background, no transparency)
  await sharp(SOURCE)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  console.log('\nAll PWA icons generated successfully.');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const svgFavicon = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E6A8"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#997D20"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E1320"/>
      <stop offset="100%" stop-color="#070A12"/>
    </linearGradient>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)" />
  <rect x="8" y="8" width="496" height="496" rx="120" stroke="url(#goldGrad)" stroke-width="14" fill="none" opacity="0.6"/>

  <!-- Glowing core dot -->
  <circle cx="410" cy="102" r="22" fill="#D4AF37" />
  <circle cx="410" cy="102" r="36" stroke="#D4AF37" stroke-width="6" fill="none" opacity="0.4" />

  <!-- Monogram "SP" -->
  <text x="256" y="330" font-family="'Sora', 'Orbitron', 'Inter', -apple-system, sans-serif" font-size="240" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="-6">SP</text>
</svg>`;

async function buildFavicons() {
  const root = process.cwd();
  const publicDir = path.join(root, 'public');

  // 1. Write SVG favicon
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgFavicon, 'utf8');
  console.log('✓ Wrote', svgPath);

  // 2. Generate PNG favicons
  const svgBuffer = Buffer.from(svgFavicon);

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated public/favicon-32x32.png');

  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ Generated public/favicon-16x16.png');

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated public/apple-touch-icon.png');
}

buildFavicons().catch(console.error);

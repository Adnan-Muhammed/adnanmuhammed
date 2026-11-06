import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const widths = [400, 800, 1200];

async function getFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImages() {
  const root = process.cwd();
  const imagesDir = path.join(root, 'public', 'images');

  console.log('Scanning images in:', imagesDir);
  const allFiles = await getFiles(imagesDir);

  const targetExts = new Set(['.jpg', '.jpeg', '.png']);
  const imagesToProcess = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return targetExts.has(ext) && !f.includes('-400w') && !f.includes('-800w') && !f.includes('-1200w');
  });

  console.log(`Found ${imagesToProcess.length} source images to optimize into WebP.`);

  let totalSavedBytes = 0;

  for (const file of imagesToProcess) {
    const parsed = path.parse(file);
    const origStat = fs.statSync(file);
    const img = sharp(file);
    const meta = await img.metadata();

    // 1. Generate full-resolution WebP
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
    await sharp(file)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    const saved = origStat.size - webpStat.size;
    if (saved > 0) totalSavedBytes += saved;

    console.log(
      `✓ ${parsed.base} (${(origStat.size / 1024).toFixed(1)} KB) -> ${parsed.name}.webp (${(webpStat.size / 1024).toFixed(1)} KB)`
    );

    // 2. Generate responsive variants (400w, 800w, 1200w) for large display images
    for (const w of widths) {
      if (meta.width && meta.width >= w) {
        const variantPath = path.join(parsed.dir, `${parsed.name}-${w}w.webp`);
        await sharp(file)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 80, effort: 4 })
          .toFile(variantPath);
      }
    }
  }

  console.log(`\nImage optimization complete! Saved ~${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB in image payload.`);

  // 3. Create 1200x630 Open Graph Social Share Card (og-image.jpg)
  console.log('\nGenerating 1200x630 Open Graph Social Card (public/og-image.jpg)...');
  await generateOgImage(root);
}

async function generateOgImage(root) {
  const ogPath = path.join(root, 'public', 'og-image.jpg');
  const photoPath = path.join(root, 'public', 'images', 'about', 'shamseer-photo.jpg');

  const width = 1200;
  const height = 630;

  // Render SVG text overlay
  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F5E6A8"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#997D20"/>
        </linearGradient>
        <radialGradient id="halo" cx="30%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#070A12" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Background Dark Ink -->
      <rect width="${width}" height="${height}" fill="#070A12" />
      <rect width="${width}" height="${height}" fill="url(#halo)" />

      <!-- Subtle Gold Border Frame -->
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="rgba(212, 175, 55, 0.3)" stroke-width="2" />

      <!-- Top Badge -->
      <g transform="translate(80, 100)">
        <rect width="280" height="36" rx="18" fill="#0E1320" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1"/>
        <circle cx="22" cy="18" r="5" fill="#10B981" />
        <text x="36" y="23" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#F5E6A8" letter-spacing="1.5">
          QATAR · UAE · WORLDWIDE
        </text>
      </g>

      <!-- Main Name -->
      <text x="80" y="230" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
        Shamseer PC
      </text>

      <!-- Role / Specialty -->
      <text x="80" y="285" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="bold" fill="url(#goldGrad)" letter-spacing="0.5">
        Full-Stack MERN Developer &amp; Creative Director
      </text>

      <!-- Tagline -->
      <text x="80" y="360" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#9AA4BC">
        Engineering scalable web applications &amp; high-impact commercial brand visuals
      </text>
      <text x="80" y="395" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#9AA4BC">
        for enterprises and luxury agencies across the GCC and internationally.
      </text>

      <!-- Highlights / Client Trust -->
      <g transform="translate(80, 480)">
        <rect x="0" y="0" width="140" height="42" rx="12" fill="#0E1320" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Value FM 🇶🇦</text>

        <rect x="155" y="0" width="175" height="42" rx="12" fill="#0E1320" stroke="rgba(255,255,255,0.1)"/>
        <text x="175" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Al Shareef Holding</text>

        <rect x="345" y="0" width="130" height="42" rx="12" fill="#0E1320" stroke="rgba(255,255,255,0.1)"/>
        <text x="365" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Moestay</text>

        <rect x="490" y="0" width="165" height="42" rx="12" fill="#0E1320" stroke="rgba(255,255,255,0.1)"/>
        <text x="505" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">MyThoughtsHub</text>
      </g>
    </svg>
  `;

  // Prepare rounded portrait photo (circle crop)
  let portraitComposite = [];
  if (fs.existsSync(photoPath)) {
    const portraitSize = 380;
    const circleMask = Buffer.from(`
      <svg width="${portraitSize}" height="${portraitSize}">
        <circle cx="${portraitSize / 2}" cy="${portraitSize / 2}" r="${portraitSize / 2}" fill="#fff"/>
      </svg>
    `);

    const circularPortrait = await sharp(photoPath)
      .resize(portraitSize, portraitSize, { fit: 'cover', position: 'top' })
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    portraitComposite = [
      {
        input: circularPortrait,
        top: 125,
        left: 750,
      },
    ];
  }

  // Compose final social card
  await sharp(Buffer.from(svgOverlay))
    .composite(portraitComposite)
    .jpeg({ quality: 90 })
    .toFile(ogPath);

  const ogStat = fs.statSync(ogPath);
  console.log(`Open Graph image created: ${ogPath} (${(ogStat.size / 1024).toFixed(1)} KB)`);
}

optimizeImages().catch((err) => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});

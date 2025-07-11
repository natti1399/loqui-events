const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(publicDir, 'optimized');

console.log('Starting image optimization...');
console.log('Public dir:', publicDir);
console.log('Output dir:', outputDir);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created output directory');
}

// List of images to optimize
const images = [
  'Loqui events logo.jpg',
  'Apple_Pay-Logo.wine.png',
  'Portrett bilde, Sandra.jpg',
  '20241114_180846.jpg',
  'image2.jpeg',
  '20240816_190922.jpg'
];

async function optimizeImages() {
  for (const image of images) {
    const inputPath = path.join(publicDir, image);
    const outputName = path.parse(image).name + '.webp';
    const outputPath = path.join(outputDir, outputName);
    
    console.log(`Processing: ${image}`);
    console.log(`Input: ${inputPath}`);
    console.log(`Output: ${outputPath}`);
    
    try {
      if (fs.existsSync(inputPath)) {
        console.log(`File exists, converting...`);
        
        // Convert to WebP with quality 85 and resize if too large
        await sharp(inputPath)
          .resize(1200, 800, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .webp({ quality: 85 })
          .toFile(outputPath);
        
        console.log(`✓ Optimized: ${image} -> ${outputName}`);
        
        // Get file sizes for comparison
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        console.log(`  Size: ${(originalSize/1024).toFixed(1)}KB -> ${(optimizedSize/1024).toFixed(1)}KB (${savings}% reduction)`);
      } else {
        console.log(`⚠ File not found: ${inputPath}`);
      }
    } catch (error) {
      console.error(`✗ Error optimizing ${image}:`, error.message);
      console.error(error.stack);
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

optimizeImages().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
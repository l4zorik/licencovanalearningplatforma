import fs from 'fs';
import path from 'path';
import https from 'https';
import { ARTICLE_IMAGES, ImageMetadata } from './articleImagesData';

// Function to download image from URL to local storage
export async function downloadImage(
  url: string,
  localPath: string,
  filename: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(localPath, filename);
    const file = fs.createWriteStream(fullPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(fullPath, () => {});
      reject(err);
    });
  });
}

// Batch download images for an article
export async function downloadArticleImages(
  articleId: string,
  baseUrl: string,
  outputDir: string
): Promise<void> {
  const images = ARTICLE_IMAGES[articleId];
  if (!images) {
    console.log(`No images configured for article: ${articleId}`);
    return;
  }
  
  // Ensure directory exists
  const articleDir = path.join(outputDir, articleId);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }
  
  // Download each image
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (image.externalUrl) {
      try {
        const ext = image.format;
        const filename = `${articleId}-${i}.${ext}`;
        await downloadImage(image.externalUrl, articleDir, filename);
      } catch (error) {
        console.error(`Failed to download image ${i}:`, error);
      }
    }
  }
}

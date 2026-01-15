#!/usr/bin/env node

/**
 * Article Image Downloader Script
 * 
 * Usage:
 *   node scripts/download-article-images.js [--article=article-id]
 * 
 * Downloads all configured images for articles to public/images/articles/
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { ARTICLE_IMAGES } from '../src/utils/articleImagesData';

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'articles');

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadArticleImages(articleId: string): Promise<void> {
  const images = ARTICLE_IMAGES[articleId];
  if (!images || images.length === 0) {
    console.log(`No images for article: ${articleId}`);
    return;
  }
  
  const articleDir = path.join(PUBLIC_DIR, articleId);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
    console.log(`Created directory: ${articleId}/`);
  }
  
  let downloaded = 0;
  let failed = 0;
  
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    
    // Try external URL first, then fallback to placeholder
    let url = image.externalUrl;
    if (!url) {
      console.log(`⚠ No external URL for ${articleId}[${i}], skipping`);
      continue;
    }
    
    const ext = image.format;
    const filename = `${articleId}-${i}.${ext}`;
    const filepath = path.join(articleDir, filename);
    
    try {
      await downloadImage(url, filepath);
      downloaded++;
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\n${articleId}: ${downloaded} downloaded, ${failed} failed`);
}

async function main() {
  const args = process.argv.slice(2);
  const articleArg = args.find(arg => arg.startsWith('--article='));
  
  console.log('Article Image Downloader');
  console.log('========================\n');
  
  if (articleArg) {
    const articleId = articleArg.split('=')[1];
    await downloadArticleImages(articleId);
  } else {
    // Download all article images
    const articleIds = Object.keys(ARTICLE_IMAGES);
    console.log(`Found ${articleIds.length} articles with images\n`);
    
    for (const articleId of articleIds) {
      await downloadArticleImages(articleId);
      console.log('');
    }
    
    console.log('✓ All article images downloaded!');
  }
}

main().catch(console.error);

export { downloadImage, downloadArticleImages };

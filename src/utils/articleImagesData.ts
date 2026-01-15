/**
 * Article Images Data Configuration (Client Safe)
 */

export interface ImageMetadata {
  url: string;
  localPath?: string;
  externalUrl?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  format: 'jpg' | 'png' | 'webp' | 'gif';
}

// Default article image paths mapping
export const ARTICLE_IMAGES: Record<string, ImageMetadata[]> = {
  'humanoidni-roboty-2026': [
    {
      url: '/images/articles/humanoidni-roboty-2026/figure-02.jpg',
      alt: 'Figure 02 humanoid robot',
      caption: 'Figure 02 od Figure AI - jeden z nejpokročilejších humanoidních robotů',
      format: 'jpg'
    },
    {
      url: '/images/articles/humanoidni-roboty-2026/atlas.jpg',
      alt: 'Boston Dynamics Atlas',
      caption: 'Elektrický Atlas od Boston Dynamics při parkouru',
      format: 'jpg'
    },
    {
      url: '/images/articles/humanoidni-roboty-2026/optimus.jpg',
      alt: 'Tesla Optimus',
      caption: 'Tesla Optimus - cílem je cena pod 20,000 USD',
      format: 'jpg'
    },
    {
      url: '/images/articles/humanoidni-roboty-2026/digit.jpg',
      alt: 'Agility Robotics Digit',
      caption: 'Digit od Agility Robotics v Amazon fulfillment centru',
      format: 'jpg'
    },
    {
      url: '/images/articles/humanoidni-roboty-2026/neo.jpg',
      alt: '1X Technologies NEO',
      caption: 'NEO od 1X Technologies - robot pro bezpečnostní aplikace',
      format: 'jpg'
    }
  ],
  'mcp-model-context-protocol': [
    {
      url: '/images/articles/mcp-model-context-protocol/mcp-architektura.png',
      alt: 'MCP Architecture Diagram',
      caption: 'Architektura Model Context Protocol',
      format: 'png'
    },
    {
      url: '/images/articles/mcp-model-context-protocol/mcp-flow.png',
      alt: 'MCP Communication Flow',
      caption: 'Průběh komunikace v MCP',
      format: 'png'
    },
    {
      url: '/images/articles/mcp-model-context-protocol/mcp-ekosystem.png',
      alt: 'MCP Ecosystem',
      caption: 'Ekosystém MCP a dostupné servery',
      format: 'png'
    }
  ]
};

// Function to get image for specific article section
export function getArticleSectionImage(articleId: string, sectionIndex: number): ImageMetadata | null {
  const images = ARTICLE_IMAGES[articleId];
  if (!images || !images[sectionIndex]) {
    return null;
  }
  return images[sectionIndex];
}

// Function to get all images for an article
export function getArticleImages(articleId: string): ImageMetadata[] {
  return ARTICLE_IMAGES[articleId] || [];
}

// Configuration for article images (placeholders for external URLs)
export const IMAGE_PLACEHOLDERS: Record<string, Record<number, string>> = {
  'humanoidni-roboty-2026': {
    0: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', // Robot
    1: 'https://images.unsplash.com/photo-1504253163759-c23fcc6126cb?w=800&q=80', // Technology
    2: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // AI/Chip
    3: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80', // Automation
    4: 'https://images.unsplash.com/photo-1535378437268-276965179b8e?w=800&q=80'  // Future tech
  },
  'mcp-model-context-protocol': {
    0: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // AI
    1: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', // Tech
    2: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'   // Network
  }
};

// Get placeholder image URL
export function getPlaceholderImage(articleId: string, sectionIndex: number): string {
  const placeholders = IMAGE_PLACEHOLDERS[articleId];
  if (placeholders && placeholders[sectionIndex]) {
    return placeholders[sectionIndex];
  }
  return '/images/placeholder.svg';
}

export function generateImageComponent(
  src: string,
  alt: string,
  caption?: string,
  className?: string
): string {
  return `
<figure class="${className || 'article-image'}">
  <img 
    src="${src}" 
    alt="${alt}"
    loading="lazy"
    decoding="async"
  />
  ${caption ? `<figcaption>${caption}</figcaption>` : ''}
</figure>
`;
}

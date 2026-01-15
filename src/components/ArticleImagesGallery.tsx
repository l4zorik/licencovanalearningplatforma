"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { ARTICLE_IMAGES, getPlaceholderImage } from '@/utils/articleImagesData';

interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
  format: string;
}

interface ArticleImagesGalleryProps {
  articleId: string;
  showGallery?: boolean;
  className?: string;
}

export default function ArticleImagesGallery({ 
  articleId, 
  showGallery = false,
  className = '' 
}: ArticleImagesGalleryProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ArticleImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: ArticleImage[] = ARTICLE_IMAGES[articleId] || [];

  if (images.length === 0) {
    return null;
  }

  const handleImageClick = (image: ArticleImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setSelectedImage(images[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setSelectedImage(images[currentIndex]);
  };

  return (
    <>
      <div className={`article-images-gallery ${className}`}>
        <h3 className="gallery-title">📷 Galerie obrázků</h3>
        <Row className="g-3">
          {images.slice(0, showGallery ? undefined : 4).map((image, index) => (
            <Col 
              key={index} 
              xs={showGallery ? 6 : 6} 
              md={showGallery ? 4 : 3}
              lg={showGallery ? 3 : 2}
            >
              <div 
                className="image-wrapper"
                onClick={() => handleImageClick(image, index)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={400}
                  height={300}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                    width: '100%',
                    height: 'auto'
                  }}
                  onError={(e) => {
                    // Use placeholder on error
                    const target = e.target as HTMLImageElement;
                    target.src = getPlaceholderImage(articleId, index);
                  }}
                />
                {image.caption && (
                  <p className="image-caption">{image.caption}</p>
                )}
              </div>
            </Col>
          ))}
          {images.length > 4 && !showGallery && (
            <Col xs={6} md={3}>
              <button
                className="view-more-btn"
                onClick={() => setShowModal(true)}
              >
                +{images.length - 4} dalších
              </button>
            </Col>
          )}
        </Row>
      </div>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.alt || 'Obrázek'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-0">
          {selectedImage && (
            <>
              <div style={{ position: 'relative', minHeight: '400px' }}>
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getPlaceholderImage(articleId, currentIndex);
                  }}
                />
              </div>
              {selectedImage.caption && (
                <p className="modal-caption">{selectedImage.caption}</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handlePrev}>
            ← Předchozí
          </Button>
          <span className="image-counter">
            {currentIndex + 1} / {images.length}
          </span>
          <Button variant="secondary" onClick={handleNext}>
            Další →
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .article-images-gallery {
          margin: 2rem 0;
          padding: 1.5rem;
          background: var(--color-card-bg);
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
        }
        
        .gallery-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }
        
        .image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          transition: transform 0.2s ease;
        }
        
        .image-wrapper:hover {
          transform: scale(1.02);
        }
        
        .image-caption {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-top: 0.5rem;
          text-align: center;
        }
        
        .view-more-btn {
          width: 100%;
          height: 100%;
          min-height: 150px;
          background: var(--color-bg-tertiary);
          border: 2px dashed var(--color-glass-border);
          border-radius: 8px;
          color: var(--color-text-secondary);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .view-more-btn:hover {
          background: var(--color-bg-elevated);
          border-color: var(--color-accent-primary);
          color: var(--color-accent-primary);
        }
        
        .modal-caption {
          padding: 1rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }
        
        .image-counter {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}

// Component for inline article images
interface InlineArticleImageProps {
  articleId: string;
  sectionIndex: number;
  alt: string;
  caption?: string;
  className?: string;
}

export function InlineArticleImage({ 
  articleId, 
  sectionIndex, 
  alt, 
  caption,
  className = '' 
}: InlineArticleImageProps) {
  const placeholderUrl = getPlaceholderImage(articleId, sectionIndex);
  
  return (
    <figure className={`inline-article-image ${className}`}>
      <Image
        src={placeholderUrl}
        alt={alt}
        width={800}
        height={450}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px'
        }}
      />
      {caption && (
        <figcaption>{caption}</figcaption>
      )}
      <style jsx>{`
        .inline-article-image {
          margin: 1.5rem 0;
        }
        
        .inline-article-image :global(figcaption) {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          text-align: center;
          margin-top: 0.5rem;
          font-style: italic;
        }
      `}</style>
    </figure>
  );
}

export { ARTICLE_IMAGES as ARTICLE_IMAGES_LIST };

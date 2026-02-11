'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useReadLater } from './ReadLaterContext';
import { Article, CATEGORY_IMAGES } from '@/lib/articles/data';

interface ArticleCardProps {
  article: Article;
  variant: 'featured' | 'horizontal' | 'compact' | 'masonry' | 'hero';
  index?: number;
}



const CATEGORY_COLORS: Record<string, string> = {
  'Breaking News': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  'AI & Tech': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  'AI Tools': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  'Investice': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'Vzdělávání': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  'CNC & Engineering': 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
  'Design': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  'Móda': 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
  'Modeling': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  'Zdraví': 'linear-gradient(135deg, #10b981 0%, #22c55e 100%)',
  'Hardware': 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
  'Robotika': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
};

export default function ArticleCard({ article, variant, index = 0 }: ArticleCardProps) {
  const { isInReadLater, toggleReadLater } = useReadLater();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const categoryImage = CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['AI & Tech'];
  const categoryGradient = CATEGORY_COLORS[article.category] || CATEGORY_COLORS['AI & Tech'];

  const cardStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translateY(0)' 
      : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms`,
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleReadLater(article.id);
  };

  if (variant === 'hero') {
    return (
      <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
        <div
          ref={cardRef}
          className="article-card-hero"
          style={{
            ...cardStyles,
            position: 'relative',
            height: '500px',
            borderRadius: '24px',
            overflow: 'hidden',
            cursor: 'pointer',
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-card-border)',
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector('.hero-image') as HTMLElement;
            if (img) img.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector('.hero-image') as HTMLElement;
            if (img) img.style.transform = 'scale(1)';
          }}
        >
          <div
            className="hero-image"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${categoryImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.7s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '40px',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: categoryGradient,
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {article.category}
              </span>
              {article.featured && (
                <span
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  ⭐ Featured
                </span>
              )}
            </div>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '16px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {article.title}
            </h2>
            <p
              style={{
                fontSize: '16px',
                opacity: 0.9,
                lineHeight: 1.6,
                marginBottom: '24px',
                maxWidth: '600px',
              }}
            >
              {article.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', opacity: 0.8 }}>
              <span>📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
              <span>⏱️ {article.readTime}</span>
              <span>🏷️ {article.tags.slice(0, 2).join(', ')}</span>
            </div>
          </div>
          <button
            onClick={handleBookmarkClick}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: isInReadLater(article.id) ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = isInReadLater(article.id) 
                ? 'var(--color-accent-primary)' 
                : 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = isInReadLater(article.id) 
                ? 'var(--color-accent-primary)' 
                : 'rgba(255,255,255,0.2)';
            }}
          >
            {isInReadLater(article.id) ? '🔖' : '🔖'}
          </button>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
        <div
          ref={cardRef}
          className="article-card-featured"
          style={{
            ...cardStyles,
            background: 'var(--color-card-bg)',
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid var(--color-card-border)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            const img = e.currentTarget.querySelector('.featured-image') as HTMLElement;
            if (img) img.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            const img = e.currentTarget.querySelector('.featured-image') as HTMLElement;
            if (img) img.style.transform = 'scale(1)';
          }}
        >
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
            <div
              className="featured-image"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${categoryImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
              }}
            />
            <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span
                style={{
                  background: categoryGradient,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'white',
                }}
              >
                {article.category}
              </span>
              <button
                onClick={handleBookmarkClick}
                style={{
                  background: isInReadLater(article.id) ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  transition: 'all 0.3s ease',
                }}
              >
                {isInReadLater(article.id) ? '🔖' : '🔖'}
              </button>
            </div>
            {article.featured && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'var(--color-accent-gradient)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                ⭐ Doporučeno
              </div>
            )}
          </div>
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              {article.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
                flex: 1,
              }}
            >
              {article.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
              <span>📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
              <span>⏱️ {article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
        <div
          ref={cardRef}
          className="article-card-horizontal"
          style={{
            ...cardStyles,
            background: 'var(--color-card-bg)',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid var(--color-card-border)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(8px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            const img = e.currentTarget.querySelector('.horizontal-image') as HTMLElement;
            if (img) img.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = 'none';
            const img = e.currentTarget.querySelector('.horizontal-image') as HTMLElement;
            if (img) img.style.transform = 'scale(1)';
          }}
        >
          <div style={{ position: 'relative', width: '200px', minHeight: '180px', overflow: 'hidden', flexShrink: 0 }}>
            <div
              className="horizontal-image"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${categoryImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: categoryGradient,
                opacity: 0.3,
              }}
            />
          </div>
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span
                  style={{
                    background: categoryGradient,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'white',
                  }}
                >
                  {article.category}
                </span>
                {article.featured && <span style={{ fontSize: '14px' }}>⭐</span>}
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  marginBottom: '8px',
                  color: 'var(--color-text-primary)',
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {article.excerpt.slice(0, 120)}...
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                <span>📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
                <span>⏱️ {article.readTime}</span>
              </div>
              <button
                onClick={handleBookmarkClick}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  opacity: isInReadLater(article.id) ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {isInReadLater(article.id) ? '🔖' : '🔖'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
        <div
          ref={cardRef}
          className="article-card-compact"
          style={{
            ...cardStyles,
            background: 'var(--color-card-bg)',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid var(--color-card-border)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div
            style={{
              height: '8px',
              background: categoryGradient,
            }}
          />
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span
                style={{
                  background: 'var(--color-bg-tertiary)',
                  padding: '3px 8px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {article.category}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>⏱️ {article.readTime}</span>
            </div>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: 600,
                lineHeight: 1.4,
                marginBottom: '8px',
                color: 'var(--color-text-primary)',
              }}
            >
              {article.title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}
              </span>
              <button
                onClick={handleBookmarkClick}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  opacity: isInReadLater(article.id) ? 1 : 0.4,
                  transition: 'all 0.3s ease',
                }}
              >
                {isInReadLater(article.id) ? '🔖' : '🔖'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
      <div
        ref={cardRef}
        className="article-card-masonry"
        style={{
          ...cardStyles,
          background: 'var(--color-card-bg)',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid var(--color-card-border)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          breakInside: 'avoid',
          marginBottom: '24px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          const img = e.currentTarget.querySelector('.masonry-image') as HTMLElement;
          if (img) img.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          const img = e.currentTarget.querySelector('.masonry-image') as HTMLElement;
          if (img) img.style.transform = 'scale(1)';
        }}
      >
        <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
          <div
            className="masonry-image"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${categoryImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.7s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, ${categoryGradient.replace('linear-gradient(135deg, ', '').split(' ')[0]}40 0%, transparent 70%)`,
            }}
          />
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '4px 10px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
              }}
            >
              {article.category}
            </span>
          </div>
          <button
            onClick={handleBookmarkClick}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: isInReadLater(article.id) ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 0.3s ease',
            }}
          >
            {isInReadLater(article.id) ? '🔖' : '🔖'}
          </button>
        </div>
        <div style={{ padding: '20px' }}>
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: 1.4,
              marginBottom: '10px',
              color: 'var(--color-text-primary)',
            }}
          >
            {article.title}
          </h4>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          >
            {article.excerpt.slice(0, 100)}...
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            <span>📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
            <span>⏱️ {article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

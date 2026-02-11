'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useReadLater } from './ReadLaterContext';

interface GardenArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: string;
  icon: string;
}

interface GardenGridProps {
  articles: GardenArticle[];
}

export default function GardenGrid({ articles }: GardenGridProps) {
  const { isInReadLater, toggleReadLater } = useReadLater();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = gridRef.current?.querySelectorAll('.garden-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} style={{ marginBottom: '64px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}
      >
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="garden-item"
              data-index={index}
              style={{
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index)
                  ? 'translateY(0) scale(1)'
                  : 'translateY(30px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
                background: 'var(--color-card-bg)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--color-card-border)',
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                const img = e.currentTarget.querySelector('.garden-image') as HTMLElement;
                if (img) img.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = visibleItems.includes(index)
                  ? 'translateY(0) scale(1)'
                  : 'translateY(30px) scale(0.95)';
                e.currentTarget.style.boxShadow = 'none';
                const img = e.currentTarget.querySelector('.garden-image') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  className="garden-image"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${article.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s ease',
                  }}
                />
                {/* Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                  }}
                />

                {/* Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'var(--color-text-primary)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {article.icon} {article.category}
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleReadLater(article.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: isInReadLater(article.id)
                      ? 'var(--color-accent-primary)'
                      : 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    transition: 'all 0.3s ease',
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {isInReadLater(article.id) ? '🔖' : '🔖'}
                </button>

                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    color: 'white',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: '10px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      opacity: 0.9,
                      lineHeight: 1.5,
                      marginBottom: '12px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '12px',
                      opacity: 0.8,
                    }}
                  >
                    <span>📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
                    <span>⏱️ {article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

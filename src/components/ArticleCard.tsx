"use client";

import { Badge } from 'react-bootstrap';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  color?: string;
  author?: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

const CATEGORY_COLORS: Record<string, string> = {
  'Vývoj': 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
  'Návrh': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
  'Technologie': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  'Backend': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  'Frontend': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  'Funkcionalita': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
  'AI': 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
  'Vzdělávání': 'linear-gradient(135deg, #14b8a6 0%, #22d3ee 100%)',
  'Analytics': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  'Business': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  'Kariéra': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  'CMS': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
  'DevOps': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  'UX': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
};

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const categoryGradient = CATEGORY_COLORS[article.category] || 'var(--color-accent-gradient)';

  if (variant === 'featured') {
    return (
      <Link
        href={`/articles/${article.id}`}
        style={{
          display: 'block',
          textDecoration: 'none',
        }}
      >
        <div
          className="article-card article-card-featured"
          style={{
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all var(--transition-normal)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = 'var(--shadow-xl), var(--glow-primary)';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '280px',
              overflow: 'hidden',
              background: categoryGradient,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-4)',
                left: 'var(--space-4)',
                right: 'var(--space-4)',
                zIndex: 1,
              }}
            >
              <Badge
                style={{
                  background: 'var(--color-accent-primary)',
                  color: 'var(--color-text-inverse)',
                  border: 'none',
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {article.category}
              </Badge>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(8px)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text-inverse)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-medium)',
                }}
              >
                📖 {article.readTime}
              </div>
            </div>
          </div>
          <div
            style={{
              padding: 'var(--space-5)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                marginBottom: 'var(--space-3)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-text-primary)',
              }}
            >
              {article.title}
            </h2>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-4)',
                flex: 1,
              }}
            >
              {article.excerpt}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-card-border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <span>📅 {article.publishedAt}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                {article.tags.slice(0, 2).map((tag, index) => (
                  <Badge
                    key={index}
                    style={{
                      background: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-card-border)',
                      fontSize: 'var(--text-xs)',
                      padding: 'var(--space-1) var(--space-2)',
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {article.featured && (
            <div
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                left: 'var(--space-4)',
                background: 'var(--color-accent-gradient)',
                color: 'var(--color-text-inverse)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                zIndex: 2,
              }}
            >
              ⭐ Doporučeno
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
      }}
    >
      <div
        className="article-card"
        style={{
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all var(--transition-normal)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'translateY(-2px)';
          card.style.background = 'var(--color-card-bg-hover)';
          card.style.boxShadow = 'var(--shadow-lg), 0 4px 20px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'translateY(0)';
          card.style.background = 'var(--color-card-bg)';
          card.style.boxShadow = 'var(--shadow-sm)';
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '200px',
            overflow: 'hidden',
            background: categoryGradient,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-3)',
              left: 'var(--space-3)',
              right: 'var(--space-3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Badge
              style={{
                background: 'var(--color-accent-primary)',
                color: 'var(--color-text-inverse)',
                border: 'none',
                padding: 'var(--space-1) var(--space-3)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-medium)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {article.category}
            </Badge>
            <div
              style={{
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(8px)',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-inverse)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-medium)',
              }}
            >
              📖 {article.readTime}
            </div>
          </div>
        </div>
        <div
          style={{
            padding: 'var(--space-4)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-semibold)',
              marginBottom: 'var(--space-2)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.title}
          </h3>
          <p
            style={{
              color: 'var(--color-text-tertiary)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-3)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {article.excerpt}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <span>📅 {article.publishedAt}</span>
            {article.featured && <span>⭐</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
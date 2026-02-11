'use client';

import { useState, useEffect, use } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReadLaterProvider, useReadLater } from '@/components/articles/ReadLaterContext';
import { DarkModeProvider, useDarkMode } from '@/components/articles/DarkModeContext';
import DarkModeToggle from '@/components/articles/DarkModeToggle';

interface ArticleContent {
  introduction: string;
  sections: {
    title: string;
    content: string;
    subsections?: {
      title: string;
      content: string;
    }[];
  }[];
  conclusion: string;
  keyTakeaways: string[];
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  color: string;
  content: ArticleContent;
}

// Import ARTICLES data from the main page
// For now, I'll include just the structure - in production this would be imported or fetched
const CATEGORY_IMAGES: Record<string, string> = {
  'Breaking News': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
  'AI & Tech': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
  'AI Tools': 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200',
  'Investice': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200',
  'Vzdělávání': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200',
  'CNC & Engineering': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
  'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
  'Móda': 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200',
  'Modeling': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
  'Zdraví': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200',
  'Hardware': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
  'Robotika': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
  'Zahrada': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
  'Zahrádka': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
  'Zvířata': 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200',
  'Auta': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
  'AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
};

function ArticleDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { isInReadLater, toggleReadLater } = useReadLater();
  const { resolvedTheme } = useDarkMode();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // This is a simplified version - in production, fetch the article data
  // For now, we'll create a beautiful layout that will work with any article

  if (!mounted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--color-bg-primary)',
      }}>
        <div style={{ 
          fontSize: '24px', 
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div className="loading-spinner" />
          Načítání článku...
        </div>
      </div>
    );
  }

  // Placeholder for article - in production this would be fetched
  const article: Article = {
    id: id,
    title: "Článek",
    excerpt: "Popis článku...",
    category: "Kategorie",
    readTime: "5 min",
    publishedAt: "2026-01-01",
    tags: ["Tag1", "Tag2"],
    featured: true,
    color: "primary",
    content: {
      introduction: "Úvod článku...",
      sections: [],
      conclusion: "Závěr článku...",
      keyTakeaways: ["Bod 1", "Bod 2"]
    }
  };

  const heroImage = CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['AI & Tech'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      <style jsx global>{`
        :root {
          --color-bg-primary: #fafafa;
          --color-bg-secondary: #f0f0f0;
          --color-card-bg: #ffffff;
          --color-card-border: rgba(0, 0, 0, 0.08);
          --color-text-primary: #1a1a1a;
          --color-text-secondary: #666666;
          --color-text-tertiary: #999999;
          --color-accent-primary: #3b82f6;
          --color-accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
        }
        
        .dark {
          --color-bg-primary: #0a0a0a;
          --color-bg-secondary: #171717;
          --color-card-bg: #1a1a1a;
          --color-card-border: rgba(255, 255, 255, 0.1);
          --color-text-primary: #fafafa;
          --color-text-secondary: #a3a3a3;
          --color-text-tertiary: #737373;
          --color-accent-primary: #60a5fa;
          --color-accent-gradient: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
          --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
        }

        .article-content h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 48px 0 24px;
          color: var(--color-text-primary);
          line-height: 1.3;
        }

        .article-content h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 32px 0 16px;
          color: var(--color-text-primary);
        }

        .article-content p {
          font-size: 17px;
          line-height: 1.8;
          margin-bottom: 20px;
          color: var(--color-text-secondary);
        }

        .article-content ul {
          margin: 20px 0;
          padding-left: 24px;
        }

        .article-content li {
          font-size: 17px;
          line-height: 1.8;
          margin-bottom: 12px;
          color: var(--color-text-secondary);
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid var(--color-bg-secondary);
          border-top-color: var(--color-accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>

      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${readingProgress}%`,
        height: '4px',
        background: 'var(--color-accent-gradient)',
        zIndex: 1001,
        transition: 'width 0.1s ease',
      }} />

      {/* Dark Mode Toggle */}
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 1000,
      }}>
        <DarkModeToggle />
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '60vh',
        minHeight: '500px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
        }} />
        
        <Container style={{ 
          position: 'relative', 
          zIndex: 1, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '64px',
          maxWidth: '900px',
        }}>
          <Link 
            href="/articles" 
            style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            ← Zpět na články
          </Link>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              background: 'var(--color-accent-primary)',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {article.category}
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
            }}>
              ⏱️ {article.readTime}
            </span>
            {article.featured && (
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
              }}>
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}>
            {article.title}
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.6,
            maxWidth: '700px',
            marginBottom: '24px',
          }}>
            {article.excerpt}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
          }}>
            <span>📅 {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
            <span>🏷️ {article.tags.join(', ')}</span>
          </div>
        </Container>
      </div>

      {/* Article Content */}
      <Container style={{ maxWidth: '800px', padding: '64px 24px' }}>
        <Row>
          <Col>
            {/* Actions Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '48px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--color-card-border)',
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => toggleReadLater(article.id)}
                  style={{
                    padding: '10px 20px',
                    background: isInReadLater(article.id) ? 'var(--color-accent-primary)' : 'var(--color-bg-secondary)',
                    color: isInReadLater(article.id) ? 'white' : 'var(--color-text-primary)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isInReadLater(article.id) ? '🔖 Uloženo' : '🔖 Uložit'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {['📱', '💬', '📧'].map((icon, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--color-bg-secondary)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-accent-primary)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-bg-secondary)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Introduction */}
            <div className="article-content fade-in">
              <p style={{
                fontSize: '20px',
                lineHeight: '1.8',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
                marginBottom: '48px',
                padding: '32px',
                background: 'var(--color-bg-secondary)',
                borderRadius: '16px',
                borderLeft: '4px solid var(--color-accent-primary)',
              }}>
                {article.content.introduction}
              </p>

              {/* Sections */}
              {article.content.sections.map((section, index) => (
                <div key={index} style={{ marginBottom: '48px' }}>
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>

                  {section.subsections?.map((subsection, subIndex) => (
                    <div 
                      key={subIndex}
                      style={{
                        margin: '32px 0',
                        padding: '24px',
                        background: 'var(--color-card-bg)',
                        borderRadius: '12px',
                        border: '1px solid var(--color-card-border)',
                        boxShadow: 'var(--shadow-lg)',
                      }}
                    >
                      <h3>{subsection.title}</h3>
                      <p style={{ margin: 0 }}>{subsection.content}</p>
                    </div>
                  ))}
                </div>
              ))}

              {/* Conclusion Box */}
              <div style={{
                margin: '64px 0',
                padding: '40px',
                background: 'var(--color-accent-gradient)',
                borderRadius: '20px',
                color: 'white',
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  💡 Závěr
                </h3>
                <p style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  margin: 0,
                  opacity: 0.95,
                }}>
                  {article.content.conclusion}
                </p>
              </div>

              {/* Key Takeaways */}
              <div style={{
                padding: '32px',
                background: 'var(--color-card-bg)',
                borderRadius: '16px',
                border: '1px solid var(--color-card-border)',
                marginBottom: '64px',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--color-text-primary)',
                }}>
                  🎯 Klíčové body
                </h3>
                <ul style={{ margin: 0, paddingLeft: '24px' }}>
                  {article.content.keyTakeaways.map((takeaway, index) => (
                    <li 
                      key={index}
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        marginBottom: '12px',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '48px',
            }}>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '8px 16px',
                    background: 'var(--color-bg-secondary)',
                    borderRadius: '20px',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '32px 0',
              borderTop: '1px solid var(--color-card-border)',
            }}>
              <Link
                href="/articles"
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '2px solid var(--color-card-border)',
                  borderRadius: '12px',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                  e.currentTarget.style.color = 'var(--color-accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-card-border)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                ← Zpět na články
              </Link>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  padding: '12px 24px',
                  background: 'var(--color-accent-primary)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ↑ Nahoru
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <DarkModeProvider>
      <ReadLaterProvider>
        <ArticleDetailContent params={params} />
      </ReadLaterProvider>
    </DarkModeProvider>
  );
}

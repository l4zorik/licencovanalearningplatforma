'use client';

import { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import ArticleCard from '@/components/articles/ArticleCard';
import GardenGrid from '@/components/articles/GardenGrid';
import { ReadLaterProvider, useReadLater } from '@/components/articles/ReadLaterContext';
import { DarkModeProvider, useDarkMode } from '@/components/articles/DarkModeContext';
import DarkModeToggle from '@/components/articles/DarkModeToggle';
import { ARTICLES, GARDEN_ARTICLES, getCategoryPriority, Article } from '@/lib/articles/data';

function ArticlesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReadLater, setShowReadLater] = useState(false);
  const { readLaterIds } = useReadLater();

  const categories = useMemo(() => {
    const cats = Array.from(new Set(ARTICLES.map(a => a.category)));
    return cats.sort((a, b) => getCategoryPriority(a) - getCategoryPriority(b));
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTICLES.forEach(article => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ARTICLES.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).slice(0, 20);
  }, []);

  const filteredArticles = useMemo(() => {
    let articles = [...ARTICLES];

    if (showReadLater) {
      articles = articles.filter(a => readLaterIds.includes(a.id));
    }

    if (selectedCategory) {
      articles = articles.filter(a => a.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [selectedCategory, searchQuery, showReadLater, readLaterIds]);

  const heroArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  const articlesByCategory = useMemo(() => {
    const grouped: Record<string, Article[]> = {};
    remainingArticles.forEach(article => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, [remainingArticles]);

  const featuredArticles = useMemo(() => {
    return remainingArticles.filter(a => a.featured).slice(0, 4);
  }, [remainingArticles]);

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
          --color-bg-tertiary: #e5e5e5;
          --color-card-bg: #ffffff;
          --color-card-bg-hover: #f8f8f8;
          --color-card-border: rgba(0, 0, 0, 0.08);
          --color-text-primary: #1a1a1a;
          --color-text-secondary: #666666;
          --color-text-tertiary: #999999;
          --color-text-inverse: #ffffff;
          --color-accent-primary: #3b82f6;
          --color-accent-secondary: #8b5cf6;
          --color-accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
        }
        
        .dark {
          --color-bg-primary: #0a0a0a;
          --color-bg-secondary: #171717;
          --color-bg-tertiary: #262626;
          --color-card-bg: #1a1a1a;
          --color-card-bg-hover: #262626;
          --color-card-border: rgba(255, 255, 255, 0.1);
          --color-text-primary: #fafafa;
          --color-text-secondary: #a3a3a3;
          --color-text-tertiary: #737373;
          --color-text-inverse: #0a0a0a;
          --color-accent-primary: #60a5fa;
          --color-accent-secondary: #a78bfa;
          --color-accent-gradient: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
          --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 1000,
      }}>
        <DarkModeToggle />
      </div>

      <Container style={{ maxWidth: '1400px', padding: '48px 24px' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
          animation: 'fadeInDown 0.8s ease',
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 800,
            marginBottom: '16px',
            background: 'var(--color-accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            📝 Články
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Nejnovější zprávy z oblasti AI, technologií, investic a vzdělávání
          </p>
        </div>

        <Row>
          <Col lg={3} style={{ marginBottom: '48px' }}>
            <div style={{
              position: 'sticky',
              top: '24px',
            }}>
              <div style={{
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  color: 'var(--color-text-secondary)',
                }}>
                  🔍 Vyhledávání
                </h3>
                <input
                  type="text"
                  placeholder="Hledat články..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-card-border)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>

              <div style={{
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  color: 'var(--color-text-secondary)',
                }}>
                  📂 Kategorie
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setShowReadLater(false);
                    }}
                    style={{
                      padding: '10px 14px',
                      background: !selectedCategory && !showReadLater ? 'var(--color-accent-gradient)' : 'transparent',
                      color: !selectedCategory && !showReadLater ? 'white' : 'var(--color-text-primary)',
                      border: 'none',
                      borderRadius: '10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: !selectedCategory && !showReadLater ? 600 : 400,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>Všechny články</span>
                    <span style={{ opacity: 0.7, fontSize: '12px' }}>{ARTICLES.length}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowReadLater(true);
                      setSelectedCategory(null);
                    }}
                    style={{
                      padding: '10px 14px',
                      background: showReadLater ? 'var(--color-accent-gradient)' : 'transparent',
                      color: showReadLater ? 'white' : 'var(--color-text-primary)',
                      border: 'none',
                      borderRadius: '10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: showReadLater ? 600 : 400,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>🔖 Přečíst později</span>
                    <span style={{ opacity: 0.7, fontSize: '12px' }}>{readLaterIds.length}</span>
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowReadLater(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        background: selectedCategory === category ? 'var(--color-accent-gradient)' : 'transparent',
                        color: selectedCategory === category ? 'white' : 'var(--color-text-primary)',
                        border: 'none',
                        borderRadius: '10px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: selectedCategory === category ? 600 : 400,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{category}</span>
                      <span style={{ opacity: 0.7, fontSize: '12px' }}>{categoryCounts[category] || 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  color: 'var(--color-text-secondary)',
                }}>
                  🏷️ Populární tagy
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      style={{
                        padding: '6px 12px',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-card-border)',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-accent-primary)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-bg-secondary)';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          <Col lg={9}>
            {filteredArticles.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '24px',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: 'var(--color-text-primary)',
                }}>
                  Žádné články nenalezeny
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Zkuste změnit vyhledávací dotaz nebo vybrat jinou kategorii
                </p>
              </div>
            ) : (
              <>
                {heroArticle && !selectedCategory && !showReadLater && !searchQuery && (
                  <div style={{ marginBottom: '48px' }}>
                    <ArticleCard article={heroArticle} variant="hero" index={0} />
                  </div>
                )}

                {!selectedCategory && !showReadLater && !searchQuery && GARDEN_ARTICLES.length > 0 && (
                  <div style={{ marginBottom: '64px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                      paddingBottom: '16px',
                      borderBottom: '2px solid var(--color-bg-tertiary)',
                    }}>
                      <h2 style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}>
                        🌿 Jaro & Léto na zahradě
                      </h2>
                      <button
                        onClick={() => setSelectedCategory('Zahrada')}
                        style={{
                          padding: '8px 16px',
                          background: 'transparent',
                          border: '1px solid var(--color-card-border)',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                          e.currentTarget.style.color = 'var(--color-accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-card-border)';
                          e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                      >
                        Zobrazit vše →
                      </button>
                    </div>
                    <GardenGrid articles={GARDEN_ARTICLES} />
                  </div>
                )}

                {!selectedCategory && !showReadLater && !searchQuery && featuredArticles.length > 0 && (
                  <div style={{ marginBottom: '64px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}>
                      <h2 style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}>
                        ⭐ Doporučené články
                      </h2>
                    </div>
                    <Row>
                      {featuredArticles.slice(0, 2).map((article, idx) => (
                        <Col key={article.id} lg={6} style={{ marginBottom: '24px' }}>
                          <ArticleCard article={article} variant="featured" index={idx} />
                        </Col>
                      ))}
                    </Row>
                    <Row>
                      {featuredArticles.slice(2).map((article, idx) => (
                        <Col key={article.id} lg={6} style={{ marginBottom: '24px' }}>
                          <ArticleCard article={article} variant="horizontal" index={idx + 2} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}

                {(selectedCategory || showReadLater || searchQuery) ? (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}>
                      <h2 style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}>
                        {showReadLater ? '🔖 Přečíst později' : selectedCategory || 'Výsledky vyhledávání'}
                      </h2>
                      <span style={{ color: 'var(--color-text-tertiary)', fontSize: '14px' }}>
                        {filteredArticles.length} článků
                      </span>
                    </div>
                    <Row>
                      {filteredArticles.map((article, idx) => (
                        <Col key={article.id} lg={6} style={{ marginBottom: '24px' }}>
                          <ArticleCard article={article} variant={idx % 3 === 0 ? "featured" : "horizontal"} index={idx} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : (
                  Object.entries(articlesByCategory).map(([category, articles], categoryIdx) => (
                    <div key={category} style={{ marginBottom: '64px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                        paddingBottom: '16px',
                        borderBottom: '2px solid var(--color-bg-tertiary)',
                      }}>
                        <h2 style={{
                          fontSize: '24px',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                        }}>
                          {category}
                        </h2>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            border: '1px solid var(--color-card-border)',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                            e.currentTarget.style.color = 'var(--color-accent-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-card-border)';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                          }}
                        >
                          Zobrazit vše →
                        </button>
                      </div>
                      <Row>
                        {articles.slice(0, 4).map((article, idx) => (
                          <Col key={article.id} lg={idx === 0 ? 6 : 3} md={6} style={{ marginBottom: '24px' }}>
                            <ArticleCard 
                              article={article} 
                              variant={idx === 0 ? "featured" : "compact"} 
                              index={categoryIdx * 4 + idx} 
                            />
                          </Col>
                        ))}
                      </Row>
                      {articles.length > 4 && (
                        <Row>
                          {articles.slice(4, 8).map((article, idx) => (
                            <Col key={article.id} lg={3} md={6} style={{ marginBottom: '24px' }}>
                              <ArticleCard article={article} variant="masonry" index={categoryIdx * 4 + idx + 4} />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <DarkModeProvider>
      <ReadLaterProvider>
        <ArticlesContent />
      </ReadLaterProvider>
    </DarkModeProvider>
  );
}

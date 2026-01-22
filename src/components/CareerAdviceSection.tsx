"use client";

import { useState } from 'react';
import { Row, Col, Card, Badge, Button, Form, Collapse } from 'react-bootstrap';
import { CareerAdvice, CAREER_ADVICE_DATA, getAllAdviceCategories, searchAdvice, getRandomAdvice } from '@/data/career-advice/data';

export default function CareerAdviceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAdvice, setExpandedAdvice] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = getAllAdviceCategories();

  const filteredAdvice = searchQuery 
    ? searchAdvice(searchQuery)
    : selectedCategory 
      ? CAREER_ADVICE_DATA.filter(a => a.category === selectedCategory)
      : getRandomAdvice(6);

  const displayAdvice = showAll ? filteredAdvice : filteredAdvice.slice(0, 6);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Getting Started': '#4CAF50',
      'Job Search': '#2196F3',
      'Interview': '#FF9800',
      'Negotiation': '#9C27B0',
      'Career Growth': '#F44336',
      'Work-Life Balance': '#00BCD4',
      'Networking': '#795548',
      'Skill Development': '#607D8B',
      'Leadership': '#E91E63',
      'Personal Development': '#3F51B5'
    };
    return colors[category] || '#607D8B';
  };

  return (
    <Card className="h-100 glass-effect" style={{ 
      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(156, 39, 176, 0.15) 100%)',
      border: '1px solid rgba(156, 39, 176, 0.3)'
    }}>
      <Card.Header className="bg-transparent border-bottom border-secondary">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
            💡 Career Advice
            <Badge bg="info">{CAREER_ADVICE_DATA.length} tipů</Badge>
          </h5>
        </div>

        <Form.Control 
          type="text" 
          placeholder="Hledat rady..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3"
        />

        <div className="d-flex flex-wrap gap-2">
          <Button 
            variant={selectedCategory === null ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
          >
            Všechny
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => { setSelectedCategory(category); setSearchQuery(''); }}
              style={selectedCategory === category ? {} : { borderColor: getCategoryColor(category), color: getCategoryColor(category) }}
            >
              {category}
            </Button>
          ))}
        </div>
      </Card.Header>

      <Card.Body className="p-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <Row className="g-3">
          {displayAdvice.map((advice: CareerAdvice) => (
            <Col key={advice.id} xs={12}>
              <Card 
                className="h-100"
                style={{ 
                  background: `${getCategoryColor(advice.category)}15`,
                  border: `1px solid ${getCategoryColor(advice.category)}40`,
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedAdvice(expandedAdvice === advice.id ? null : advice.id)}
              >
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge 
                      style={{ backgroundColor: getCategoryColor(advice.category) }}
                      className="mb-2"
                    >
                      {advice.category}
                    </Badge>
                    {advice.source && (
                      <small className="text-white-50">📝 {advice.source}</small>
                    )}
                  </div>
                  
                  <h6 className="fw-bold mb-2" style={{ color: '#fff' }}>{advice.title}</h6>
                  
                  <Collapse in={expandedAdvice === advice.id}>
                    <div>
                      <p className="mb-2 small" style={{ color: '#ccc', whiteSpace: 'pre-line' }}>
                        {advice.content}
                      </p>
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        {advice.tags.map(tag => (
                          <Badge key={tag} bg="secondary" style={{ fontSize: '0.7rem' }}>
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Collapse>
                  
                  <small className="text-white-50">
                    {expandedAdvice === advice.id ? '👆 Skrýt' : '👇 Zobrazit více'}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredAdvice.length > 6 && !searchQuery && (
          <div className="text-center mt-3">
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Zobrazit méně' : `Zobrazit všech ${filteredAdvice.length} rad`}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

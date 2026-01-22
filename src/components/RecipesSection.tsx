"use client";

import { useState } from 'react';
import { Row, Col, Card, Badge, Button, Form, Modal } from 'react-bootstrap';
import { Recipe, RECIPE_DATA, RECIPE_CATEGORIES, getRecipesByCategory, searchRecipes, getVegetarianRecipes, getQuickRecipes, RecipeCategory } from '@/data/recipes/data';

export default function RecipesSection() {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filter, setFilter] = useState<'all' | 'vegetarian' | 'quick'>('all');

  const categories = RECIPE_CATEGORIES;

  let filteredRecipes = searchQuery 
    ? searchRecipes(searchQuery)
    : selectedCategory 
      ? getRecipesByCategory(selectedCategory)
      : RECIPE_DATA;

  if (filter === 'vegetarian') {
    filteredRecipes = getVegetarianRecipes();
  } else if (filter === 'quick') {
    filteredRecipes = getQuickRecipes(30);
  }

  const displayRecipes = filteredRecipes.slice(0, 6);

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ['Velmi snadné', 'Snadné', 'Střední', 'Náročné', 'Expertní'];
    return labels[difficulty - 1];
  };

  const getDifficultyColor = (difficulty: number) => {
    const colors = ['#4CAF50', '#8BC34A', '#FFEB3B', '#FF9800', '#F44336'];
    return colors[difficulty - 1];
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      <Card className="h-100 glass-effect" style={{ 
        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(244, 67, 54, 0.15) 100%)',
        border: '1px solid rgba(255, 152, 0, 0.3)'
      }}>
        <Card.Header className="bg-transparent border-bottom border-secondary">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
              👨‍🍳 Recepty
              <Badge bg="warning" text="dark">{RECIPE_DATA.length}</Badge>
            </h5>
          </div>

          <Form.Control 
            type="text" 
            placeholder="Hledat recepty..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />

          <div className="d-flex flex-wrap gap-2 mb-3">
            <Button 
              variant={filter === 'all' ? "warning" : "outline-secondary"}
              size="sm"
              onClick={() => { setFilter('all'); setSearchQuery(''); }}
              className={filter === 'all' ? 'text-dark' : ''}
            >
              Všechny
            </Button>
            <Button 
              variant={filter === 'vegetarian' ? "success" : "outline-secondary"}
              size="sm"
              onClick={() => { setFilter('vegetarian'); setSearchQuery(''); }}
            >
              🥬 Vegetariánské
            </Button>
            <Button 
              variant={filter === 'quick' ? "info" : "outline-secondary"}
              size="sm"
              onClick={() => { setFilter('quick'); setSearchQuery(''); }}
              className={filter === 'quick' ? 'text-dark' : ''}
            >
              ⚡ Do 30 min
            </Button>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "warning" : "outline-secondary"}
              size="sm"
              onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
              className={selectedCategory === null ? 'text-dark' : ''}
            >
              🍽️ Vše
            </Button>
            {categories.slice(0, 6).map(cat => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "warning" : "outline-secondary"}
                size="sm"
                onClick={() => { setSelectedCategory(cat.name); setSearchQuery(''); }}
                className={selectedCategory === cat.name ? 'text-dark' : ''}
                style={{ borderColor: cat.color, backgroundColor: selectedCategory === cat.name ? cat.color : 'transparent' }}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>
        </Card.Header>

        <Card.Body className="p-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <Row className="g-3">
            {displayRecipes.map((recipe: Recipe) => {
              const categoryInfo = categories.find(c => c.name === recipe.category);
              return (
                <Col key={recipe.id} xs={12} md={6}>
                  <Card 
                    className="h-100"
                    style={{ 
                      background: `${categoryInfo?.color || '#FF9800'}15`,
                      border: `1px solid ${categoryInfo?.color || '#FF9800'}40`,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleViewRecipe(recipe)}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge style={{ backgroundColor: categoryInfo?.color || '#FF9800' }}>
                          {categoryInfo?.icon} {recipe.category}
                        </Badge>
                        <div className="d-flex gap-1">
                          {recipe.isVegetarian && <Badge bg="success" style={{ fontSize: '0.6rem' }}>🥬</Badge>}
                          {recipe.isVegan && <Badge bg="success" style={{ fontSize: '0.6rem' }}>🌱</Badge>}
                          {recipe.isGlutenFree && <Badge bg="warning" style={{ fontSize: '0.6rem' }}>🌾</Badge>}
                        </div>
                      </div>
                      
                      <h6 className="fw-bold mb-2" style={{ color: '#fff' }}>{recipe.title}</h6>
                      <p className="small mb-2" style={{ color: '#ccc' }}>
                        {recipe.description.substring(0, 80)}...
                      </p>
                      
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <small style={{ color: '#aaa' }}>⏱️ {recipe.prepTime + recipe.cookTime} min</small>
                        <small style={{ color: '#aaa' }}>👥 {recipe.servings} porce</small>
                        <small style={{ color: getDifficultyColor(recipe.difficulty) }}>
                          📊 {getDifficultyLabel(recipe.difficulty)}
                        </small>
                      </div>

                      <div className="d-flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} bg="secondary" style={{ fontSize: '0.65rem' }}>
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {filteredRecipes.length > 6 && (
            <div className="text-center mt-3">
              <Button variant="outline-light" size="sm">
                Zobrazit všech {filteredRecipes.length} receptů →
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal 
        show={!!selectedRecipe} 
        onHide={() => setSelectedRecipe(null)}
        size="lg"
        centered
        contentClassName="bg-dark text-white"
      >
        {selectedRecipe && (
          <>
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title className="d-flex align-items-center gap-2">
                {selectedRecipe.title}
                <Badge style={{ backgroundColor: RECIPE_CATEGORIES.find(c => c.name === selectedRecipe.category)?.color }}>
                  {selectedRecipe.category}
                </Badge>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="lead">{selectedRecipe.description}</p>
              
              <Row className="mb-3">
                <Col xs={6} md={3}>
                  <div className="text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <strong>⏱️ Celkem</strong>
                    <div>{selectedRecipe.prepTime + selectedRecipe.cookTime} min</div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <strong>👥 Porce</strong>
                    <div>{selectedRecipe.servings}</div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <strong>📊 Náročnost</strong>
                    <div style={{ color: getDifficultyColor(selectedRecipe.difficulty) }}>
                      {getDifficultyLabel(selectedRecipe.difficulty)}
                    </div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <strong>🍽️ Kuchyně</strong>
                    <div>{selectedRecipe.cuisine}</div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h6 className="mb-3">📝 Ingredience</h6>
                  <ul className="list-unstyled">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="mb-2 d-flex align-items-center gap-2">
                        <span style={{ color: '#FF9800' }}>•</span>
                        {ing.amount} {ing.unit} {ing.name}
                        {ing.note && <small className="text-white-50">({ing.note})</small>}
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="mb-3">👨‍🍳 Postup</h6>
                  <ol className="ps-3">
                    {selectedRecipe.steps.map((step) => (
                      <li key={step.order} className="mb-2">
                        {step.instruction}
                        {step.duration && <small className="text-white-50"> ({step.duration} min)</small>}
                      </li>
                    ))}
                  </ol>
                </Col>
              </Row>

              {selectedRecipe.nutrition && (
                <Row className="mt-3">
                  <Col>
                    <h6 className="mb-2">📊 Výživové hodnoty (na porci)</h6>
                    <div className="d-flex flex-wrap gap-3">
                      <Badge bg="danger">🔥 {selectedRecipe.nutrition.calories} kcal</Badge>
                      <Badge bg="primary">💪 {selectedRecipe.nutrition.protein}g bílkovin</Badge>
                      <Badge bg="warning" text="dark">🍞 {selectedRecipe.nutrition.carbohydrates}g sacharidů</Badge>
                      <Badge bg="success">🥑 {selectedRecipe.nutrition.fat}g tuků</Badge>
                    </div>
                  </Col>
                </Row>
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

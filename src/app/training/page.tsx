"use client";

import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Link from 'next/link';

const TRAINING_MODULES = [
  {
    id: "shop-management",
    title: "Retail Shop Management",
    category: "Business & Trade",
    difficulty: "Beginner",
    description: "Learn the fundamentals of running a retail business. Manage inventory, set prices, and handle customer interactions in a real-time simulation.",
    status: "Available",
    link: "/training/shop-management",
    tags: ["Sales", "Math", "Communication"]
  },
  {
    id: "freelance-negotiation",
    title: "Freelance Negotiation",
    category: "Business",
    difficulty: "Intermediate",
    description: "Practice negotiating rates and contracts with simulated clients. Learn to handle objections and close deals.",
    status: "Coming Soon",
    link: "#",
    tags: ["Negotiation", "Sales"]
  },
  {
    id: "customer-service",
    title: "Customer Service Excellence",
    category: "Business & Trade",
    difficulty: "Beginner",
    description: "Master the art of customer service through interactive scenarios. Handle complaints, upsell products, and build customer loyalty.",
    status: "Available",
    link: "/training/customer-service",
    tags: ["Communication", "Empathy", "Problem Solving"]
  },
  {
    id: "project-management",
    title: "Project Management Basics",
    category: "Business",
    difficulty: "Intermediate",
    description: "Learn fundamental project management skills. Plan projects, manage timelines, allocate resources, and deliver on time.",
    status: "Coming Soon",
    link: "#",
    tags: ["Planning", "Leadership", "Organization"]
  },
  {
    id: "coding-interview",
    title: "Technical Interview Preparation",
    category: "Programming",
    difficulty: "Advanced",
    description: "Practice coding interviews with real algorithm problems. Improve your problem-solving skills and interview performance.",
    status: "Coming Soon",
    link: "#",
    tags: ["Algorithms", "Problem Solving", "Interview Prep"]
  },
  {
    id: "data-analysis",
    title: "Data Analysis Workshop",
    category: "Data Science",
    difficulty: "Intermediate",
    description: "Learn to analyze datasets and draw insights. Use statistical methods and visualization to make data-driven decisions.",
    status: "Coming Soon",
    link: "#",
    tags: ["Statistics", "Visualization", "Excel", "Python"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategy",
    category: "Marketing",
    difficulty: "Beginner",
    description: "Master digital marketing fundamentals. Learn SEO, social media marketing, content creation, and campaign management.",
    status: "Coming Soon",
    link: "#",
    tags: ["SEO", "Social Media", "Content", "Analytics"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design Fundamentals",
    category: "Design & Fashion",
    difficulty: "Beginner",
    description: "Learn the principles of visual design. Master color theory, typography, layout design, and create stunning graphics using industry-standard tools.",
    status: "Available",
    link: "/training/graphic-design",
    tags: ["Adobe Photoshop", "Typography", "Color Theory", "Layout"]
  },
  {
    id: "fashion-design",
    title: "Fashion Design & Production",
    category: "Design & Fashion",
    difficulty: "Intermediate",
    description: "From sketch to sewn garment. Learn fashion illustration, pattern making, fabric selection, and the complete clothing production workflow.",
    status: "Available",
    link: "/training/fashion-design",
    tags: ["Pattern Making", "Sewing", "Textiles", "Fashion Sketch"]
  },
  {
    id: "fashion-business",
    title: "Fashion Business Essentials",
    category: "Design & Fashion",
    difficulty: "Intermediate",
    description: "Build your own fashion brand. Learn sourcing, manufacturing, pricing, marketing, and selling your clothing line.",
    status: "Coming Soon",
    link: "#",
    tags: ["Branding", "Sourcing", "Production", "Retail"]
  },
  {
    id: "modeling-basics",
    title: "Modeling & Portfolio Building",
    category: "Modeling",
    difficulty: "Beginner",
    description: "Start your modeling career. Learn posing, runway walking, photo shoot techniques, and build a professional portfolio.",
    status: "Available",
    link: "/training/modeling-basics",
    tags: ["Posing", "Runway", "Portfolio", "Camera Ready"]
  },
  {
    id: "influencer-marketing",
    title: "Influencer & Social Media Modeling",
    category: "Modeling",
    difficulty: "Intermediate",
    description: "Build your personal brand as a social media influencer. Learn content creation, brand deals, and monetizing your following.",
    status: "Coming Soon",
    link: "#",
    tags: ["Social Media", "Content Creation", "Brand Deals", "Engagement"]
  },
  {
    id: "sports-betting-fundamentals",
    title: "Sports Betting Fundamentals",
    category: "Sports Betting",
    difficulty: "Beginner",
    description: "Understand betting odds, bookmakers, and betting strategies. Learn to analyze matches and manage your bankroll responsibly.",
    status: "Available",
    link: "/training/sports-betting",
    tags: ["Odds Analysis", "Bankroll Management", "Statistics", "Strategy"]
  },
  {
    id: "sports-analytics",
    title: "Sports Analytics & Prediction",
    category: "Sports Betting",
    difficulty: "Advanced",
    description: "Deep dive into statistical analysis for sports betting. Build models, analyze trends, and make data-driven betting decisions.",
    status: "Coming Soon",
    link: "#",
    tags: ["Data Analysis", "Statistics", "Machine Learning", "Python"]
  },
  {
    id: "vegetable-gardening",
    title: "Zeleninová Zahrada",
    category: "Gardening",
    difficulty: "Beginner",
    description: "Naučte se pěstovat vlastní zeleninu. Od přípravy záhonů po sklizeň - kompletní průvodce zahradničením.",
    status: "Available",
    link: "/training/vegetable-gardening",
    tags: ["Zelenina", "Záhony", "Sklizeň", "Organické"]
  },
  {
    id: "fruit-growing",
    title: "Pěstování Ovoce",
    category: "Gardening",
    difficulty: "Intermediate",
    description: "Stromové a keřové ovoce, bobuloviny a révy. Naučte se starat o ovocný sad a sklízet bohatou úrodu.",
    status: "Available",
    link: "/training/fruit-growing",
    tags: ["Stromy", "Keře", "Sklizeň", "Ovocný sad"]
  },
  {
    id: "garden-care",
    title: "Údržba Zahrady",
    category: "Gardening",
    difficulty: "Beginner",
    description: "Kompletní péče o zahradu - trávník, keře, stromy, záhony. Vytvořte a udržujte krásnou zahradu.",
    status: "Available",
    link: "/training/garden-care",
    tags: ["Trávník", "Keře", "Prořezávání", "Zavlažování"]
  },
  {
    id: "tree-care",
    title: "Péče o Stromy",
    category: "Tree Care",
    difficulty: "Intermediate",
    description: "Stříhání, prořezávání a údržba stromů. Bezpečné postupy pro práci s vysokými stromy a nářadím.",
    status: "Available",
    link: "/training/tree-care",
    tags: ["Prořezávání", "Bezpečnost", "Nářadí", "Stromy"]
  },
  {
    id: "jam-making",
    title: "Výroba Džemů a Marmelád",
    category: "Cooking & Preserving",
    difficulty: "Beginner",
    description: "Tradiční české džemy a marmelády od A do Z. Naučte se konzervovat ovoce a vytvářet lahodné pochoutky.",
    status: "Available",
    link: "/training/jam-making",
    tags: ["Džemy", "Konzervování", "Ovoce", "Recepty"]
  },
  {
    id: "preserving-food",
    title: "Konzervace Potravin",
    category: "Cooking & Preserving",
    difficulty: "Intermediate",
    description: "Zavařování, sušení, mrazení a fermentace. Naučte se uchovávat potraviny dlouhodobě.",
    status: "Available",
    link: "/training/preserving-food",
    tags: ["Zavařování", "Fermentace", "Sušení", "Mrazení"]
  },
  {
    id: "animal-care-basics",
    title: "Péče o Domácí Mazlíčky",
    category: "Animal Care",
    difficulty: "Beginner",
    description: "Základy péče o psy, kočky a další mazlíčky. Výživa, zdraví, hygiena a výcvik.",
    status: "Available",
    link: "/training/animal-care",
    tags: ["Psi", "Kočky", "Výživa", "Zdraví"]
  },
  {
    id: "animal-care-advanced",
    title: "Pokročilá Péče o Zvířata",
    category: "Animal Care",
    difficulty: "Intermediate",
    description: "První pomoc pro zvířata, behaviorální problémy a profesionální péče. Pro budoucí chovatele.",
    status: "Coming Soon",
    link: "#",
    tags: ["První pomoc", "Chování", "Veterina"]
  }
];

export default function TrainingCenterPage() {
  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      {/* Navbar Minimal */}
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
            <Link href="/" className="btn btn-outline-light btn-sm">
                ← Back to Dashboard
            </Link>
            <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2 text-info">
                🎓 Training Center
            </span>
            <div className="text-white-50 small">Build Real Skills</div>
        </Container>
      </nav>

      <Container>
        <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">SKILL SIMULATIONS</h1>
            <p className="lead text-white-50">Practice real-world scenarios in a safe environment.</p>
        </div>

        <Row className="g-4 justify-content-center">
            {TRAINING_MODULES.map((module) => (
                <Col lg={5} key={module.id}>
                    <Card className={`h-100 bg-gradient border-0 shadow-lg ${module.status === 'Coming Soon' ? 'opacity-75' : ''}`} 
                          style={{
                              background: 'linear-gradient(145deg, #2b3035 0%, #212529 100%)',
                              borderTop: `4px solid ${module.status === 'Available' ? '#0dcaf0' : '#6c757d'}`
                          }}>
                         <Card.Body className="p-4 d-flex flex-column">
                             <div className="d-flex justify-content-between align-items-start mb-3">
                                 <Badge bg="info" className="text-dark text-uppercase">{module.category}</Badge>
                                 <small className="text-white-50">{module.difficulty}</small>
                             </div>

                            <h3 className="card-title fw-bold mb-3">{module.title}</h3>
                            <p className="text-white-50 mb-4 flex-grow-1">{module.description}</p>
                            
                            <div className="mb-4">
                                <div className="d-flex flex-wrap gap-2">
                                    {module.tags.map(tag => (
                                        <Badge key={tag} bg="secondary" className="fw-normal">{tag}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto">
                                {module.status === 'Available' ? (
                                     <Link href={module.link} className="text-decoration-none">
                                       <Button variant="info" className="w-100 fw-bold text-dark">START SIMULATION</Button>
                                     </Link>
                                ) : (
                                    <Button variant="secondary" className="w-100" disabled>COMING SOON</Button>
                                 )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
      </Container>
    </main>
  );
}

"use client";

import React from 'react';
import { Container, Card, Badge, Row, Col, ListGroup } from 'react-bootstrap';
import Link from 'next/link';

export default function WikiPage() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">📖 Wiki - Web Design & Remote IT 2026</h1>

      <Card className="mb-4 glass-effect">
        <Card.Body>
          <h2>Nové dovednosti: Web & App Design</h2>
          <p>
            Přidali jsme tři nové klíčové dovednosti do systému pro lepší podporu designových a no-code kariérních cest.
          </p>

          <Row className="g-4">
            <Col md={4}>
              <Card 
                className="h-100 glass-effect border-0 hover-card"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(242,78,30,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span style={{ fontSize: '2.5rem' }}>🎨</span>
                    <div className="ms-3">
                      <h4 className="mb-1 fw-bold">Figma</h4>
                      <Badge bg="primary" pill>Design &amp; Fashion</Badge>
                    </div>
                  </div>
                  <p className="text-white-50">Collaborative interface design tool. Základ pro UI/UX, prototyping a design systems.</p>
                  <ListGroup variant="flush" className="small mt-3">
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Real-time collaboration</ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Auto-layout &amp; Variants</ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Developer handoff (CSS/Swift)</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card 
                className="h-100 glass-effect border-0 hover-card"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(67,83,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span style={{ fontSize: '2.5rem' }}>🌐</span>
                    <div className="ms-3">
                      <h4 className="mb-1 fw-bold">Webflow</h4>
                      <Badge bg="info" pill>No-Code Web Design</Badge>
                    </div>
                  </div>
                  <p className="text-white-50">Visual builder s produkčním kódem. Ideální pro marketingové weby a CMS projekty.</p>
                  <ListGroup variant="flush" className="small mt-3">
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Responsive + Interactions</ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-secondary px-0">CMS + E-commerce</ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Clean HTML/CSS output</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card 
                className="h-100 glass-effect border-0 hover-card"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(0,200,83,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span style={{ fontSize: '2.5rem' }}>📱</span>
                    <div className="ms-3">
                      <h4 className="mb-1 fw-bold">App Design</h4>
                      <Badge bg="success" pill>Mobile &amp; Web App</Badge>
                    </div>
                  </div>
                  <p className="text-white-50">Mobile-first UI/UX pro iOS/Android a web apps. Material Design &amp; HIG.</p>
                  <ListGroup variant="flush" className="small mt-3">
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Navigation &amp; Gestures</ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Accessibility &amp; Dark mode</ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-secondary px-0">Cross-platform (Flutter/React Native)</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h2>Remote IT / Webdesign Nabídky</h2>
          <p>Do WorkSectionu jsme přidali 5 nových remote pozic zaměřených na IT a webdesign:</p>
          <ul>
            <li><strong>Remote Fullstack Developer</strong> – GlobalTech EU (90-140k CZK)</li>
            <li><strong>Senior Web Designer (Remote)</strong> – CreativeHub (65-95k CZK)</li>
            <li><strong>Remote Frontend Engineer - React/Next</strong> – ScaleUp Digital (85-130k CZK)</li>
            <li><strong>UI/UX Web Designer</strong> – PixelPerfect Agency (70-110k CZK)</li>
            <li><strong>Remote DevOps Engineer</strong> – CloudNative Labs (100-160k CZK)</li>
          </ul>
          <p className="text-muted">Všechny nabídky mají perks: 100% Remote, Flexible Hours, Home Office Budget.</p>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="glass-effect h-100">
            <Card.Body>
              <h4 className="mb-3">🛤️ Learning Roadmap</h4>
              <div className="mb-3">
                <strong>Figma → Webflow → App Design</strong>
                <div className="small text-white-50 mt-1">Doporučená cesta pro začátečníky</div>
              </div>
              <ListGroup variant="flush" className="small">
                <ListGroup.Item className="bg-transparent px-0">1. Zvládni Figma základy (2-3 týdny)</ListGroup.Item>
                <ListGroup.Item className="bg-transparent px-0">2. Postav 3 weby ve Webflow (4-6 týdnů)</ListGroup.Item>
                <ListGroup.Item className="bg-transparent px-0">3. Navrhni mobilní app v App Design (3 týdny)</ListGroup.Item>
                <ListGroup.Item className="bg-transparent px-0">4. Přidej do portfolia + GitHub</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="glass-effect h-100">
            <Card.Body>
              <h4 className="mb-3">📈 2026 Market Outlook</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Remote Web Design</span>
                <Badge bg="success">+32% růst</Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>App Design (Mobile)</span>
                <Badge bg="success">+25% růst</Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Fullstack Remote</span>
                <Badge bg="info">+18% růst</Badge>
              </div>
              <div className="mt-3 small text-white-50">
                Hybrid Webflow pros earn $105k–$165k. Top remote hiring countries for Czech talent: Germany, Netherlands, UK. 
                Highest demand skills: Figma Expert + Webflow + Accessibility (WCAG 2.2).
              </div>

          <Row className="mt-4">
            <Col md={4}>
              <div className="p-3 bg-dark bg-opacity-25 rounded">
                <div className="fw-bold">Freelance Rates 2026</div>
                <div className="small mt-2">
                  Webflow: $50–$200/hr<br />
                  Figma Expert: $75–$165/hr<br />
                  App Design: $60–$150/hr
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-dark bg-opacity-25 rounded">
                <div className="fw-bold">Top Job Platforms</div>
                <div className="small mt-2">
                  webflow.jobs • LinkedIn<br />
                  We Work Remotely • Working Nomads<br />
                  Dribbble Jobs • Authentic Jobs
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-dark bg-opacity-25 rounded">
                <div className="fw-bold">Growth Projection</div>
                <div className="small mt-2">
                  Remote Webflow roles +68% since 2023<br />
                  80% of Webflow work will be remote by 2027<br />
                  BLS: 16% growth through 2032
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-4 pt-3 border-top border-secondary">
            <Col md={12}>
              <div className="fw-bold mb-2">Salary by Experience (Remote EU 2026)</div>
            </Col>
            <Col md={3}>
              <div className="small"><strong>Junior (0-2y)</strong><br />€48k–€72k</div>
            </Col>
            <Col md={3}>
              <div className="small"><strong>Mid (2-5y)</strong><br />€72k–€105k</div>
            </Col>
            <Col md={3}>
              <div className="small"><strong>Senior (5-8y)</strong><br />€105k–€145k</div>
            </Col>
            <Col md={3}>
              <div className="small"><strong>Lead (8y+)</strong><br />€145k–€190k</div>
            </Col>
          </Row>

          <Row className="mt-4 pt-3 border-top border-secondary">
            <Col md={12}>
              <div className="fw-bold mb-2">Platform &amp; Certification Impact 2026</div>
            </Col>
            <Col md={6}>
              <div className="small">
                Webflow market share: <strong>0.9%</strong> of all websites (1.2% CMS)<br />
                E-commerce sites on Webflow: <strong>20,378</strong> (+425× since 2020)<br />
                Webflow Expert certification premium: <strong>+30–45%</strong> freelance rates
              </div>
            </Col>
            <Col md={6}>
              <div className="small">
                Figma adoption: <strong>91%</strong> of web designers<br />
                Hybrid designer+developer: <strong>43%</strong> of professionals<br />
                Avg freelance rate for certified experts: <strong>$100–$225/hr</strong>
              </div>
            </Col>
          </Row>

          <Card className="mt-4 glass-effect">
            <Card.Body>
              <h4 className="mb-3">🚀 Real Use Cases &amp; Success Stories 2026</h4>
              <Row className="g-3">
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Trustly (Fintech)</strong><br />
                    <span className="small">Migrated 100+ pages to Webflow. Saved hundreds of thousands $/year in CMS costs. 7x faster campaign launches.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Birdie</strong><br />
                    <span className="small">Full rebrand + Webflow rebuild in 10 weeks. <strong>2× conversion rate</strong>. Marketing team now launches pages autonomously.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Checkbox (SaaS)</strong><br />
                    <span className="small">WordPress → Webflow migration. Now generates consistent demo signups weekly. Hundreds of vertical landing pages live.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Hofy (Remote Equipment)</strong><br />
                    <span className="small">2,500+ hours, 2,100+ landing pages, custom integrations. 40→80 Lighthouse score after optimization.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Hubilo</strong><br />
                    <span className="small">Ticket completion time cut from 24 days → 12 days. 89% YoY organic traffic growth after migration.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Shipwell</strong><br />
                    <span className="small">19% homepage organic traffic increase in first quarter. 1,500+ pages migrated with zero SEO loss.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Awardco (Unicorn)</strong><br />
                    <span className="small">Rebuilt in 6 months: 2,000+ pages, global scaling, <strong>2× conversions</strong>, billion-dollar valuation site.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Re:Coded (Non-profit)</strong><br />
                    <span className="small">Full marketing team autonomy after WordPress → Webflow. Faster content publishing and campaign testing.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Samsara</strong><br />
                    <span className="small">Launched campaigns in days instead of weeks using Webflow Optimize. Stronger funnel results across global audiences.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Talkspace</strong><br />
                    <span className="small">Page updates now take hours (was days). New pages launch <strong>7× faster</strong>. Unified global brand presence.</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-dark bg-opacity-25 rounded">
                    <strong>Dermalogica</strong><br />
                    <span className="small">Runs hundreds of experiments across 6 global sites with Webflow Optimize, directly shaping business investments.</span>
                  </div>
                </Col>
              </Row>
              <div className="mt-3 small text-white-50 border-top border-secondary pt-3">
                <strong>2026 Summary:</strong> 8 real companies migrated to Webflow/Figma workflows → average 2× conversions, 7× faster publishing, hundreds of thousands $ saved, 19–89% traffic growth. Hybrid skills + certification = highest ROI.
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <h4 className="mb-3">📋 Proven Implementation Plans 2026</h4>
              <Row>
                <Col md={4}>
                  <div className="small p-2 border-start border-primary border-3">
                    <strong>Starter Plan (4–6 weeks)</strong><br />
                    Figma audit → Webflow migration of 20–40 pages → basic CMS + SEO. Ideal for small teams switching from WordPress.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="small p-2 border-start border-info border-3">
                    <strong>Growth Plan (8–12 weeks)</strong><br />
                    Full rebrand + component system + 100+ pages + custom integrations + A/B testing setup. Used by Birdie & Hubilo.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="small p-2 border-start border-success border-3">
                    <strong>Enterprise Plan (3–6 months)</strong><br />
                    Global design system, localization, Webflow Optimize experiments, 2,000+ pages, team training. Awardco & Trustly model.
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

      <Card className="mb-4 glass-effect">
        <Card.Body>
          <h3 className="mb-4">📝 Blog Categories</h3>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="p-3 border-start border-primary border-3">
                <h5 className="text-primary">Web Design Trends 2026</h5>
                <p className="small text-white-50">Glassmorphism a neumorphic design dominují. AI-assisted layout tools jako v0 a Galileo AI mění způsob, jakým designéři pracují. Webflow 2026 přináší nativní AI generování komponent.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 border-start border-info border-3">
                <h5 className="text-info">Remote Work Best Practices</h5>
                <p className="small text-white-50">Pro remote designery je klíčová asynchronní komunikace přes Figma comments a Loom videa. Nejlepší týmy používají design tokens + Storybook pro konzistenci napříč lokacemi.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 border-start border-success border-3">
                <h5 className="text-success">Building a Design Portfolio</h5>
                <p className="small text-white-50">Přidej 3 case studies s problem → solution → impact. Každý projekt by měl obsahovat Figma file + live Webflow link. Recruiters hledají především process, ne jen finální vizuály.</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">📊 Real Data &amp; Statistics 2026</h3>
          <Row>
            <Col md={3} className="text-center">
              <div className="display-6 fw-bold text-primary">72%</div>
              <div className="small">Webflow jobs fully remote/hybrid</div>
            </Col>
            <Col md={3} className="text-center">
              <div className="display-6 fw-bold text-info">+38%</div>
              <div className="small">YoY growth Webflow developer postings</div>
            </Col>
            <Col md={3} className="text-center">
              <div className="display-6 fw-bold text-success">91%</div>
              <div className="small">Designers using Figma as primary tool</div>
            </Col>
            <Col md={3} className="text-center">
              <div className="display-6 fw-bold text-warning">€92k</div>
              <div className="small">Avg UX/UI designer salary Europe</div>
            </Col>
          </Row>
          <div className="mt-4 small text-white-50">
            Hybrid Webflow pros earn $105k–$165k. Top remote hiring countries for Czech talent: Germany, Netherlands, UK. 
            Highest demand skills: Figma Expert + Webflow + Accessibility (WCAG 2.2).
          </div>

          <Row className="mt-4">
            <Col md={4}>
              <div className="p-3 bg-dark bg-opacity-25 rounded">
                <div className="fw-bold">Freelance Rates 2026</div>
                <div className="small mt-2">
                  Webflow: $50–$200/hr<br />
                  Figma Expert: $75–$165/hr<br />
                  App Design: $60–$150/hr
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-dark bg-opacity-25 rounded">
                <div className="fw-bold">Top Job Platforms</div>
                <div className="small mt-2">
                  webflow.jobs • LinkedIn<br />
                  We Work Remotely • Working Nomads<br />
                  Dribbble Jobs • Authentic Jobs
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-dark bg-opacity-25 rounded">
                <div className="fw-bold">Growth Projection</div>
                <div className="small mt-2">
                  Remote Webflow roles +68% since 2023<br />
                  80% of Webflow work will be remote by 2027<br />
                  BLS: 16% growth through 2032
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="text-center mt-4">
        <Link href="/articles" className="btn btn-outline-primary">← Zpět na články</Link>
        <Link href="/" className="btn btn-primary ms-2">Dashboard</Link>
      </div>
    </Container>
  );
}

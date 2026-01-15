"use client";

import React, { useState, useMemo } from 'react';
import { Card, Table, Badge, ProgressBar, Row, Col, Button, Modal, Form, Tabs, Tab } from 'react-bootstrap';
import { COMPANY_PROFILES, getCompanyById, getTopCompanies } from '@/data/jobs/company-data';

interface CompanyRatingsProps {
  companyId?: string;
}

export default function CompanyRatings({ companyId }: CompanyRatingsProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const companies = useMemo(() => {
    let filtered = COMPANY_PROFILES;
    if (companyId) {
      filtered = filtered.filter(c => c.id === companyId);
    }
    if (filterIndustry !== 'all') {
      filtered = filtered.filter(c => 
        c.industry.toLowerCase().includes(filterIndustry.toLowerCase())
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.techStack.some(t => t.toLowerCase().includes(term))
      );
    }
    return filtered;
  }, [companyId, filterIndustry, searchTerm]);

  const industries = useMemo(() => {
    const allIndustries = COMPANY_PROFILES.map(c => c.industry);
    return [...new Set(allIndustries)];
  }, []);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'primary';
    if (rating >= 3.5) return 'warning';
    return 'danger';
  };

  const handleCompanyClick = (companyId: string) => {
    setSelectedCompany(companyId);
    setShowModal(true);
  };

  const selectedCompanyData = useMemo(() => {
    if (!selectedCompany) return null;
    return getCompanyById(selectedCompany);
  }, [selectedCompany]);

  return (
    <div>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Hledat firmy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
          >
            <option value="all">Všechny obory</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Firma</th>
            <th>Velikost</th>
            <th>Hodnocení</th>
            <th>Work-Life</th>
            <th>Kompenzace</th>
            <th>Kultura</th>
            <th>Růst</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id} onClick={() => handleCompanyClick(company.id)} style={{ cursor: 'pointer' }}>
              <td>
                <div className="d-flex align-items-center">
                  <span style={{ fontSize: 24, marginRight: 10 }}>{company.logo}</span>
                  <div>
                    <strong>{company.name}</strong>
                    <br />
                    <small className="text-muted">{company.industry}</small>
                  </div>
                </div>
              </td>
              <td>
                <Badge bg="secondary">{company.size}</Badge>
                <br />
                <small>{company.sizeRange} zaměstnanců</small>
              </td>
              <td>
                <Badge bg={getRatingColor(company.ratings.overall)}>
                  {company.ratings.overall.toFixed(1)}/5
                </Badge>
                <br />
                <small>{company.ratings.reviewsCount} recenzí</small>
              </td>
              <td>
                <ProgressBar now={company.ratings.workLifeBalance * 20} variant={getRatingColor(company.ratings.workLifeBalance)} />
                <small>{company.ratings.workLifeBalance.toFixed(1)}</small>
              </td>
              <td>
                <ProgressBar now={company.ratings.compensation * 20} variant={getRatingColor(company.ratings.compensation)} />
                <small>{company.ratings.compensation.toFixed(1)}</small>
              </td>
              <td>
                <ProgressBar now={company.ratings.culture * 20} variant={getRatingColor(company.ratings.culture)} />
                <small>{company.ratings.culture.toFixed(1)}</small>
              </td>
              <td>
                <ProgressBar now={company.ratings.careerGrowth * 20} variant={getRatingColor(company.ratings.careerGrowth)} />
                <small>{company.ratings.careerGrowth.toFixed(1)}</small>
              </td>
              <td>
                <Button size="sm" variant="outline-primary">
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        {selectedCompanyData && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <span style={{ marginRight: 10 }}>{selectedCompanyData.logo}</span>
                {selectedCompanyData.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="overview" className="mb-3">
                <Tab eventKey="overview" title="Přehled">
                  <Row>
                    <Col md={8}>
                      <h5>O společnosti</h5>
                      <p>{selectedCompanyData.description}</p>
                      <p><strong>Velikost:</strong> {selectedCompanyData.size} ({selectedCompanyData.sizeRange} zaměstnanců)</p>
                      <p><strong>Sídlo:</strong> {selectedCompanyData.headquarters}</p>
                      <p><strong>Založeno:</strong> {selectedCompanyData.founded}</p>
                      <p><strong>Tech stack:</strong></p>
                      <div className="mb-3">
                        {selectedCompanyData.techStack.map(tech => (
                          <Badge key={tech} bg="primary" className="me-1">{tech}</Badge>
                        ))}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Card>
                        <Card.Body>
                          <h5>Hodnocení</h5>
                          <div className="mb-2">
                            <strong>Celkově:</strong>
                            <Badge bg={getRatingColor(selectedCompanyData.ratings.overall)} className="ms-2">
                              {selectedCompanyData.ratings.overall.toFixed(1)}
                            </Badge>
                          </div>
                          <ProgressBar now={selectedCompanyData.ratings.workLifeBalance * 20} label={`Work-Life: ${selectedCompanyData.ratings.workLifeBalance}`} className="mb-2" />
                          <ProgressBar now={selectedCompanyData.ratings.compensation * 20} label={`Kompenzace: ${selectedCompanyData.ratings.compensation}`} className="mb-2" />
                          <ProgressBar now={selectedCompanyData.ratings.culture * 20} label={`Kultura: ${selectedCompanyData.ratings.culture}`} className="mb-2" />
                          <ProgressBar now={selectedCompanyData.ratings.careerGrowth * 20} label={`Růst: ${selectedCompanyData.ratings.careerGrowth}`} />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                <Tab eventKey="culture" title="Kultura">
                  <h5>Hodnoty</h5>
                  <ul>
                    {selectedCompanyData.values.map(value => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                  <h5 className="mt-3">Kultura</h5>
                  <p>{selectedCompanyData.culture}</p>
                  <h5 className="mt-3">Mise</h5>
                  <p>{selectedCompanyData.mission}</p>
                </Tab>

                <Tab eventKey="benefits" title="Benefity">
                  <Row>
                    <Col md={6}>
                      <h6>💰 Finanční</h6>
                      <ul>
                        {selectedCompanyData.benefits.financial.map(b => <li key={b}>{b}</li>)}
                      </ul>
                      <h6>🏥 Zdravotní</h6>
                      <ul>
                        {selectedCompanyData.benefits.health.map(b => <li key={b}>{b}</li>)}
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h6>🏖️ Lifestyle</h6>
                      <ul>
                        {selectedCompanyData.benefits.lifestyle.map(b => <li key={b}>{b}</li>)}
                      </ul>
                      <h6>📚 Profesní</h6>
                      <ul>
                        {selectedCompanyData.benefits.professional.map(b => <li key={b}>{b}</li>)}
                      </ul>
                    </Col>
                  </Row>
                </Tab>

                <Tab eventKey="process" title="Hiring Process">
                  <h5>Průběh náboru</h5>
                  <p>Průměrná doba: {selectedCompanyData.hiringProcess.averageDuration}</p>
                  <p>Obtížnost: {'⭐'.repeat(selectedCompanyData.hiringProcess.difficulty)}</p>
                  <p>Úspěšnost: ~{selectedCompanyData.hiringProcess.successRate}%</p>
                  <h6 className="mt-3">Kroky:</h6>
                  <ol>
                    {selectedCompanyData.hiringProcess.steps.map(step => (
                      <li key={step.id}>
                        <strong>{step.name}</strong> - {step.duration} min
                        <br />
                        <small className="text-muted">{step.description}</small>
                      </li>
                    ))}
                  </ol>
                </Tab>

                <Tab eventKey="tech" title="Tech Stack">
                  <h5>Používané technologie</h5>
                  <div className="mb-3">
                    {selectedCompanyData.techStack.map(tech => (
                      <Badge key={tech} bg="primary" className="me-1 mb-1">{tech}</Badge>
                    ))}
                  </div>
                  <h5>Úroveň technologií</h5>
                  <Badge bg={
                    selectedCompanyData.techStackLevel === 'cutting_edge' ? 'success' :
                    selectedCompanyData.techStackLevel === 'modern' ? 'primary' :
                    selectedCompanyData.techStackLevel === 'legacy' ? 'warning' : 'secondary'
                  }>
                    {selectedCompanyData.techStackLevel}
                  </Badge>
                  <h5 className="mt-3">Metodiky</h5>
                  <ul>
                    {selectedCompanyData.developmentMethodology.map(m => <li key={m}>{m}</li>)}
                  </ul>
                  <h5>Remote politika</h5>
                  <p>{selectedCompanyData.remotePolicy} - {selectedCompanyData.remoteDetails}</p>
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Zavřít
              </Button>
              <Button variant="primary">
                Zobrazit nabídky
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, Badge, Button, Row, Col, Form, InputGroup, ListGroup, Modal, Tabs, Tab, Toast, ToastContainer } from 'react-bootstrap';
import { AgencyJob, Agency, JobStatus, AccommodationType, JobType } from '@/types';
import { CZECH_AGENCIES, AGENCY_JOBS, REGIONS, ACCOMMODATION_LABELS, JOB_TYPE_LABELS } from '@/lib/data/agencies';

type Props = {
  onImportToJobs?: (job: AgencyJob) => void;
};

const STATUS_COLORS: Record<JobStatus, string> = {
  'To Apply': 'danger',
  'Applied': 'warning',
  'Interview': 'info',
  'Offer': 'success',
  'Rejected': 'secondary'
};

const DIFFICULTY_STARS = (level: number = 1) => {
  return '⭐'.repeat(level) + '☆'.repeat(5 - level);
};

const AccommodationBadge = ({ type }: { type: AccommodationType | undefined }) => {
  if (!type || type === 'none') return null;
  const label = ACCOMMODATION_LABELS[type] || type;
  return <Badge bg="info" className="me-1">{label}</Badge>;
};

const JobTypeBadge = ({ type }: { type: JobType }) => {
  const label = JOB_TYPE_LABELS[type] || type;
  return <Badge bg="secondary" className="me-1">{label}</Badge>;
};

const JobCard = ({ job, agency, onImport }: { job: AgencyJob; agency?: Agency; onImport?: (job: AgencyJob) => void }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="mb-3 h-100 bg-dark text-white border-secondary" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
      <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white border-secondary">
        <div>
          <Badge bg={STATUS_COLORS[job.status]}>{job.status}</Badge>
          <span className="ms-2 text-light small">{DIFFICULTY_STARS(job.difficulty)}</span>
        </div>
        <div>
          {job.accommodation && <Badge bg="success" className="me-1">🏠 Ubytování</Badge>}
          {job.transportProvided && <Badge bg="primary" className="me-1">🚐 Doprava</Badge>}
          {job.foreignWorkerFriendly && <Badge bg="warning" text="dark">🌍 Cizinci</Badge>}
        </div>
      </Card.Header>
      <Card.Body className="text-white">
        <Card.Title className="h6 mb-1">{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-light small">
          {agency ? (
            <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-light">
              {agency.name}
            </a>
          ) : (
            job.agencyName
          )}
        </Card.Subtitle>
        
        <Row className="mb-2 small">
          <Col xs={6}>
            <strong className="text-white">📍 {job.location}</strong>
            <br />
            <span className="text-light">{job.salaryRange}</span>
          </Col>
          <Col xs={6}>
            <JobTypeBadge type={job.jobType} />
            <AccommodationBadge type={job.accommodationType} />
          </Col>
        </Row>

        <div className="mb-2">
          {job.requiredSkills.slice(0, 4).map((skill, idx) => (
            <Badge key={idx} bg="secondary" className="me-1 mb-1" style={{ fontSize: '0.7em' }}>
              {skill}
            </Badge>
          ))}
          {job.requiredSkills.length > 4 && (
            <Badge bg="secondary" className="mb-1" style={{ fontSize: '0.7em' }}>
              +{job.requiredSkills.length - 4}
            </Badge>
          )}
        </div>

        {job.accommodation && job.accommodationCost && (
          <div className="small text-success mb-2">
            💰 Ubytování: {job.accommodationCost}
          </div>
        )}

        {job.languageRequirement && (
          <div className="small text-info mb-2">
            📝 Jazyk: {job.languageRequirement}
          </div>
        )}

        {job.startDate && (
          <div className="small text-warning">
            📅 Nástup: {job.startDate}
          </div>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between bg-dark text-white border-secondary">
        <Button variant="outline-light" size="sm" onClick={() => setShowDetails(true)}>
          📋 Detail
        </Button>
        {onImport && (
          <Button variant="primary" size="sm" onClick={() => onImport(job)}>
            ➕ Přidat do mých nabídek
          </Button>
        )}
      </Card.Footer>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" className="dark-modal">
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title className="text-white">{job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Row>
            <Col md={8}>
              <h6 className="text-white">📋 Popis pozice</h6>
              <p className="text-light">{job.notes}</p>
              
              <h6 className="text-white">🔧 Požadované dovednosti</h6>
              <div className="mb-3 d-flex flex-wrap gap-1" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                {job.requiredSkills.map((skill, idx) => (
                  <Badge key={idx} bg="primary" className="me-1 mb-1">{skill}</Badge>
                ))}
              </div>

              {job.languageRequirement && (
                <>
                  <h6 className="text-white">🌍 Jazykové požadavky</h6>
                  <p className="text-light">{job.languageRequirement}</p>
                </>
              )}
            </Col>
            <Col md={4}>
              <Card className="bg-dark text-light border-secondary">
                <Card.Body>
                  <h6 className="text-white">💼 Detaily</h6>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="bg-dark text-light border-secondary">
                      <strong className="text-white">Agentura:</strong><br /><span className="text-light">{job.agencyName}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary">
                      <strong className="text-white">Město:</strong><br /><span className="text-light">{job.location}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary">
                      <strong className="text-white">Plat:</strong><br /><span className="text-success">{job.salaryRange}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary">
                      <strong className="text-white">Typ:</strong><br /><JobTypeBadge type={job.jobType} />
                    </ListGroup.Item>
                    {job.accommodation && (
                      <ListGroup.Item className="bg-dark text-light border-secondary">
                        <strong className="text-white">Ubytování:</strong><br />
                        <AccommodationBadge type={job.accommodationType} />
                        <span className="small text-success">{job.accommodationCost}</span>
                      </ListGroup.Item>
                    )}
                    {job.transportProvided && (
                      <ListGroup.Item className="bg-dark text-light border-secondary">
                        <strong className="text-white">Doprava:</strong> <span className="text-success">Zajištěna</span>
                      </ListGroup.Item>
                    )}
                    {job.foreignWorkerFriendly && (
                      <ListGroup.Item className="bg-dark text-light border-secondary">
                        <strong className="text-white">Cizinci:</strong> <span className="text-success">✅ Vhodné</span>
                      </ListGroup.Item>
                    )}
                    {job.startDate && (
                      <ListGroup.Item className="bg-dark text-light border-secondary">
                        <strong className="text-white">Nástup:</strong> {job.startDate}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white border-secondary">
          <Button variant="outline-light" onClick={() => setShowDetails(false)}>
            Zavřít
          </Button>
          {onImport && (
            <Button variant="primary" onClick={() => { onImport(job); setShowDetails(false); }}>
              Přidat do mých nabídek
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

const AgencyCard = ({ agency }: { agency: Agency }) => {
  const [showDetails, setShowDetails] = useState(false);
  const agencyJobs = AGENCY_JOBS.filter(j => j.agencyId === agency.id);

  return (
    <>
      <Card className="h-100 bg-dark text-white border-secondary" style={{ cursor: 'pointer' }} onClick={() => setShowDetails(true)}>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-start">
            <span>{agency.name}</span>
            <Badge bg={agency.foreignWorkerFriendly ? 'success' : 'secondary'}>
              {agency.foreignWorkerFriendly ? '🌍 Cizinci' : '❌ Cizinci'}
            </Badge>
          </Card.Title>
          <Card.Text className="small text-light">{agency.description}</Card.Text>
          <div className="mb-2">
            {agency.specialties.slice(0, 3).map((spec, idx) => (
              <Badge key={idx} bg="primary" className="me-1 mb-1">{spec}</Badge>
            ))}
          </div>
          <div className="small text-light">
            ⭐ {agency.rating.toFixed(1)} ({agency.reviewsCount} recenzí)
            {agency.accommodationProvided && <span className="ms-2 text-success">🏠 Ubytování</span>}
          </div>
        </Card.Body>
        <Card.Footer className="small bg-dark text-light border-secondary">
          📍 {agency.city} • {agency.phone}
        </Card.Footer>
      </Card>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="xl" className="dark-modal">
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title className="text-white">{agency.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Tabs defaultActiveKey="info" className="mb-3">
            <Tab eventKey="info" title="Informace">
              <Row>
                <Col md={8}>
                  <h5 className="text-white">O agentuře</h5>
                  <p className="text-light">{agency.description}</p>
                  <h6 className="text-white">Specializace</h6>
                  <div className="mb-3">
                    {agency.specialties.map((spec, idx) => (
                      <Badge key={idx} bg="primary" className="me-1">{spec}</Badge>
                    ))}
                  </div>
                </Col>
                <Col md={4}>
                  <Card className="bg-dark text-light border-secondary">
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-dark text-light border-secondary">
                          <strong className="text-white">📍 Město:</strong> {agency.city}
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-light border-secondary">
                          <strong className="text-white">📧 Email:</strong> {agency.email}
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-light border-secondary">
                          <strong className="text-white">📞 Telefon:</strong> {agency.phone}
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-light border-secondary">
                          <strong className="text-white">🌐 Web:</strong>{' '}
                          <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-primary">
                            {agency.website}
                          </a>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-light border-secondary">
                          <strong className="text-white">🏠 Ubytování:</strong>{' '}
                          {agency.accommodationProvided ? '✅ Ano' : '❌ Ne'}
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-light border-secondary">
                          <strong className="text-white">🌍 Cizinci:</strong>{' '}
                          {agency.foreignWorkerFriendly ? '✅ Vhodné' : '❌ Nevhodné'}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="jobs" title={`Nabídky (${agencyJobs.length})`}>
              <Row>
                {agencyJobs.length > 0 ? (
                  agencyJobs.map(job => (
                    <Col md={6} lg={4} key={job.id}>
                      <JobCard job={job} agency={agency} />
                    </Col>
                  ))
                ) : (
                  <Col>
                    <p className="text-light">Žádné aktuální nabídky.</p>
                  </Col>
                )}
              </Row>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white border-secondary">
          <Button variant="outline-light" href={agency.website} target="_blank">
            🌐 Navštívit web
          </Button>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default function AgencySection({ onImportToJobs }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [onlyAccommodation, setOnlyAccommodation] = useState(false);
  const [onlyForeignFriendly, setOnlyForeignFriendly] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'warning' | 'info'>('success');

  const showNotification = (message: string, variant: 'success' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const filteredJobs = useMemo(() => {
    return AGENCY_JOBS.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRegion = selectedRegion === 'all' || job.region === selectedRegion;
      const matchesAccommodation = !onlyAccommodation || job.accommodation;
      const matchesForeign = !onlyForeignFriendly || job.foreignWorkerFriendly;

      return matchesSearch && matchesRegion && matchesAccommodation && matchesForeign;
    });
  }, [searchTerm, selectedRegion, onlyAccommodation, onlyForeignFriendly]);

  const filteredAgencies = useMemo(() => {
    return CZECH_AGENCIES.filter(agency => {
      const matchesSearch = 
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRegion = selectedRegion === 'all' || agency.city === selectedRegion;
      const matchesAccommodation = !onlyAccommodation || agency.accommodationProvided;
      const matchesForeign = !onlyForeignFriendly || agency.foreignWorkerFriendly;

      return matchesSearch && matchesRegion && matchesAccommodation && matchesForeign;
    });
  }, [searchTerm, selectedRegion, onlyAccommodation, onlyForeignFriendly]);

  const handleImportJob = (job: AgencyJob) => {
    if (onImportToJobs) {
      onImportToJobs(job);
      showNotification(`Přidáno: ${job.title}`, 'success');
    } else {
      showNotification('Funkce importu není aktivní', 'info');
    }
  };

  const accommodationCount = AGENCY_JOBS.filter(j => j.accommodation).length;
  const foreignFriendlyCount = AGENCY_JOBS.filter(j => j.foreignWorkerFriendly).length;
  const totalJobs = AGENCY_JOBS.length;

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h4 className="mb-3">🏢 České pracovní agentury</h4>
          <p className="text-muted">
            Přehled pracovních agentur v ČR a jejich nabídek s ubytováním
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Badge bg="primary" style={{ fontSize: '1em' }}>
              📋 {totalJobs} nabídek
            </Badge>
            <Badge bg="success" style={{ fontSize: '1em' }}>
              🏠 {accommodationCount} s ubytováním
            </Badge>
            <Badge bg="warning" text="dark" style={{ fontSize: '1em' }}>
              🌍 {foreignFriendlyCount} pro cizince
            </Badge>
          </div>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Label className="small text-muted">🔍 Hledat</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Název, agentura, dovednost..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                  ✕
                </Button>
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Label className="small text-muted">📍 Kraj</Form.Label>
              <Form.Select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">Všechny kraje</option>
                {REGIONS.map(region => (
                  <option key={region.value} value={region.value}>{region.label}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label className="small text-muted">🎛️ Filtry</Form.Label>
              <div className="d-flex gap-2">
                <Form.Check
                  type="switch"
                  id="accommodation-filter"
                  label="🏠 Ubytování"
                  checked={onlyAccommodation}
                  onChange={(e) => setOnlyAccommodation(e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="foreign-filter"
                  label="🌍 Cizinci"
                  checked={onlyForeignFriendly}
                  onChange={(e) => setOnlyForeignFriendly(e.target.checked)}
                />
              </div>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button 
                variant="outline-secondary" 
                className="w-100"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('all');
                  setOnlyAccommodation(false);
                  setOnlyForeignFriendly(false);
                }}
              >
                🔄 Resetovat
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)} className="mb-3">
        <Tab 
          eventKey="jobs" 
          title={`📋 Nabídky (${filteredJobs.length})`}
        >
          {filteredJobs.length > 0 ? (
            <Row>
              {filteredJobs.map(job => {
                const agency = CZECH_AGENCIES.find(a => a.id === job.agencyId);
                return (
                  <Col md={6} lg={4} key={job.id} className="mb-3">
                    <JobCard job={job} agency={agency} onImport={handleImportJob} />
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Card className="text-center py-5">
              <Card.Text className="text-muted">
                😕 Nenalezena žádná nabídka odpovídající filtrům
              </Card.Text>
            </Card>
          )}
        </Tab>
        
        <Tab 
          eventKey="agencies" 
          title={`🏢 Agentury (${filteredAgencies.length})`}
        >
          {filteredAgencies.length > 0 ? (
            <Row>
              {filteredAgencies.map(agency => (
                <Col md={6} lg={4} key={agency.id} className="mb-3">
                  <AgencyCard agency={agency} />
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="text-center py-5">
              <Card.Text className="text-muted">
                😕 Nenalezena žádná agentura odpovídající filtrům
              </Card.Text>
            </Card>
          )}
        </Tab>
      </Tabs>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          bg={toastVariant === 'success' ? 'success' : toastVariant === 'warning' ? 'warning' : 'info'}
          delay={3000} 
          autohide
        >
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
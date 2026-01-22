"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, Badge, ProgressBar, Button, Modal, Row, Col, Tabs, Tab, Dropdown, Toast, ToastContainer, Form, InputGroup } from 'react-bootstrap';
import { UserCertification, Certification, CertificationStatus, CertificationCategory } from '@/types';
import { CERTIFICATION_DATA, CERTIFICATION_CATEGORIES, getTrendingCertifications, getCertificationsByCategory, searchCertifications } from '@/data/certifications/data';
import { LICENSE_DATA, LICENSE_CATEGORIES, REGULATION_DATA, getLicenseById, getRegulationById } from '@/data/certifications/licenses';

const ArchiveDropZone = ({ onDrop }: { onDrop: (certId: string) => void }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const certId = e.dataTransfer.getData('text/plain');
    if (certId) {
      onDrop(certId);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded p-3 text-center text-muted ${isOver ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ minHeight: '100px', transition: 'all 0.2s' }}
    >
      <div className="fs-2 mb-2">📜</div>
      <div>Drop here to archive</div>
    </div>
  );
};

type Props = {
  myCourses: any[];
  setCourses?: React.Dispatch<React.SetStateAction<any[]>>;
};

const STATUS_CONFIG: Record<CertificationStatus, { label: string; variant: string; color: string }> = {
  'Not Started': { label: 'Not Started', variant: 'secondary', color: '#6c757d' },
  'In Progress': { label: 'In Progress', variant: 'warning', color: '#ffc107' },
  'Scheduled': { label: 'Scheduled', variant: 'info', color: '#0dcaf0' },
  'Passed': { label: 'Passed', variant: 'success', color: '#198754' },
  'Failed': { label: 'Failed', variant: 'danger', color: '#dc3545' },
  'Expired': { label: 'Expired', variant: 'dark', color: '#212529' }
};

export const CERTIFICATION_TEMPLATES: (Partial<UserCertification> & { template: Certification })[] = [
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'aws-saa')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'aws-devops')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'aws-security')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'azure-104')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'cissp')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'oscp')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'security-plus')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'gcp-ace')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'pmp')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'cka')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'ccna')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  },
  {
    template: CERTIFICATION_DATA.find(c => c.id === 'kubernetes-developer')!,
    status: 'Not Started',
    attemptCount: 0,
    notes: '',
    resources: []
  }
];

export default function CertificationSection({ myCourses }: Props) {
  const [certifications, setCertifications] = useState<UserCertification[]>([]);
  const [archivedCerts, setArchivedCerts] = useState<UserCertification[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<UserCertification | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'warning' | 'info'>('success');

  useEffect(() => {
    const savedCerts = localStorage.getItem('certifications');
    const savedArchivedCerts = localStorage.getItem('archivedCerts');

    if (savedCerts) {
      try {
        setCertifications(JSON.parse(savedCerts));
      } catch (error) {
        console.error('Failed to parse certifications:', error);
        setCertifications([]);
      }
    }

    if (savedArchivedCerts) {
      try {
        setArchivedCerts(JSON.parse(savedArchivedCerts));
      } catch (error) {
        console.error('Failed to parse archived certifications:', error);
        setArchivedCerts([]);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && certifications.length >= 0) {
      localStorage.setItem('certifications', JSON.stringify(certifications));
    }
  }, [certifications, isLoading]);

  useEffect(() => {
    localStorage.setItem('archivedCerts', JSON.stringify(archivedCerts));
  }, [archivedCerts]);

  const showToastMessage = (message: string, variant: 'success' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const updateCertStatus = (certId: string, newStatus: CertificationStatus) => {
    setCertifications(prev => prev.map(cert =>
      cert.id === certId ? { ...cert, status: newStatus } : cert
    ));
    showToastMessage(`Status updated to ${STATUS_CONFIG[newStatus].label}`, 'success');
  };

  const handleAddCertification = (template: Certification) => {
    const newCert: UserCertification = {
      id: `cert-${Date.now()}`,
      certificationId: template.id,
      name: template.name,
      provider: template.provider,
      category: template.category || 'General IT',
      status: 'Not Started',
      attemptCount: 0,
      notes: '',
      resources: [],
      difficulty: template.difficulty,
      cost: template.cost,
      validityMonths: template.validityMonths,
      careerImpact: template.careerImpact
    };

    setCertifications(prev => [...prev, newCert]);
    showToastMessage(`Added: ${template.name}`, 'success');
    setShowAddModal(false);
  };

  const archiveCertification = (certId: string) => {
    const cert = certifications.find(c => c.id === certId);
    if (cert) {
      setCertifications(prev => prev.filter(c => c.id !== certId));
      setArchivedCerts(prev => [...prev, cert]);
      showToastMessage(`Archived: ${cert.name}`, 'warning');
    }
  };

  const restoreCertification = (cert: UserCertification) => {
    setArchivedCerts(prev => prev.filter(c => c.id !== cert.id));
    setCertifications(prev => [...prev, cert]);
    showToastMessage(`Restored: ${cert.name}`, 'success');
  };

  const removeCertification = (certId: string) => {
    const cert = certifications.find(c => c.id === certId);
    if (cert) {
      setCertifications(prev => prev.filter(c => c.id !== certId));
      showToastMessage(`Removed: ${cert.name}`, 'warning');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, cert: UserCertification) => {
    e.preventDefault();
    setSelectedCert(cert);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: CertificationStatus) => {
    return STATUS_CONFIG[status]?.variant || 'secondary';
  };

  const getStatusColorHex = (status: CertificationStatus) => {
    return STATUS_CONFIG[status]?.color || '#6c757d';
  };

  const getFilteredCerts = () => {
    let filtered = certifications;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(cert => cert.status === filterStatus);
    }

    return filtered;
  };

  const getCompletionStats = () => {
    const total = certifications.length;
    const completed = certifications.filter(c => c.status === 'Passed').length;
    const inProgress = certifications.filter(c => c.status === 'In Progress' || c.status === 'Scheduled').length;
    return { total, completed, inProgress };
  };

  const stats = getCompletionStats();
  const filteredCerts = getFilteredCerts();

  if (isLoading) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-warning text-dark d-flex align-items-center">
          <span className="me-2">📜</span>
          <span className="fw-bold">Certification Board</span>
        </Card.Header>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <div className="text-muted">Loading certifications...</div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Header className="bg-warning text-dark d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)' }}>
          <span className="me-2 fs-5">📜</span>
          <span className="fw-bold fs-5">Certification Board</span>
          <Badge bg="light" text="dark" className="ms-auto">{certifications.length}</Badge>
        </Card.Header>

        <Card.Body className="p-3" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <Row className="mb-3">
            <Col xs={12}>
              <div className="d-flex gap-2 flex-wrap mb-2">
                <Button
                  variant={filterStatus === 'all' ? 'dark' : 'outline-dark'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All ({certifications.length})
                </Button>
                {(['In Progress', 'Scheduled', 'Passed'] as CertificationStatus[]).map(status => {
                  const count = certifications.filter(c => c.status === status).length;
                  if (count > 0) {
                    return (
                      <Button
                        key={status}
                        variant={filterStatus === status ? 'dark' : 'outline-dark'}
                        size="sm"
                        onClick={() => setFilterStatus(status)}
                      >
                        {STATUS_CONFIG[status].label} ({count})
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
            </Col>
          </Row>

          {certifications.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div className="fs-1 mb-3">📜</div>
              <p className="mb-3">No certifications tracked yet</p>
              <Button variant="warning" onClick={() => setShowAddModal(true)}>
                + Add Certification
              </Button>
            </div>
          ) : (
            <div className="certification-list">
              {filteredCerts.map(cert => {
                const statusConfig = STATUS_CONFIG[cert.status];
                const progress = cert.status === 'Passed' ? 100 : cert.status === 'In Progress' ? 50 : 0;

                return (
                  <Card
                    key={cert.id}
                    className="mb-2 certification-card"
                    style={{ cursor: 'context-menu' }}
                    draggable
                    onDragStart={(e) => { e.dataTransfer.setData('text/plain', cert.id); }}
                    onContextMenu={(e) => handleContextMenu(e, cert)}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1 fw-bold">{cert.name}</h6>
                          <small className="text-muted">{cert.provider}</small>
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant={statusConfig.variant}
                            size="sm"
                            className="fw-bold"
                          >
                            {statusConfig.label}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {(['Not Started', 'In Progress', 'Scheduled', 'Passed', 'Failed'] as CertificationStatus[]).map(status => (
                              <Dropdown.Item
                                key={status}
                                onClick={() => updateCertStatus(cert.id, status)}
                              >
                                {STATUS_CONFIG[status].label}
                              </Dropdown.Item>
                            ))}
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => archiveCertification(cert.id)}
                              className="text-warning"
                            >
                              📁 Archive
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => removeCertification(cert.id)}
                              className="text-danger"
                            >
                              🗑️ Remove
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <div className="mb-2">
                        <Badge
                          bg="light"
                          text="dark"
                          className="me-1"
                          style={{ backgroundColor: '#e9ecef' }}
                        >
                          {cert.category}
                        </Badge>
                        <Badge
                          bg="light"
                          text="dark"
                          className="me-1"
                          style={{ backgroundColor: '#e9ecef' }}
                        >
                          ⚡ {cert.difficulty}/5
                        </Badge>
                        {cert.cost > 0 && (
                          <Badge bg="light" text="dark">
                            💰 ${cert.cost}
                          </Badge>
                        )}
                      </div>

                      <ProgressBar
                        now={progress}
                        variant={statusConfig.variant}
                        style={{ height: '6px' }}
                        className="mb-2"
                      />

                      {cert.notes && (
                        <small className="text-muted d-block mt-2">
                          📝 {cert.notes.length > 50 ? cert.notes.substring(0, 50) + '...' : cert.notes}
                        </small>
                      )}

                      {cert.attemptCount > 0 && (
                        <small className="text-muted">
                          🔄 Attempts: {cert.attemptCount}
                        </small>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          )}

          {certifications.length > 0 && (
            <Row className="mt-3">
              <Col xs={12}>
                <Card className="bg-light">
                  <Card.Body className="p-3">
                    <Row>
                      <Col xs={4} className="text-center">
                        <div className="fw-bold fs-4 text-success">{stats.completed}</div>
                        <small className="text-muted">Completed</small>
                      </Col>
                      <Col xs={4} className="text-center">
                        <div className="fw-bold fs-4 text-warning">{stats.inProgress}</div>
                        <small className="text-muted">In Progress</small>
                      </Col>
                      <Col xs={4} className="text-center">
                        <div className="fw-bold fs-4">{stats.total}</div>
                        <small className="text-muted">Total</small>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Card.Body>

        <Card.Footer className="p-2">
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-warning" size="sm" onClick={() => setShowAddModal(true)}>
              + Add
            </Button>
            <small className="text-muted">
              {certifications.filter(c => c.status === 'Passed').length} passed
            </small>
          </div>
        </Card.Footer>
      </Card>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>📜 Add Certification</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3 bg-light border-bottom">
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </div>

          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <Tabs defaultActiveKey="Trending" className="custom-tabs" fill variant="pills">
              <Tab
                eventKey="Trending"
                title={<span className="fw-bold">🔥 Trending</span>}
              >
                <div className="p-3">
                  <Row>
                    {getTrendingCertifications(12)
                      .filter(c => !certifications.some(uc => uc.certificationId === c.id))
                      .map(cert => (
                        <Col key={cert.id} md={6} lg={4} className="mb-3">
                          <Card className="h-100 certification-template-card">
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <Badge style={{ backgroundColor: CERTIFICATION_CATEGORIES.find(cat => cat.name === cert.category)?.color || '#6c757d' }}>
                                  {CERTIFICATION_CATEGORIES.find(cat => cat.name === cert.category)?.icon} {cert.category}
                                </Badge>
                                <small className="text-muted">${cert.cost}</small>
                              </div>
                              <h6 className="fw-bold mb-1">{cert.name}</h6>
                              <small className="text-muted d-block mb-2">{cert.provider}</small>
                              <p className="small mb-2 text-muted">
                                {cert.description.substring(0, 80)}...
                              </p>
                              <div className="d-flex gap-1 flex-wrap mb-2">
                                <Badge bg="secondary" pill>⚡ {cert.difficulty}/5</Badge>
                                <Badge bg="secondary" pill>⏱️ {cert.duration}</Badge>
                                <Badge bg="secondary" pill>📊 {cert.careerValue}%</Badge>
                              </div>
                              <Button
                                variant="warning"
                                size="sm"
                                className="w-100"
                                onClick={() => handleAddCertification(cert)}
                              >
                                + Add to Track
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </div>
              </Tab>

              {CERTIFICATION_CATEGORIES.map(cat => (
                <Tab
                  key={cat.name}
                  eventKey={cat.name}
                  title={<span className="fw-bold">{cat.icon} {cat.name}</span>}
                >
                  <div className="p-3">
                    <Row>
                      {getCertificationsByCategory(cat.name as CertificationCategory)
                        .filter(c => !certifications.some(uc => uc.certificationId === c.id))
                        .map(cert => (
                          <Col key={cert.id} md={6} lg={4} className="mb-3">
                            <Card className="h-100 certification-template-card">
                              <Card.Body className="p-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <Badge style={{ backgroundColor: cat.color }}>
                                    {cat.icon} {cert.provider}
                                  </Badge>
                                  <small className="text-muted">${cert.cost}</small>
                                </div>
                                <h6 className="fw-bold mb-1">{cert.name}</h6>
                                <p className="small mb-2 text-muted">
                                  {cert.description.substring(0, 80)}...
                                </p>
                                <div className="d-flex gap-1 flex-wrap mb-2">
                                  <Badge bg="secondary" pill>⚡ {cert.difficulty}/5</Badge>
                                  <Badge bg="secondary" pill>⏱️ {cert.duration}</Badge>
                                  <Badge bg="secondary" pill>📊 {cert.careerValue}%</Badge>
                                </div>
                                <Button
                                  variant="warning"
                                  size="sm"
                                  className="w-100"
                                  onClick={() => handleAddCertification(cert)}
                                >
                                  + Add to Track
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Tab>
                ))}

                <Tab
                  eventKey="Licenses"
                  title={<span className="fw-bold">📋 Licences & Vyhlášky</span>}
                >
                  <div className="p-3">
                    <div className="mb-3">
                      <h6 className="fw-bold mb-3">🔐 Open Source Licence</h6>
                      <Row>
                        {LICENSE_DATA.filter(l => l.type === 'Open Source').slice(0, 12).map(license => (
                          <Col key={license.id} md={6} lg={4} className="mb-3">
                            <Card className="h-100 certification-template-card" style={{ borderLeft: `4px solid ${LICENSE_CATEGORIES.find(c => c.name.includes(license.category))?.color || '#6c757d'}` }}>
                              <Card.Body className="p-3">
                                <Badge 
                                  bg={license.popularity === 'high' ? 'success' : license.popularity === 'medium' ? 'warning' : 'secondary'}
                                  className="mb-2"
                                  pill
                                >
                                  {license.popularity === 'high' ? '🔥 Popular' : license.popularity === 'medium' ? '📊 Medium' : '📉 Niche'}
                                </Badge>
                                <h6 className="fw-bold mb-1">{license.name}</h6>
                                <small className="text-muted d-block mb-2">{license.shortDescription}</small>
                                <div className="d-flex gap-1 flex-wrap mb-2">
                                  <Badge bg="secondary" pill>⚡ {license.difficulty}/5</Badge>
                                  <Badge bg="secondary" pill>📊 {license.careerValue}%</Badge>
                                </div>
                                <small className="text-muted">{license.usage}</small>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>

                    <div className="mb-3">
                      <h6 className="fw-bold mb-3 mt-4">📜 Regule & Normy</h6>
                      <Row>
                        {REGULATION_DATA.slice(0, 12).map(reg => (
                          <Col key={reg.id} md={6} lg={4} className="mb-3">
                            <Card className="h-100 certification-template-card" style={{ borderLeft: '4px solid #607D8B' }}>
                              <Card.Body className="p-3">
                                <Badge bg="info" className="mb-2" pill>{reg.complexity}</Badge>
                                <h6 className="fw-bold mb-1">{reg.name}</h6>
                                <small className="text-muted d-block mb-2">{reg.shortDescription}</small>
                                <small className="text-muted d-block mb-2">
                                  <Badge bg="light" text="dark" className="me-1">{reg.jurisdiction}</Badge>
                                  <Badge bg="light" text="dark">{reg.category}</Badge>
                                </small>
                                <small className="text-muted">
                                  {reg.requirements.length} key requirements
                                </small>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Modal.Body>
        </Modal>

      <Modal show={showDetailModal && selectedCert !== null} onHide={() => { setShowDetailModal(false); setSelectedCert(null); }} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>📜 {selectedCert?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCert && (
            <div>
              <Row className="mb-3">
                <Col xs={6}>
                  <small className="text-muted">Provider</small>
                  <div className="fw-bold">{selectedCert.provider}</div>
                </Col>
                <Col xs={6}>
                  <small className="text-muted">Category</small>
                  <div className="fw-bold">{selectedCert.category}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4}>
                  <small className="text-muted">Difficulty</small>
                  <div className="fw-bold">⚡ {selectedCert.difficulty}/5</div>
                </Col>
                <Col xs={4}>
                  <small className="text-muted">Cost</small>
                  <div className="fw-bold">💰 ${selectedCert.cost}</div>
                </Col>
                <Col xs={4}>
                  <small className="text-muted">Attempts</small>
                  <div className="fw-bold">🔄 {selectedCert.attemptCount}</div>
                </Col>
              </Row>

              <div className="mb-3">
                <small className="text-muted">Career Impact</small>
                <div className="fw-bold text-success">{selectedCert.careerImpact}</div>
              </div>

              {selectedCert.notes && (
                <div className="mb-3">
                  <small className="text-muted">Notes</small>
                  <div className="bg-light p-2 rounded">{selectedCert.notes}</div>
                </div>
              )}

              <div className="mb-3">
                <small className="text-muted">Change Status</small>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {(['Not Started', 'In Progress', 'Scheduled', 'Passed', 'Failed'] as CertificationStatus[]).map(status => (
                    <Button
                      key={status}
                      variant={selectedCert.status === status ? 'warning' : 'outline-warning'}
                      size="sm"
                      onClick={() => {
                        updateCertStatus(selectedCert.id, status);
                        setSelectedCert(prev => prev ? { ...prev, status } : null);
                      }}
                    >
                      {STATUS_CONFIG[status].label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowDetailModal(false); setSelectedCert(null); }}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              if (selectedCert) {
                archiveCertification(selectedCert.id);
                setShowDetailModal(false);
                setSelectedCert(null);
              }
            }}
          >
            Archive
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg={toastVariant}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

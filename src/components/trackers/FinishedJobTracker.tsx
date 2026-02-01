'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Badge, ProgressBar, Button, Modal, Form, OverlayTrigger, Tooltip, ListGroup, Collapse } from 'react-bootstrap';
import { FiPlus, FiCheck, FiClock, FiAlertTriangle, FiEdit2, FiTrash2, FiChevronDown, FiChevronRight, FiDollarSign, FiTarget, FiCalendar, FiArchive, FiPlay, FiPause, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import {
  FinishedJob,
  JobMilestone,
  JobChecklistItem,
  JobStatus,
  JobPriority,
  JobType,
  JOB_TYPES,
  JOB_PRIORITIES,
  JOB_STATUSES,
  calculateJobProgress
} from '@/types/trackers';

interface FinishedJobTrackerProps {
  className?: string;
}

const FinishedJobTracker: React.FC<FinishedJobTrackerProps> = ({ className = '' }) => {
  const [jobs, setJobs] = useState<FinishedJob[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<FinishedJob | null>(null);
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>([]);
  const [newJob, setNewJob] = useState<Partial<FinishedJob>>({
    type: 'freelance',
    status: 'not_started',
    priority: 'medium',
    progress: 0,
    milestones: [],
    totalHoursEstimate: 0,
    hoursSpent: 0,
    isPaid: false,
    tags: [],
    blockers: [],
    xpReward: 100,
    isArchived: false,
  });
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [addingMilestoneToJob, setAddingMilestoneToJob] = useState<string | null>(null);
  const [addingChecklistToMilestone, setAddingChecklistToMilestone] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('finishedJobTracker');
    if (saved) {
      try {
        setJobs(JSON.parse(saved));
      } catch {
        setJobs([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('finishedJobTracker', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = () => {
    if (!newJob.title) return;

    const job: FinishedJob = {
      id: `job_${Date.now()}`,
      title: newJob.title!,
      description: newJob.description || '',
      type: newJob.type as JobType,
      client: newJob.client,
      status: newJob.status as JobStatus,
      priority: newJob.priority as JobPriority,
      progress: 0,
      startDate: new Date().toISOString(),
      dueDate: newJob.dueDate,
      milestones: [],
      totalHoursEstimate: newJob.totalHoursEstimate || 0,
      hoursSpent: 0,
      payment: newJob.payment,
      isPaid: false,
      tags: newJob.tags || [],
      blockers: [],
      notes: newJob.notes || '',
      xpReward: newJob.xpReward || 100,
      isArchived: false,
    };

    setJobs(prev => [...prev, job]);
    setShowAddModal(false);
    resetNewJob();
  };

  const resetNewJob = () => {
    setNewJob({
      type: 'freelance',
      status: 'not_started',
      priority: 'medium',
      progress: 0,
      milestones: [],
      totalHoursEstimate: 0,
      hoursSpent: 0,
      isPaid: false,
      tags: [],
      blockers: [],
      xpReward: 100,
      isArchived: false,
    });
  };

  const handleAddMilestone = (jobId: string) => {
    if (!newMilestoneTitle.trim()) return;

    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;

      const milestone: JobMilestone = {
        id: `milestone_${Date.now()}`,
        title: newMilestoneTitle,
        description: '',
        isCompleted: false,
        checklist: [],
      };

      const updatedJob = {
        ...j,
        milestones: [...j.milestones, milestone],
      };

      return {
        ...updatedJob,
        progress: calculateJobProgress(updatedJob),
      };
    }));

    setNewMilestoneTitle('');
    setAddingMilestoneToJob(null);
  };

  const handleAddChecklistItem = (jobId: string, milestoneId: string) => {
    if (!newChecklistItem.trim()) return;

    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;

      const updatedJob = {
        ...j,
        milestones: j.milestones.map(m => {
          if (m.id !== milestoneId) return m;

          const item: JobChecklistItem = {
            id: `item_${Date.now()}`,
            title: newChecklistItem,
            isCompleted: false,
            weight: 1,
          };

          return {
            ...m,
            checklist: [...m.checklist, item],
          };
        }),
      };

      return {
        ...updatedJob,
        progress: calculateJobProgress(updatedJob),
      };
    }));

    setNewChecklistItem('');
    setAddingChecklistToMilestone(null);
  };

  const handleToggleChecklistItem = (jobId: string, milestoneId: string, itemId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;

      const updatedJob = {
        ...j,
        milestones: j.milestones.map(m => {
          if (m.id !== milestoneId) return m;

          const updatedChecklist = m.checklist.map(item => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              isCompleted: !item.isCompleted,
              completedAt: !item.isCompleted ? new Date().toISOString() : undefined,
            };
          });

          const allCompleted = updatedChecklist.every(i => i.isCompleted);

          return {
            ...m,
            checklist: updatedChecklist,
            isCompleted: allCompleted,
            completedAt: allCompleted ? new Date().toISOString() : undefined,
          };
        }),
      };

      const progress = calculateJobProgress(updatedJob);
      const allMilestonesCompleted = updatedJob.milestones.length > 0 &&
        updatedJob.milestones.every(m => m.isCompleted);

      return {
        ...updatedJob,
        progress,
        status: progress === 100 || allMilestonesCompleted ? 'completed' : updatedJob.status === 'not_started' ? 'in_progress' : updatedJob.status,
        completedDate: (progress === 100 || allMilestonesCompleted) ? new Date().toISOString() : undefined,
      };
    }));

    // Refresh selected job
    if (selectedJob?.id === jobId) {
      const updated = jobs.find(j => j.id === jobId);
      if (updated) {
        setSelectedJob({ ...updated });
      }
    }
  };

  const handleUpdateJobStatus = (jobId: string, status: JobStatus) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;
      return {
        ...j,
        status,
        completedDate: status === 'completed' ? new Date().toISOString() : j.completedDate,
      };
    }));
  };

  const handleDeleteJob = (jobId: string) => {
    if (!confirm('Opravdu smazat tuto práci?')) return;
    setJobs(prev => prev.filter(j => j.id !== jobId));
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleArchiveJob = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;
      return { ...j, isArchived: !j.isArchived };
    }));
  };

  const toggleMilestoneExpand = (milestoneId: string) => {
    setExpandedMilestones(prev =>
      prev.includes(milestoneId)
        ? prev.filter(id => id !== milestoneId)
        : [...prev, milestoneId]
    );
  };

  // Stats
  const stats = useMemo(() => {
    const activeJobs = jobs.filter(j => !j.isArchived);
    const inProgress = activeJobs.filter(j => j.status === 'in_progress').length;
    const completed = activeJobs.filter(j => j.status === 'completed').length;
    const overdue = activeJobs.filter(j => {
      if (!j.dueDate || j.status === 'completed') return false;
      return new Date(j.dueDate) < new Date();
    }).length;
    const totalPayment = activeJobs
      .filter(j => j.status === 'completed' && j.payment)
      .reduce((sum, j) => sum + (j.payment || 0), 0);
    const avgProgress = activeJobs.length > 0
      ? activeJobs.reduce((sum, j) => sum + j.progress, 0) / activeJobs.length
      : 0;
    const critical = activeJobs.filter(j => j.priority === 'critical' && j.status !== 'completed').length;

    return { inProgress, completed, overdue, totalPayment, avgProgress, critical };
  }, [jobs]);

  const activeJobs = useMemo(() => {
    return jobs
      .filter(j => !j.isArchived)
      .sort((a, b) => {
        // Sort by: critical first, then by progress (lowest first), then by due date
        if (a.priority === 'critical' && b.priority !== 'critical') return -1;
        if (b.priority === 'critical' && a.priority !== 'critical') return 1;
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (b.status === 'completed' && a.status !== 'completed') return -1;
        return a.progress - b.progress;
      });
  }, [jobs]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusColor = (status: JobStatus) => {
    return JOB_STATUSES.find(s => s.key === status)?.color || '#9E9E9E';
  };

  const getPriorityColor = (priority: JobPriority) => {
    return JOB_PRIORITIES.find(p => p.key === priority)?.color || '#9E9E9E';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <>
      <Row className={`mb-4 ${className}`}>
        <Col>
          <Card
            className="border-0 shadow-sm glass-effect"
            style={{
              background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(13, 71, 161, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(33, 150, 243, 0.2)'
            }}
          >
            <Card.Body className="py-3 px-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                {/* Header */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    bg="dark"
                    className="border text-white px-3 py-2"
                    style={{ borderColor: 'rgba(33, 150, 243, 0.5) !important' }}
                  >
                    <span className="me-2">📋</span> JOB TRACKER
                  </Badge>

                  <OverlayTrigger placement="top" overlay={<Tooltip>Přidat práci</Tooltip>}>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setShowAddModal(true)}
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                    >
                      <FiPlus size={16} />
                    </Button>
                  </OverlayTrigger>
                </div>

                {/* Jobs Preview */}
                <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                  {activeJobs.slice(0, 4).map(job => {
                    const jobType = JOB_TYPES.find(t => t.key === job.type);
                    const isOverdue = job.dueDate && new Date(job.dueDate) < new Date() && job.status !== 'completed';
                    const daysLeft = job.dueDate ? getDaysUntilDue(job.dueDate) : null;

                    return (
                      <OverlayTrigger
                        key={job.id}
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            <div className="text-start p-1">
                              <strong>{job.title}</strong>
                              {job.client && <div className="text-white-50">Klient: {job.client}</div>}
                              <div style={{ fontSize: '0.75rem' }}>
                                <div>📊 Progress: {job.progress}%</div>
                                <div>⏱️ {job.hoursSpent}/{job.totalHoursEstimate}h</div>
                                {job.payment && <div>💰 {formatCurrency(job.payment)}</div>}
                                {daysLeft !== null && (
                                  <div className={daysLeft < 0 ? 'text-danger' : daysLeft < 3 ? 'text-warning' : ''}>
                                    📅 {daysLeft < 0 ? `${Math.abs(daysLeft)}d po termínu` : `${daysLeft}d zbývá`}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Tooltip>
                        }
                      >
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setSelectedJob(job); setShowModal(true); }}
                        >
                          <div className="position-relative">
                            <div
                              className="rounded d-flex align-items-center justify-content-center"
                              style={{
                                width: '36px',
                                height: '36px',
                                background: `linear-gradient(135deg, ${jobType?.color}40, ${jobType?.color}20)`,
                                border: `2px solid ${job.status === 'completed' ? '#4CAF50' : getPriorityColor(job.priority)}`,
                                fontSize: '1rem'
                              }}
                            >
                              {jobType?.icon}
                            </div>
                            {isOverdue && (
                              <div className="position-absolute" style={{ top: '-4px', right: '-4px' }}>
                                <FiAlertTriangle size={14} className="text-danger" />
                              </div>
                            )}
                            {job.status === 'completed' && (
                              <div className="position-absolute" style={{ bottom: '-4px', right: '-4px' }}>
                                <FiCheckCircle size={14} className="text-success" />
                              </div>
                            )}
                          </div>
                          <div style={{ minWidth: '100px' }}>
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-white fw-bold" style={{ fontSize: '0.65rem' }}>
                                {job.title.slice(0, 12)}
                              </small>
                              <small
                                className="fw-bold"
                                style={{
                                  fontSize: '0.65rem',
                                  color: job.progress === 100 ? '#4CAF50' : job.progress >= 50 ? '#FF9800' : '#F44336'
                                }}
                              >
                                {job.progress}%
                              </small>
                            </div>
                            <ProgressBar
                              now={job.progress}
                              style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                              variant={job.progress === 100 ? 'success' : job.progress >= 50 ? 'warning' : 'danger'}
                            />
                          </div>
                        </div>
                      </OverlayTrigger>
                    );
                  })}

                  {activeJobs.length > 4 && (
                    <Badge bg="secondary" className="px-2 py-1">
                      +{activeJobs.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Stats Summary */}
                <div className="d-none d-xl-flex align-items-center gap-3">
                  <Badge bg="dark" className="border border-primary px-2 py-1">
                    <FiPlay className="me-1" /> {stats.inProgress}
                  </Badge>
                  <Badge bg="dark" className="border border-success px-2 py-1">
                    <FiCheck className="me-1" /> {stats.completed}
                  </Badge>
                  {stats.overdue > 0 && (
                    <Badge bg="dark" className="border border-danger px-2 py-1">
                      <FiAlertTriangle className="me-1" /> {stats.overdue}
                    </Badge>
                  )}
                  {stats.critical > 0 && (
                    <Badge bg="danger" className="px-2 py-1">
                      🔥 {stats.critical}
                    </Badge>
                  )}
                  <Badge bg="dark" className="border border-warning px-2 py-1">
                    Ø {stats.avgProgress.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Job Detail Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedJob(null); }} centered size="lg">
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white d-flex align-items-center gap-2">
            <span>{JOB_TYPES.find(t => t.key === selectedJob?.type)?.icon}</span>
            <div>
              <span>{selectedJob?.title}</span>
              <Badge
                className="ms-2"
                style={{ background: getStatusColor(selectedJob?.status || 'not_started'), fontSize: '0.7rem' }}
              >
                {JOB_STATUSES.find(s => s.key === selectedJob?.status)?.label}
              </Badge>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {selectedJob && (
            <Row className="g-0">
              <Col md={8} className="p-3">
                {/* Progress */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-white mb-0">📊 Celkový progress</h6>
                    <span className="fw-bold" style={{ color: selectedJob.progress === 100 ? '#4CAF50' : '#FF9800' }}>
                      {selectedJob.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    now={selectedJob.progress}
                    style={{ height: '20px' }}
                    variant={selectedJob.progress === 100 ? 'success' : selectedJob.progress >= 50 ? 'warning' : 'danger'}
                    label={`${selectedJob.progress}%`}
                    animated={selectedJob.progress < 100 && selectedJob.status === 'in_progress'}
                  />
                </div>

                {/* Status Actions */}
                <div className="mb-4 d-flex gap-2 flex-wrap">
                  {JOB_STATUSES.filter(s => s.key !== 'cancelled').map(status => (
                    <Button
                      key={status.key}
                      size="sm"
                      variant={selectedJob.status === status.key ? 'primary' : 'outline-secondary'}
                      onClick={() => handleUpdateJobStatus(selectedJob.id, status.key)}
                    >
                      {status.icon} {status.label}
                    </Button>
                  ))}
                </div>

                {/* Milestones */}
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <h6 className="text-white mb-0">📍 Milníky ({selectedJob.milestones.length})</h6>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setAddingMilestoneToJob(selectedJob.id)}
                  >
                    <FiPlus className="me-1" /> Přidat milník
                  </Button>
                </div>

                {addingMilestoneToJob === selectedJob.id && (
                  <div className="mb-3 d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Název milníku..."
                      className="bg-dark text-white border-secondary"
                      value={newMilestoneTitle}
                      onChange={(e) => setNewMilestoneTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddMilestone(selectedJob.id)}
                    />
                    <Button variant="primary" onClick={() => handleAddMilestone(selectedJob.id)}>
                      <FiCheck />
                    </Button>
                    <Button variant="secondary" onClick={() => { setAddingMilestoneToJob(null); setNewMilestoneTitle(''); }}>
                      <FiXCircle />
                    </Button>
                  </div>
                )}

                {selectedJob.milestones.length > 0 ? (
                  <ListGroup variant="flush" className="bg-transparent">
                    {selectedJob.milestones.map((milestone, idx) => {
                      const isExpanded = expandedMilestones.includes(milestone.id);
                      const completedItems = milestone.checklist.filter(i => i.isCompleted).length;
                      const totalItems = milestone.checklist.length;
                      const milestoneProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

                      return (
                        <ListGroup.Item
                          key={milestone.id}
                          className="bg-transparent border-secondary text-white px-0"
                        >
                          <div
                            className="d-flex align-items-center gap-2 py-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleMilestoneExpand(milestone.id)}
                          >
                            {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: '24px',
                                height: '24px',
                                background: milestone.isCompleted ? '#4CAF50' : '#2196F3',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {milestone.isCompleted ? '✓' : idx + 1}
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between">
                                <span style={{ textDecoration: milestone.isCompleted ? 'line-through' : 'none', opacity: milestone.isCompleted ? 0.6 : 1 }}>
                                  {milestone.title}
                                </span>
                                <Badge bg={milestone.isCompleted ? 'success' : 'secondary'}>
                                  {completedItems}/{totalItems}
                                </Badge>
                              </div>
                              <ProgressBar
                                now={milestoneProgress}
                                style={{ height: '4px', marginTop: '4px' }}
                                variant={milestone.isCompleted ? 'success' : 'info'}
                              />
                            </div>
                          </div>

                          <Collapse in={isExpanded}>
                            <div className="ps-5 pb-2">
                              {milestone.checklist.map(item => (
                                <div
                                  key={item.id}
                                  className="d-flex align-items-center gap-2 py-1"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleToggleChecklistItem(selectedJob.id, milestone.id, item.id)}
                                >
                                  <div
                                    className="rounded d-flex align-items-center justify-content-center"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      border: `2px solid ${item.isCompleted ? '#4CAF50' : '#666'}`,
                                      background: item.isCompleted ? '#4CAF50' : 'transparent',
                                    }}
                                  >
                                    {item.isCompleted && <FiCheck size={12} />}
                                  </div>
                                  <span style={{
                                    textDecoration: item.isCompleted ? 'line-through' : 'none',
                                    opacity: item.isCompleted ? 0.6 : 1,
                                    fontSize: '0.9rem'
                                  }}>
                                    {item.title}
                                  </span>
                                </div>
                              ))}

                              {addingChecklistToMilestone === milestone.id ? (
                                <div className="d-flex gap-2 mt-2">
                                  <Form.Control
                                    type="text"
                                    placeholder="Nová položka..."
                                    size="sm"
                                    className="bg-dark text-white border-secondary"
                                    value={newChecklistItem}
                                    onChange={(e) => setNewChecklistItem(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem(selectedJob.id, milestone.id)}
                                  />
                                  <Button size="sm" variant="primary" onClick={() => handleAddChecklistItem(selectedJob.id, milestone.id)}>
                                    <FiCheck />
                                  </Button>
                                  <Button size="sm" variant="secondary" onClick={() => { setAddingChecklistToMilestone(null); setNewChecklistItem(''); }}>
                                    <FiXCircle />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  className="mt-2"
                                  onClick={(e) => { e.stopPropagation(); setAddingChecklistToMilestone(milestone.id); }}
                                >
                                  <FiPlus className="me-1" /> Přidat položku
                                </Button>
                              )}
                            </div>
                          </Collapse>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <div className="text-center text-white-50 py-4">
                    <p>Zatím žádné milníky</p>
                    <small>Přidej milníky a checklist položky pro sledování progressu</small>
                  </div>
                )}

                {/* Blockers */}
                {selectedJob.blockers.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-danger mb-2">🚧 Blokery</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedJob.blockers.map((b, i) => (
                        <Badge key={i} bg="danger" className="px-2 py-1">{b}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Col>

              <Col md={4} className="border-start border-secondary p-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h6 className="fw-bold mb-3 text-white">📊 Detaily</h6>

                <div className="mb-3">
                  <small className="text-white-50">Typ</small>
                  <div className="fw-bold text-white">
                    {JOB_TYPES.find(t => t.key === selectedJob.type)?.icon}{' '}
                    {JOB_TYPES.find(t => t.key === selectedJob.type)?.label}
                  </div>
                </div>

                {selectedJob.client && (
                  <div className="mb-3">
                    <small className="text-white-50">Klient</small>
                    <div className="fw-bold text-white">{selectedJob.client}</div>
                  </div>
                )}

                <div className="mb-3">
                  <small className="text-white-50">Priorita</small>
                  <div>
                    <Badge style={{ background: getPriorityColor(selectedJob.priority) }}>
                      {JOB_PRIORITIES.find(p => p.key === selectedJob.priority)?.label}
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-white-50">Začátek</small>
                  <div className="fw-bold text-white">
                    {new Date(selectedJob.startDate).toLocaleDateString('cs-CZ')}
                  </div>
                </div>

                {selectedJob.dueDate && (
                  <div className="mb-3">
                    <small className="text-white-50">Deadline</small>
                    <div className={`fw-bold ${getDaysUntilDue(selectedJob.dueDate) < 0 ? 'text-danger' : getDaysUntilDue(selectedJob.dueDate) < 3 ? 'text-warning' : 'text-white'}`}>
                      {new Date(selectedJob.dueDate).toLocaleDateString('cs-CZ')}
                      <small className="d-block">
                        {getDaysUntilDue(selectedJob.dueDate) < 0
                          ? `${Math.abs(getDaysUntilDue(selectedJob.dueDate))} dní po termínu`
                          : `${getDaysUntilDue(selectedJob.dueDate)} dní zbývá`}
                      </small>
                    </div>
                  </div>
                )}

                <hr className="border-secondary" />

                <div className="mb-3">
                  <small className="text-white-50">Hodiny</small>
                  <div className="d-flex align-items-center gap-2">
                    <ProgressBar
                      now={selectedJob.totalHoursEstimate > 0 ? (selectedJob.hoursSpent / selectedJob.totalHoursEstimate) * 100 : 0}
                      style={{ flex: 1, height: '10px' }}
                      variant="info"
                    />
                    <span className="text-white fw-bold" style={{ fontSize: '0.8rem' }}>
                      {selectedJob.hoursSpent}/{selectedJob.totalHoursEstimate}h
                    </span>
                  </div>
                </div>

                {selectedJob.payment && (
                  <div className="mb-3">
                    <small className="text-white-50">Platba</small>
                    <div className="fw-bold text-success" style={{ fontSize: '1.2rem' }}>
                      {formatCurrency(selectedJob.payment)}
                      {selectedJob.isPaid && (
                        <Badge bg="success" className="ms-2" style={{ fontSize: '0.6rem' }}>Zaplaceno</Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <small className="text-white-50">XP Odměna</small>
                  <div className="fw-bold text-warning">+{selectedJob.xpReward} XP</div>
                </div>

                {selectedJob.tags.length > 0 && (
                  <>
                    <hr className="border-secondary" />
                    <h6 className="fw-bold mb-2 text-white">🏷️ Tagy</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedJob.tags.map((tag, i) => (
                        <Badge key={i} bg="secondary" className="px-2 py-1">{tag}</Badge>
                      ))}
                    </div>
                  </>
                )}

                {selectedJob.notes && (
                  <>
                    <hr className="border-secondary" />
                    <h6 className="fw-bold mb-2 text-white">📝 Poznámky</h6>
                    <small className="text-white-50">{selectedJob.notes}</small>
                  </>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        {selectedJob && (
          <Modal.Footer className="bg-dark border-secondary">
            <Button
              variant="outline-secondary"
              onClick={() => handleArchiveJob(selectedJob.id)}
              className="me-auto"
            >
              <FiArchive className="me-1" /> {selectedJob.isArchived ? 'Obnovit' : 'Archivovat'}
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteJob(selectedJob.id)}
            >
              <FiTrash2 className="me-1" /> Smazat
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Zavřít
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* Add Job Modal */}
      <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetNewJob(); }} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            <FiPlus className="me-2" /> Přidat práci
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Název práce *</Form.Label>
              <Form.Control
                type="text"
                placeholder="např. Webová stránka pro klienta X"
                className="bg-dark text-white border-secondary"
                value={newJob.title || ''}
                onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Typ</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={newJob.type}
                    onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value as JobType }))}
                  >
                    {JOB_TYPES.map(type => (
                      <option key={type.key} value={type.key}>{type.icon} {type.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Priorita</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={newJob.priority}
                    onChange={(e) => setNewJob(prev => ({ ...prev, priority: e.target.value as JobPriority }))}
                  >
                    {JOB_PRIORITIES.map(p => (
                      <option key={p.key} value={p.key}>{p.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Klient (volitelné)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jméno klienta nebo firmy"
                className="bg-dark text-white border-secondary"
                value={newJob.client || ''}
                onChange={(e) => setNewJob(prev => ({ ...prev, client: e.target.value }))}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    className="bg-dark text-white border-secondary"
                    value={newJob.dueDate?.split('T')[0] || ''}
                    onChange={(e) => setNewJob(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Odhadované hodiny</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-secondary"
                    value={newJob.totalHoursEstimate || ''}
                    onChange={(e) => setNewJob(prev => ({ ...prev, totalHoursEstimate: parseInt(e.target.value) || 0 }))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Platba (Kč)</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-secondary"
                    value={newJob.payment || ''}
                    onChange={(e) => setNewJob(prev => ({ ...prev, payment: parseInt(e.target.value) || undefined }))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">XP Odměna</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-secondary"
                    value={newJob.xpReward || 100}
                    onChange={(e) => setNewJob(prev => ({ ...prev, xpReward: parseInt(e.target.value) || 100 }))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Popis</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className="bg-dark text-white border-secondary"
                placeholder="Popis práce..."
                value={newJob.description || ''}
                onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => { setShowAddModal(false); resetNewJob(); }}>
            Zrušit
          </Button>
          <Button variant="primary" onClick={handleAddJob}>
            Přidat práci
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FinishedJobTracker;

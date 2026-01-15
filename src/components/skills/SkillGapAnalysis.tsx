"use client";

import React, { useMemo } from 'react';
import { Card, Table, Badge, ProgressBar, Row, Col, Form, Tabs, Tab } from 'react-bootstrap';
import { EnhancedSkillData } from '@/types';
import { SKILL_DATA, getTrendingSkills, getHighDemandSkills } from '@/data/skills/skill-data';

interface SkillGapAnalysisProps {
  userSkills?: string[];
  targetRole?: string;
}

export default function SkillGapAnalysis({ userSkills = [], targetRole = 'Software Engineer' }: SkillGapAnalysisProps) {
  const trendingSkills = getTrendingSkills(10);
  const highDemandSkills = getHighDemandSkills(90);

  const userSkillSet = useMemo(() => new Set(userSkills.map(s => s.toLowerCase())), [userSkills]);

  const skillGaps = useMemo(() => {
    return SKILL_DATA.map(skill => ({
      ...skill,
      userHasSkill: userSkillSet.has(skill.name.toLowerCase()) || 
                   userSkillSet.has(skill.id.toLowerCase()) ||
                   skill.tags.some(tag => userSkillSet.has(tag.toLowerCase()))
    })).sort((a, b) => {
      if (a.userHasSkill && !b.userHasSkill) return 1;
      if (!a.userHasSkill && b.userHasSkill) return -1;
      return b.marketData.demandIndex - a.marketData.demandIndex;
    });
  }, [userSkillSet]);

  const missingSkills = skillGaps.filter(s => !s.userHasSkill);
  const acquiredSkills = skillGaps.filter(s => s.userHasSkill);

  const priorityMissing = missingSkills.filter(s => s.marketData.demandIndex >= 85);
  const mediumPriorityMissing = missingSkills.filter(s => s.marketData.demandIndex >= 70 && s.marketData.demandIndex < 85);
  const lowPriorityMissing = missingSkills.filter(s => s.marketData.demandIndex < 70);

  return (
    <div>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3 className="text-success">{acquiredSkills.length}</h3>
              <Card.Text>Skills máš</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3 className="text-warning">{missingSkills.length}</h3>
              <Card.Text>Skills chybí</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <h3 className="text-primary">{Math.round((acquiredSkills.length / SKILL_DATA.length) * 100)}%</h3>
              <Card.Text>Pokrytí</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="priority" className="mb-3">
        <Tab eventKey="priority" title="Prioritní chybějící">
          {priorityMissing.length > 0 ? (
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Kategorie</th>
                  <th>Demand</th>
                  <th>Trend</th>
                  <th>Platový rozsah</th>
                  <th>Doporučené zdroje</th>
                </tr>
              </thead>
              <tbody>
                {priorityMissing.slice(0, 10).map(skill => (
                  <tr key={skill.id}>
                    <td>
                      <span style={{ marginRight: 8 }}>{skill.icon}</span>
                      <strong>{skill.name}</strong>
                    </td>
                    <td><Badge bg="secondary">{skill.category}</Badge></td>
                    <td>
                      <ProgressBar now={skill.marketData.demandIndex} label={`${skill.marketData.demandIndex}%`} variant="success" style={{ height: 20 }} />
                    </td>
                    <td>
                      <Badge bg={skill.marketData.trend === 'rising' ? 'success' : 'warning'}>
                        {skill.marketData.trend === 'rising' ? '↑ Rostoucí' : '→ Stabilní'}
                      </Badge>
                    </td>
                    <td>
                      {skill.marketData.salaryRange.junior}-{skill.marketData.salaryRange.senior} Kč
                    </td>
                    <td>
                      <small>{skill.resources[0]?.name || 'N/A'}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center p-4">
              <h4>Gratulace! 🎉</h4>
              <p>Máš všechny prioritní skills pro tvou kariéru!</p>
            </div>
          )}
        </Tab>

        <Tab eventKey="all" title="Všechny chybějící">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Kategorie</th>
                <th>Demand Index</th>
                <th>Trend</th>
                <th>Růst</th>
                <th>Obtížnost</th>
                <th>Certifikace</th>
              </tr>
            </thead>
            <tbody>
              {missingSkills.map(skill => (
                <tr key={skill.id}>
                  <td>
                    <span style={{ marginRight: 8 }}>{skill.icon}</span>
                    <strong>{skill.name}</strong>
                  </td>
                  <td><Badge bg="secondary">{skill.category}</Badge></td>
                  <td>{skill.marketData.demandIndex}/100</td>
                  <td>
                    <Badge bg={skill.marketData.trend === 'rising' ? 'success' : skill.marketData.trend === 'falling' ? 'danger' : 'warning'}>
                      {skill.marketData.trend}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg="info">+{skill.marketData.growthRate}%</Badge>
                  </td>
                  <td>
                    <ProgressBar now={skill.marketData.difficultyToLearn * 20} label={['Snadné', 'Střední', 'Těžké', 'Velmi těžké', 'Expert'][skill.marketData.difficultyToLearn - 1]} variant="primary" style={{ height: 20 }} />
                  </td>
                  <td>
                    {skill.certifications.length > 0 ? (
                      <ul className="mb-0 ps-3">
                        {skill.certifications.slice(0, 2).map(cert => (
                          <li key={cert.id}><small>{cert.name}</small></li>
                        ))}
                      </ul>
                    ) : (
                      <small className="text-muted">Žádné</small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="trending" title="🔥 Trending Skills">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Růst</th>
                <th>Demand</th>
                <th>Plat senior</th>
                <th>Certifikace</th>
              </tr>
            </thead>
            <tbody>
              {trendingSkills.map(skill => (
                <tr key={skill.id}>
                  <td>
                    <span style={{ marginRight: 8 }}>{skill.icon}</span>
                    <strong>{skill.name}</strong>
                  </td>
                  <td>
                    <Badge bg="success" className="fs-6">+{skill.marketData.growthRate}%</Badge>
                  </td>
                  <td>{skill.marketData.demandIndex}/100</td>
                  <td>{skill.marketData.salaryRange.senior.toLocaleString()} Kč</td>
                  <td>
                    {skill.certifications.slice(0, 1).map(cert => (
                      <Badge key={cert.id} bg="outline-primary">{cert.provider}</Badge>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="demand" title="📈 Nejžádanější">
          <Row>
            {highDemandSkills.map(skill => (
              <Col md={6} lg={4} key={skill.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <span style={{ fontSize: 24, marginRight: 10 }}>{skill.icon}</span>
                      <h5 className="mb-0">{skill.name}</h5>
                    </div>
                    <Badge bg="success" className="mb-2">Demand: {skill.marketData.demandIndex}/100</Badge>
                    <p className="mb-1"><small>{skill.description}</small></p>
                    <p className="mb-0 text-muted">
                      <strong>Plat:</strong> {skill.marketData.salaryRange.junior}-{skill.marketData.salaryRange.senior} Kč
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}

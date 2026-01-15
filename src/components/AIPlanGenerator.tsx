"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, Badge, ProgressBar, Row, Col, Alert } from "react-bootstrap";
import { Course, Job } from "@/types";

interface AIPlanGeneratorProps {
  courses: Course[];
  jobs: Job[];
  userGoal?: string;
}

const CNCSKILLS = ["CNC", "Heidenhain", "Siemens", "G-Code", "CAM", "Fusion 360"];

export default function AIPlanGenerator({ courses, jobs, userGoal = "CNC Operátor" }: AIPlanGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const detectedFocus = useMemo(() => {
    const allSkills = [...courses.flatMap(c => c.tags || []), ...jobs.flatMap(j => j.requiredSkills || [])];
    return allSkills.some(skill => CNCSKILLS.some(cnc => skill.toLowerCase().includes(cnc.toLowerCase()))) ? "CNC & Engineering" : "Programming";
  }, [courses, jobs]);

  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => setIsGenerating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ai-plan-generator">
      <Card className="mb-4 border-0 bg-dark shadow-lg">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-3 mb-2">
                <span className="display-6">🤖</span>
                <div>
                  <h4 className="mb-0 fw-bold text-white">AI Personal Plan Generator</h4>
                  <p className="text-white-50 mb-0 small">Analyzuje vaše dovednosti a cíle</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-md-end">
              <Badge bg="info" className="me-2">Detekováno: {detectedFocus}</Badge>
              <Badge bg={isGenerating ? "warning" : "success"} className="text-dark">
                {isGenerating ? "Generuji..." : "AI Ready"}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center">
          <div className="display-4 mb-2">📚</div>
          <h3 className="fw-bold mb-0">{courses.length}</h3>
          <p className="text-muted mb-0">Kurzy</p>
        </Card.Body></Card></Col>
        <Col md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center">
          <div className="display-4 mb-2">💼</div>
          <h3 className="fw-bold mb-0">{jobs.length}</h3>
          <p className="text-muted mb-0">Práce</p>
        </Card.Body></Card></Col>
        <Col md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center">
          <div className="display-4 mb-2">⏱️</div>
          <h3 className="fw-bold mb-0">{courses.reduce((acc, c) => acc + (c.spentHours || 0), 0)}</h3>
          <p className="text-muted mb-0">Hodin</p>
        </Card.Body></Card></Col>
        <Col md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center">
          <div className="display-4 mb-2">✅</div>
          <h3 className="fw-bold mb-0">{courses.reduce((acc, c) => acc + c.modules.filter(m => m.isCompleted).length, 0)}</h3>
          <p className="text-muted mb-0">Moduly</p>
        </Card.Body></Card></Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-4">AI Analýza vašeho profilu</h5>
          <Alert variant="info">
            Na základě vašeho zaměření jsem analyzoval vaše aktuální kurzy.
            Pro CNC/VAG oblast doporučuji zaměřit se na CAD/CAM software a praktické dovednosti.
          </Alert>
        </Card.Body>
      </Card>
    </div>
  );
}

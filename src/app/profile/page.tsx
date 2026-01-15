"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab } from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ThemeToggle";
import { Course } from "@/types";

const AIPlanGenerator = dynamic(() => import("@/components/AIPlanGenerator"), {
  ssr: false,
  loading: () => <div className="text-center py-5">Loading AI Plan Generator...</div>
});

const avatarStyle = {
  width: "150px",
  height: "150px",
  fontSize: "3rem"
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  const stats = useMemo(() => {
    const completedModules = courses.reduce((acc, c) => acc + c.modules.filter(m => m.isCompleted).length, 0);
    const totalHours = courses.reduce((acc, c) => acc + (c.spentHours || 0), 0);
    const xp = completedModules * 10 + totalHours * 2;
    const level = Math.floor(xp / 100) + 1;
    return { level, courseCount: courses.length, jobCount: jobs.length, totalHours };
  }, [courses, jobs]);

  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    const savedJobs = localStorage.getItem("jobs");
    if (savedCourses) {
      try { setCourses(JSON.parse(savedCourses)); } catch {}
    }
    if (savedJobs) {
      try { setJobs(JSON.parse(savedJobs)); } catch {}
    }
    setIsLoading(false);
  }, []);

  if (status === "loading" || isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3"></div>
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-sm">
          <Card.Body className="text-center p-5">
            <h2>Profile</h2>
            <p>Please sign in.</p>
            <Button href="/auth/signin" variant="primary">Sign In</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const userProfile = {
    name: session?.user?.name || "John Doe",
    bio: "Vývojář s vášní pro webové a mobilní aplikace. Zkušenosti s HTML, CSS, JavaScript, ASP.NET Core, Blazor, .NET MAUI, Android a dalšími technologiemi.",
    title: "Software Developer",
    skills: ["CNC", "React", "TypeScript", "HTML", "CSS", "JavaScript", "ASP.NET Core", "Blazor", ".NET MAUI", ".NET Android", "C/AL", "C++", "Java", "Kotlin", "XML", "JSON", "Git", "English B1+"]
  };

  return (
    <main className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark mb-4 sticky-top shadow-sm">
        <Container fluid>
          <div className="d-flex align-items-center">
            <span className="navbar-brand mb-0 h1 me-4">🚀 Tomas Learning Platform</span>
            <div className="d-flex gap-2">
              <Link href="/" className="text-decoration-none">
                <Button variant="outline-light" size="sm" className="fw-bold">🏠 HOME</Button>
              </Link>
              <Link href="/analytics" className="text-decoration-none">
                <Button variant="outline-info" size="sm" className="fw-bold">📊 ANALYTICS</Button>
              </Link>
            </div>
          </div>
          <div className="text-white d-flex align-items-center gap-3">
            <ThemeToggle />
            <Button variant="outline-light" size="sm" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </Container>
      </nav>

      <Container fluid className="px-4">
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-dark bg-gradient py-5" style={{background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"}}>
                <Card.Body className="py-5">
                  <Row className="align-items-center">
                    <Col md={3} className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={avatarStyle}>
                          {userProfile.name.charAt(0)}
                        </div>
                        <Badge bg="success" className="position-absolute bottom-0 end-0" style={{transform: "translate(25%, 25%)"}}>Online</Badge>
                      </div>
                    </Col>
                    <Col md={6}>
                      <h1 className="text-white fw-bold mb-2">{userProfile.name}</h1>
                      <h4 className="text-primary mb-3">{userProfile.title}</h4>
                      <p className="text-white-50 mb-3">{userProfile.bio}</p>
                      <div className="d-flex flex-wrap gap-2">
                        {userProfile.skills.map((skill, idx) => (
                          <Badge key={idx} bg="primary" className="py-2 px-3">{skill}</Badge>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center py-4">
                <div className="display-5 mb-2">🏆</div>
                <h3 className="fw-bold mb-0">{stats.level}</h3>
                <p className="text-muted mb-0">Level</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center py-4">
                <div className="display-5 mb-2">📚</div>
                <h3 className="fw-bold mb-0">{stats.courseCount}</h3>
                <p className="text-muted mb-0">Kurzy</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center py-4">
                <div className="display-5 mb-2">💼</div>
                <h3 className="fw-bold mb-0">{stats.jobCount}</h3>
                <p className="text-muted mb-0">Práce</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center py-4">
                <div className="display-5 mb-2">⏱️</div>
                <h3 className="fw-bold mb-0">{stats.totalHours}</h3>
                <p className="text-muted mb-0">Hodin</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="aiplan" className="mb-4">
          <Tab eventKey="aiplan" title={<><span className="me-1">🤖</span> AI Personal Plan</>}>
            <AIPlanGenerator courses={courses} jobs={jobs} userGoal="Fullstack Developer" />
          </Tab>
          <Tab eventKey="profile" title={<><span className="me-1">👤</span> Profil</>}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">O mně</h5>
                <p className="mb-4">{userProfile.bio}</p>
                <h6 className="fw-bold mb-3">Dovednosti:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, idx) => (
                    <Badge key={idx} bg="primary" className="py-2 px-3">{skill}</Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>

      <footer className="bg-dark text-white py-4 mt-5">
        <Container fluid>
          <p className="mb-0 text-white-50">© 2026 Tomas Learning Platform</p>
        </Container>
      </footer>
    </main>
  );
}

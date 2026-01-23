"use client";

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

// NEW: Premium UI Components
import { Card, Button, Progress, Badge } from '@/components/ui';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { FiTarget, FiTrendingUp, FiAward, FiBook, FiClock, FiCheckCircle, FiStar, FiZap, FiUsers, FiActivity } from 'react-icons/fi';

export default function NewDashboard() {
    const [stats, setStats] = useState({
        projects: 12,
        xp: 8450,
        achievements: 42,
        hours: 156,
        level: 24,
        courses: 8,
        completedCourses: 5,
        activeGoals: 7
    });

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
            paddingTop: '2rem',
            paddingBottom: '4rem'
        }}>
            {/* Header */}
            <Container fluid className="mb-5">
                <div className="text-center animate-fade-in">
                    <h1 className="gradient-text-cosmic" style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        marginBottom: '1rem'
                    }}>
                        🚀 Nový Premium Design
                    </h1>
                    <p className="text-white-50" style={{ fontSize: '1.2rem' }}>
                        Moderní dashboard s gradienty, animacemi a premium UI komponenty
                    </p>
                    <div className="mt-4 d-flex gap-3 justify-content-center flex-wrap">
                        <Link href="/">
                            <Button variant="outline">← Zpět na hlavní dashboard</Button>
                        </Link>
                        <Link href="/design-showcase">
                            <Button variant="gradient" gradient="cosmic">
                                🎨 Všechny Komponenty
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>

            <Container>
                {/* Dashboard Cards */}
                <section className="mb-5">
                    <h2 className="text-heading text-white mb-4 animate-slide-in-right">
                        📊 Statistiky přehled
                    </h2>
                    <Row className="g-4">
                        <Col md={6} lg={3} className="animate-fade-in">
                            <DashboardCard
                                title="Aktivní Projekty"
                                value={stats.projects}
                                subtitle="3 nové tento týden"
                                icon={<FiTarget />}
                                gradient="cosmic"
                                trend={{ value: 15, label: 'vs. minulý měsíc' }}
                            />
                        </Col>

                        <Col md={6} lg={3} className="animate-fade-in stagger-1">
                            <DashboardCard
                                title="Celkové XP"
                                value={stats.xp.toLocaleString()}
                                subtitle={`Level ${stats.level}`}
                                icon={<FiTrendingUp />}
                                gradient="sunset"
                                trend={{ value: 23, label: 'zest měsíc' }}
                            />
                        </Col>

                        <Col md={6} lg={3} className="animate-fade-in stagger-2">
                            <DashboardCard
                                title="Achievementy"
                                value={stats.achievements}
                                subtitle="87% dokončeno"
                                icon={<FiAward />}
                                gradient="fire"
                                trend={{ value: 8, label: 'nově odemčeno' }}
                            />
                        </Col>

                        <Col md={6} lg={3} className="animate-fade-in stagger-3">
                            <DashboardCard
                                title="Hodiny Učení"
                                value={stats.hours}
                                subtitle="Tento měsíc"
                                icon={<FiBook />}
                                gradient="ocean"
                                trend={{ value: -5, label: 'vs. minulý měsíc' }}
                            />
                        </Col>
                    </Row>
                </section>

                {/* Card Variants Showcase */}
                <section className="mb-5">
                    <h2 className="text-heading text-white mb-4">
                        🎴 Premium Card Varianty
                    </h2>
                    <Row className="g-4">
                        <Col md={6} lg={4}>
                            <Card variant="premium" gradient="cosmic" hover className="animate-slide-in-up">
                                <div className="d-flex align-items-start gap-3 mb-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--gradient-cosmic)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px'
                                    }}>
                                        <FiStar />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="mb-1">Premium Card</h4>
                                        <p className="text-muted small mb-0">
                                            S gradient top borderem
                                        </p>
                                    </div>
                                </div>
                                <Progress value={75} gradient="cosmic" animated />
                            </Card>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card variant="gradient" gradient="sunset" hover className="animate-slide-in-up stagger-1">
                                <div className="d-flex align-items-start gap-3 mb-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--gradient-sunset)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px'
                                    }}>
                                        <FiZap />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="mb-1">Gradient Border</h4>
                                        <p className="text-muted small mb-0">
                                            Celá karta v gradientu
                                        </p>
                                    </div>
                                </div>
                                <Progress value={60} gradient="sunset" animated />
                            </Card>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card variant="neon" gradient="mint" hover className="animate-slide-in-up stagger-2">
                                <div className="d-flex align-items-start gap-3 mb-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--gradient-mint)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px'
                                    }}>
                                        <FiActivity />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="mb-1">Neon Glow</h4>
                                        <p className="text-muted small mb-0">
                                            Svítí při hoveru
                                        </p>
                                    </div>
                                </div>
                                <Progress value={90} gradient="mint" animated />
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Learning Progress */}
                <section className="mb-5">
                    <h2 className="text-heading text-white mb-4">
                        📚 Pokrok ve Vzdělávání
                    </h2>
                    <Card variant="premium" gradient="ocean">
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h4 className="mb-1">Aktuální Kurzy</h4>
                                    <p className="text-muted mb-0">
                                        {stats.completedCourses} z {stats.courses} dokončeno
                                    </p>
                                </div>
                                <Badge variant="gradient" gradient="ocean" icon={<FiBook />}>
                                    {stats.courses} Aktivních
                                </Badge>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-white">React & Next.js 15</span>
                                    <span className="text-white-50">75%</span>
                                </div>
                                <Progress value={75} gradient="cosmic" animated showLabel={false} />
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-white">TypeScript Masterclass</span>
                                    <span className="text-white-50">45%</span>
                                </div>
                                <Progress value={45} gradient="sunset" animated showLabel={false} />
                            </div>

                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-white">Node.js Backend</span>
                                    <span className="text-white-50">90%</span>
                                </div>
                                <Progress value={90} gradient="forest" animated showLabel={false} />
                            </div>
                        </div>

                        <div className="d-flex gap-2 justify-content-end">
                            <Button variant="outline" size="sm">
                                Zobrazit Všechny
                            </Button>
                            <Button variant="gradient" gradient="ocean" size="sm">
                                Přidat Kurz
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* Goals & Achievements */}
                <section className="mb-5">
                    <h2 className="text-heading text-white mb-4">
                        🎯 Cíle & Úspěchy
                    </h2>
                    <Row className="g-4">
                        <Col md={6}>
                            <Card variant="premium" gradient="sunset" hover>
                                <div className="mb-4">
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <FiTarget style={{ fontSize: '2rem', color: 'var(--color-accent-primary)' }} />
                                        <div>
                                            <h4 className="mb-0">Aktivní Cíle</h4>
                                            <p className="text-muted small mb-0">{stats.activeGoals} cílů v průběhu</p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        <Badge variant="default" color="primary">Kariéra</Badge>
                                        <Badge variant="default" color="success">Zdraví</Badge>
                                        <Badge variant="default" color="warning">Finance</Badge>
                                        <Badge variant="default" color="info">Koníčky</Badge>
                                    </div>

                                    <Progress value={65} gradient="sunset" animated height="lg" />
                                </div>

                                <Button variant="gradient" gradient="sunset" fullWidth>
                                    Spravovat Cíle
                                </Button>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card variant="premium" gradient="fire" hover glow>
                                <div className="mb-4">
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <FiAward style={{ fontSize: '2rem', color: 'var(--color-warning-primary)' }} />
                                        <div>
                                            <h4 className="mb-0">Nové Achievementy</h4>
                                            <p className="text-muted small mb-0">8 odemčeno tento měsíc</p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        <Badge variant="gradient" gradient="fire" icon={<FiStar />}>
                                            Legendary
                                        </Badge>
                                        <Badge variant="glow" color="warning" pulse>
                                            Nové!
                                        </Badge>
                                        <Badge variant="gradient" gradient="cosmic">
                                            Epic
                                        </Badge>
                                    </div>

                                    <div className="text-center py-3">
                                        <div className="animate-heartbeat" style={{ fontSize: '3rem' }}>
                                            🏆
                                        </div>
                                    </div>
                                </div>

                                <Button variant="gradient" gradient="fire" fullWidth>
                                    Zobrazit Galerii
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Quick Actions */}
                <section className="mb-5">
                    <h2 className="text-heading text-white mb-4">
                        ⚡ Rychlé Akce
                    </h2>
                    <Card variant="glass">
                        <Row className="g-3">
                            <Col md={3}>
                                <Button variant="gradient" gradient="cosmic" fullWidth icon={<FiTarget />}>
                                    Nový Projekt
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="gradient" gradient="sunset" fullWidth icon={<FiBook />}>
                                    Přidat Kurz
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="gradient" gradient="ocean" fullWidth icon={<FiCheckCircle />}>
                                    Logovat Čas
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="gradient" gradient="fire" fullWidth icon={<FiAward />}>
                                    Achievementy
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </section>

                {/* Animation Showcase */}
                <section>
                    <h2 className="text-heading text-white mb-4">
                        🎬 Animace v Akci
                    </h2>
                    <Row className="g-4">
                        <Col md={4}>
                            <Card variant="premium" gradient="cosmic" className="animate-float">
                                <div className="text-center">
                                    <div className="mb-3" style={{ fontSize: '3rem' }}>
                                        🚀
                                    </div>
                                    <h5>Float Animation</h5>
                                    <p className="text-muted">Pluje nahoru a dolů</p>
                                </div>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card variant="premium" gradient="sunset">
                                <div className="text-center">
                                    <div className="mb-3 animate-pulse" style={{ fontSize: '3rem' }}>
                                        💎
                                    </div>
                                    <h5>Pulse Animation</h5>
                                    <p className="text-muted">Pulzující efekt</p>
                                </div>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card variant="premium" gradient="mint">
                                <div className="text-center">
                                    <div className="mb-3 animate-heartbeat" style={{ fontSize: '3rem' }}>
                                        ❤️
                                    </div>
                                    <h5>Heartbeat Animation</h5>
                                    <p className="text-muted">Bije jako srdce</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container>
        </div>
    );
}

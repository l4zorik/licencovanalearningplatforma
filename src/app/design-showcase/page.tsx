"use client";

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Button, Progress, Badge } from '@/components/ui';
import DashboardCard from '@/components/dashboard/DashboardCard';
import {
    FiTarget,
    FiTrendingUp,
    FiAward,
    FiBook,
    FiStar,
    FiZap,
    FiHeart,
    FiCheckCircle
} from 'react-icons/fi';

export default function DesignShowcase() {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="display-text mb-3 gradient-text-cosmic">
                    Design Showcase
                </h1>
                <p className="lead text-muted">
                    Nové UI komponenty a design system v akci
                </p>
            </div>

            {/* Dashboard Cards */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Dashboard Cards</h2>
                <Row className="g-4">
                    <Col md={6} lg={3}>
                        <DashboardCard
                            title="Aktivní Projekty"
                            value="12"
                            subtitle="3 nové tento týden"
                            icon={<FiTarget />}
                            gradient="cosmic"
                            trend={{ value: 15, label: 'vs. minulý měsíc' }}
                        />
                    </Col>

                    <Col md={6} lg={3}>
                        <DashboardCard
                            title="Celkové XP"
                            value="8,450"
                            subtitle="Level 24"
                            icon={<FiTrendingUp />}
                            gradient="sunset"
                            trend={{ value: 23, label: 'tento měsíc' }}
                        />
                    </Col>

                    <Col md={6} lg={3}>
                        <DashboardCard
                            title="Achievementy"
                            value="42"
                            subtitle="87% dokončeno"
                            icon={<FiAward />}
                            gradient="fire"
                            trend={{ value: 8, label: 'nově odemčeno' }}
                        />
                    </Col>

                    <Col md={6} lg={3}>
                        <DashboardCard
                            title="Hodiny Učení"
                            value="156"
                            subtitle="Tento měsíc"
                            icon={<FiBook />}
                            gradient="ocean"
                            trend={{ value: -5, label: 'vs. minulý měsíc' }}
                        />
                    </Col>
                </Row>
            </section>

            {/* Card Variants */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Card Variants</h2>
                <Row className="g-4">
                    <Col md={6} lg={4}>
                        <Card variant="default" hover>
                            <h4>Default Card</h4>
                            <p className="text-muted mb-0">
                                Standardní karta s hover efektem
                            </p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="cosmic" hover>
                            <h4>Premium Card</h4>
                            <p className="text-muted mb-0">
                                Prémiová karta s gradient horním okrajem
                            </p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="gradient" gradient="sunset" hover>
                            <h4>Gradient Border</h4>
                            <p className="text-muted mb-0">
                                Karta s gradient bordem
                            </p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="glass" hover>
                            <h4>Glass Card</h4>
                            <p className="text-muted mb-0">
                                Glassmorphic design s blur efektem
                            </p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="neon" gradient="mint" hover>
                            <h4>Neon Glow</h4>
                            <p className="text-muted mb-0">
                                Karta s neon glow efektem při hoveru
                            </p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="forest" hover glow>
                            <h4>Glow Card</h4>
                            <p className="text-muted mb-0">
                                Karta s pulzujícím glow efektem
                            </p>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Buttons */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Buttons</h2>
                <Row className="g-4">
                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Button Variants</h4>
                            <div className="d-flex flex-wrap gap-3">
                                <Button variant="primary">Primary</Button>
                                <Button variant="gradient" gradient="cosmic">Gradient</Button>
                                <Button variant="gradient" gradient="sunset">Sunset</Button>
                                <Button variant="neomorph">Neomorph</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Button Sizes</h4>
                            <div className="d-flex flex-wrap align-items-center gap-3">
                                <Button variant="gradient" gradient="ocean" size="sm">Small</Button>
                                <Button variant="gradient" gradient="ocean" size="md">Medium</Button>
                                <Button variant="gradient" gradient="ocean" size="lg">Large</Button>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">With Icons</h4>
                            <div className="d-flex flex-wrap gap-3">
                                <Button variant="gradient" gradient="fire" icon={<FiStar />}>
                                    With Icon Left
                                </Button>
                                <Button variant="gradient" gradient="forest" icon={<FiZap />} iconPosition="right">
                                    Icon Right
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Loading State</h4>
                            <div className="d-flex flex-wrap gap-3">
                                <Button
                                    variant="gradient"
                                    gradient="cosmic"
                                    loading={loading}
                                    onClick={handleClick}
                                >
                                    Click Me
                                </Button>
                                <Button variant="primary" disabled>
                                    Disabled
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Progress Bars */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Progress Bars</h2>
                <Row className="g-4">
                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Gradient Progress</h4>
                            <div className="mb-3">
                                <label className="text-sm text-muted mb-2 d-block">Cosmic (75%)</label>
                                <Progress value={75} gradient="cosmic" animated />
                            </div>
                            <div className="mb-3">
                                <label className="text-sm text-muted mb-2 d-block">Sunset (60%)</label>
                                <Progress value={60} gradient="sunset" animated />
                            </div>
                            <div className="mb-3">
                                <label className="text-sm text-muted mb-2 d-block">Ocean (45%)</label>
                                <Progress value={45} gradient="ocean" animated />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-2 d-block">Fire (90%)</label>
                                <Progress value={90} gradient="fire" animated />
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Different Sizes</h4>
                            <div className="mb-3">
                                <label className="text-sm text-muted mb-2 d-block">Small</label>
                                <Progress value={65} gradient="mint" height="sm" animated />
                            </div>
                            <div className="mb-3">
                                <label className="text-sm text-muted mb-2 d-block">Medium</label>
                                <Progress value={75} gradient="forest" height="md" animated />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-2 d-block">Large</label>
                                <Progress value={85} gradient="cosmic" height="lg" showLabel animated />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Badges */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Badges</h2>
                <Row className="g-4">
                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Default Badges</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <Badge variant="default" color="primary">Primary</Badge>
                                <Badge variant="default" color="success">Success</Badge>
                                <Badge variant="default" color="warning">Warning</Badge>
                                <Badge variant="default" color="danger">Danger</Badge>
                                <Badge variant="default" color="info">Info</Badge>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Gradient Badges</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <Badge variant="gradient" gradient="cosmic">Cosmic</Badge>
                                <Badge variant="gradient" gradient="sunset">Sunset</Badge>
                                <Badge variant="gradient" gradient="ocean">Ocean</Badge>
                                <Badge variant="gradient" gradient="forest">Forest</Badge>
                                <Badge variant="gradient" gradient="fire">Fire</Badge>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">With Icons</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <Badge variant="gradient" gradient="cosmic" icon={<FiStar />}>
                                    Featured
                                </Badge>
                                <Badge variant="default" color="success" icon={<FiCheckCircle />}>
                                    Completed
                                </Badge>
                                <Badge variant="glow" color="danger" icon={<FiHeart />} pulse>
                                    Live
                                </Badge>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card variant="default">
                            <h4 className="mb-3">Outline & Glow</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <Badge variant="outline" color="primary">Outline</Badge>
                                <Badge variant="glow" color="success">Glow</Badge>
                                <Badge variant="glow" color="warning" pulse>Pulse</Badge>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Animations */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Animations</h2>
                <Row className="g-4">
                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="cosmic" className="animate-fade-in">
                            <h4>Fade In</h4>
                            <p className="text-muted mb-0">animate-fade-in</p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="sunset" className="animate-slide-in-up stagger-1">
                            <h4>Slide In Up</h4>
                            <p className="text-muted mb-0">animate-slide-in-up</p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="ocean" className="animate-bounce-in stagger-2">
                            <h4>Bounce In</h4>
                            <p className="text-muted mb-0">animate-bounce-in</p>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="forest">
                            <div className="animate-float">
                                <h4>Float</h4>
                                <p className="text-muted mb-0">animate-float</p>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="fire">
                            <div className="animate-pulse">
                                <h4>Pulse</h4>
                                <p className="text-muted mb-0">animate-pulse</p>
                            </div>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card variant="premium" gradient="mint">
                            <div className="animate-heartbeat">
                                <h4>Heartbeat</h4>
                                <p className="text-muted mb-0">animate-heartbeat</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Typography */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Typography</h2>
                <Card variant="default">
                    <h1 className="text-display mb-3">Display Text</h1>
                    <h2 className="text-heading mb-3">Heading Text</h2>
                    <p className="lead mb-3">Lead paragraph with more prominence</p>
                    <p className="mb-3">Regular body text with comfortable reading size</p>
                    <p className="text-muted mb-0">Muted text for less important information</p>
                </Card>
            </section>

            {/* Gradient Text */}
            <section className="mb-5">
                <h2 className="text-heading mb-4">Gradient Text</h2>
                <Card variant="default">
                    <div className="mb-3">
                        <h3 className="gradient-text-cosmic">Cosmic Gradient</h3>
                    </div>
                    <div className="mb-3">
                        <h3 className="gradient-text-sunset">Sunset Gradient</h3>
                    </div>
                    <div className="mb-3">
                        <h3 className="gradient-text-ocean">Ocean Gradient</h3>
                    </div>
                    <div className="mb-3">
                        <h3 className="gradient-text-forest">Forest Gradient</h3>
                    </div>
                    <div>
                        <h3 className="gradient-text-fire">Fire Gradient</h3>
                    </div>
                </Card>
            </section>
        </Container>
    );
}

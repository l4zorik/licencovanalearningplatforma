'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, Row, Col, ProgressBar, Badge, ListGroup } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Course {
  id: number
  title: string
  modules: { isCompleted: boolean }[]
  tags: string[]
  category?: string
}

interface ProgressAnalyticsProps {
  courses: Course[]
}

export default function ProgressAnalytics({ courses }: ProgressAnalyticsProps) {
  const [analytics, setAnalytics] = useState({
    totalModules: 0,
    completedModules: 0,
    overallProgress: 0,
    categoryProgress: [] as any[],
    skillDistribution: [] as any[]
  })

  const calculateAnalytics = useCallback(() => {
    const totalModules = courses.reduce((acc, course) => acc + course.modules.length, 0)
    const completedModules = courses.reduce((acc, course) =>
      acc + course.modules.filter(m => m.isCompleted).length, 0
    )
    const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

    // Category progress
    const categoryMap = new Map<string, { total: number, completed: number }>()
    courses.forEach(course => {
      const category = course.category || 'Uncategorized'
      const existing = categoryMap.get(category) || { total: 0, completed: 0 }
      existing.total += course.modules.length
      existing.completed += course.modules.filter(m => m.isCompleted).length
      categoryMap.set(category, existing)
    })

    const categoryProgress = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      progress: Math.round((data.completed / data.total) * 100),
      completed: data.completed,
      total: data.total
    }))

    // Skill distribution
    const skillMap = new Map<string, number>()
    courses.forEach(course => {
      course.tags.forEach(tag => {
        skillMap.set(tag, (skillMap.get(tag) || 0) + 1)
      })
    })

    const skillDistribution = Array.from(skillMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }))

    setAnalytics({
      totalModules,
      completedModules,
      overallProgress,
      categoryProgress,
      skillDistribution
    })
  }, [courses])

  useEffect(() => {
    calculateAnalytics()
  }, [calculateAnalytics])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00']

  return (
    <div>
      {/* Overview Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-primary">{analytics.overallProgress}%</h2>
              <p className="text-muted mb-0">Overall Progress</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-success">{analytics.completedModules}</h2>
              <p className="text-muted mb-0">Completed Modules</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-info">{analytics.totalModules - analytics.completedModules}</h2>
              <p className="text-muted mb-0">Remaining Modules</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-warning">{courses.length}</h2>
              <p className="text-muted mb-0">Active Courses</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Category Progress Chart */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Progress by Category</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.categoryProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Skill Distribution */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Top Skills</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.skillDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Progress List */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">Course Progress Details</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {courses.map(course => {
              const completed = course.modules.filter(m => m.isCompleted).length
              const total = course.modules.length
              const progress = total > 0 ? Math.round((completed / total) * 100) : 0

              return (
                <ListGroup.Item key={course.id} className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between mb-1">
                      <strong>{course.title}</strong>
                      <Badge bg={progress === 100 ? 'success' : progress > 50 ? 'warning' : 'secondary'}>
                        {progress}%
                      </Badge>
                    </div>
                    <ProgressBar now={progress} style={{ height: '6px' }} />
                    <small className="text-muted">
                      {completed} of {total} modules completed
                    </small>
                  </div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
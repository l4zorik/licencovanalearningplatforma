'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import Link from 'next/link'
import ProgressAnalytics from '@/components/ProgressAnalytics'
import { Course } from '@/types'

export default function AnalyticsPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // Load courses from localStorage
    const savedCourses = localStorage.getItem('courses')
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses))
      } catch (error) {
        console.error('Failed to parse courses:', error)
      }
    }
  }, [])

  return (
    <main className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-light bg-white border-bottom mb-4">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Link href="/" className="btn btn-outline-primary btn-sm me-3">
              ← Back to Dashboard
            </Link>
            <h4 className="mb-0 text-primary">📊 Learning Analytics</h4>
          </div>
          <Badge bg="info" className="fs-6">
            {courses.length} Courses Tracked
          </Badge>
        </Container>
      </nav>

      <Container>
        {courses.length > 0 ? (
          <ProgressAnalytics courses={courses} />
        ) : (
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="text-center shadow-sm">
                <Card.Body className="py-5">
                  <div className="display-4 mb-3">📈</div>
                  <h3>No Data Yet</h3>
                  <p className="text-muted">
                    Start adding courses and tracking your progress to see analytics here.
                  </p>
                  <Link href="/">
                    <Button variant="primary">Go to Dashboard</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  )
}
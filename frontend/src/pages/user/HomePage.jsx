import React from 'react'
import { Container, Row, Col, Navbar, Nav, Button, Card, Carousel } from 'react-bootstrap';
 
export default function HomePage() {
  return (
    <div>
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#" className="logo">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" className="nav-link">Home</Nav.Link>
            <Nav.Link href="#" className="nav-link">About</Nav.Link>
            <Nav.Link href="#" className="nav-link">Services</Nav.Link>
            <Nav.Link href="#" className="nav-link">Contact</Nav.Link>
          </Nav>
          <Button variant="primary" className="sign-in-btn">Sign In</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="welcome-heading">Welcome to Your Website</h1>
          <p className="description">Engaging tagline or brief description of your website.</p>
          <Button variant="info" className="learn-more-btn">Learn More</Button>
        </Col>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2 className="featured-heading">Featured Products</h2>
          <Row>
            <Col md={4}>
              <Card className="product-card">
                <Card.Img variant="top" src="https://via.placeholder.com/200x150" />
                <Card.Body>
                  <Card.Title>Product 1</Card.Title>
                  <Card.Text>
                    Description of Product 1.
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="product-card">
                <Card.Img variant="top" src="https://via.placeholder.com/200x150" />
                <Card.Body>
                  <Card.Title>Product 2</Card.Title>
                  <Card.Text>
                    Description of Product 2.
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="product-card">
                <Card.Img variant="top" src="https://via.placeholder.com/200x150" />
                <Card.Body>
                  <Card.Title>Product 3</Card.Title>
                  <Card.Text>
                    Description of Product 3.
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    <footer className="mt-4 py-3 bg-light text-center">
      <Container>
        <p className="footer-text">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </Container>
    </footer>
  </div>
  )
}

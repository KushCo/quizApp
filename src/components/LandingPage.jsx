import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { sampleCodes } from '../data/quizData';

const LandingPage = ({ onPlayClick, onLoginClick, onSignupClick, user, onLogout }) => {
  return (
    <div className="landing-page page-transition">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-primary">
            <span className="me-2">🎯</span>
            QuizMaster
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Nav.Item className="d-flex align-items-center me-3">
                    <span>Welcome, {user.name}</span>
                  </Nav.Item>
                  <Button variant="outline-secondary" onClick={onLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline-primary" 
                    onClick={onLoginClick}
                    className="me-2"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={onSignupClick}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        <Row className="justify-content-center align-items-center min-vh-75">
          <Col md={8} lg={6} className="text-center">
            <div className="mb-4">
              <span style={{ fontSize: '4rem' }}>🧠</span>
            </div>
            <h1 className="quiz-headline mb-3">Challenge Your Knowledge</h1>
            <p className="subtitle mb-4">
              Take exciting quizzes, challenge friends, and test your knowledge across various topics.
              Enter a quiz code or start a new quiz to begin your journey!
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onPlayClick}
              className="px-5 py-3 mb-4 fw-semibold"
            >
              Play Quiz
            </Button>

            <div className="mt-4 p-4 bg-light rounded-3">
              <p className="mb-3 fw-semibold">Try these sample quiz codes:</p>
              <div className="d-flex flex-wrap justify-content-center">
                {sampleCodes.map((item, index) => (
                  <div key={index} className="badge bg-white text-dark border m-1 p-2">
                    <span className="fw-bold">{item.code}</span>: {item.name}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 pt-3">
          <Col md={4} className="mb-4">
            <div className="text-center p-4 quiz-card bg-white h-100">
              <div className="mb-3">
                <span style={{ fontSize: '2rem' }}>⏱️</span>
              </div>
              <h3 className="h4 mb-3">Timed Challenges</h3>
              <p className="text-muted">
                Test your knowledge under pressure with our timed quizzes that keep you on your toes.
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center p-4 quiz-card bg-white h-100">
              <div className="mb-3">
                <span style={{ fontSize: '2rem' }}>🏆</span>
              </div>
              <h3 className="h4 mb-3">Track Progress</h3>
              <p className="text-muted">
                See your scores and improvement over time as you take more quizzes.
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center p-4 quiz-card bg-white h-100">
              <div className="mb-3">
                <span style={{ fontSize: '2rem' }}>👥</span>
              </div>
              <h3 className="h4 mb-3">Share with Friends</h3>
              <p className="text-muted">
                Share quiz codes with friends and compare your results on the same challenges.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-light py-4 mt-5">
        <Container className="text-center">
          <p className="mb-0">© 2025 QuizMaster. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
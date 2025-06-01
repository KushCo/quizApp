import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useQuiz } from '../contexts/QuizContext';

const QuizEntry = ({ onStart, onBack, user }) => {
  const [quizCode, setQuizCode] = useState('');
  const [error, setError] = useState('');
  const { quizExists } = useQuiz();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizCode.trim()) {
      setError('Please enter a quiz code');
      return;
    }

    if (quizExists(quizCode)) {
      onStart(quizCode);
    } else {
      setError('Invalid quiz code. Please try again.');
    }
  };

  return (
    <div className="quiz-entry-page page-transition">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Button 
              variant="link" 
              className="text-decoration-none d-flex align-items-center mb-4" 
              onClick={onBack}
            >
              ← Back to Home
            </Button>
            
            <Card className="quiz-card shadow border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <span style={{ fontSize: '3rem' }}>🎮</span>
                  <h2 className="mt-3 mb-1">Enter Quiz Code</h2>
                  <p className="text-muted">
                    {user ? `Ready to play, ${user.name}?` : 'Ready to test your knowledge?'}
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="quizCode">
                    <Form.Control
                      type="text"
                      placeholder="Enter your quiz code"
                      value={quizCode}
                      onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                      className="quiz-code-input py-3"
                      maxLength={6}
                    />
                    <Form.Text className="text-muted text-center d-block">
                      The code is usually 6 characters long
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit"
                      size="lg"
                      className="py-3"
                    >
                      Start Quiz
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="mt-4 p-3 bg-white rounded shadow-sm">
              <h4 className="h5 mb-3">Sample Quiz Codes</h4>
              <div className="d-flex flex-wrap">
                <div className="badge bg-light text-dark border mx-1 p-2 mb-2">
                  GK123 - General Knowledge
                </div>
                <div className="badge bg-light text-dark border mx-1 p-2 mb-2">
                  CODE42 - Programming Basics
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuizEntry;
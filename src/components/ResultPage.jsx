import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { useQuiz } from '../contexts/QuizContext';
import { useState, useEffect } from 'react';

const ResultPage = ({ onPlayAgain, onHome }) => {
  const { score, getMaxScore, currentQuiz, answers } = useQuiz();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const maxScore = getMaxScore();
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  
  // Animation effect
  useEffect(() => {
    setShowAnimation(true);
    
    if (percentage > 70) {
      setShowConfetti(true);
      
      // Cleanup confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [percentage]);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master!";
    if (percentage >= 70) return "Great job! You know your stuff!";
    if (percentage >= 50) return "Good effort! Keep learning!";
    return "Nice try! Maybe study up and try again.";
  };
  
  const getResultEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🎉";
    if (percentage >= 50) return "👍";
    return "🤔";
  };

  if (!currentQuiz) {
    return (
      <Container className="text-center py-5">
        <p>No quiz results available.</p>
        <Button variant="primary" onClick={onHome}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <div className="result-page page-transition">
      {showConfetti && (
        <div className="confetti-container position-fixed top-0 start-0 w-100 h-100\" style={{ zIndex: 1040 }}>
          {/* This would have animation effects for high scores */}
        </div>
      )}
      
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className={`quiz-card shadow border-0 mb-4 ${showAnimation ? 'animate__animated animate__bounceIn' : ''}`}>
              <Card.Body className="p-4 text-center">
                <div className="result-emoji mb-3" style={{ fontSize: '4rem' }}>
                  {getResultEmoji()}
                </div>
                
                <h2 className="mb-3">Quiz Results</h2>
                <h4 className="text-primary mb-4">{currentQuiz.title}</h4>
                
                <div className="score-container mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Your Score</span>
                    <span className="fw-bold">{score} / {maxScore} points</span>
                  </div>
                  <ProgressBar 
                    now={percentage} 
                    variant={percentage >= 70 ? "success" : percentage >= 50 ? "info" : "warning"}
                    className="mb-2"
                    style={{ height: '10px' }}
                  />
                  <div className="text-end">
                    <span className="badge bg-secondary">{percentage}%</span>
                  </div>
                </div>
                
                <p className="result-message fw-semibold mb-4">
                  {getResultMessage()}
                </p>
              </Card.Body>
            </Card>
            
            <div className="answer-summary p-4 bg-white rounded-3 shadow-sm mb-4">
              <h3 className="h5 mb-3">Quiz Summary</h3>
              <p className="text-muted mb-4">Here's how you did on each question:</p>
              
              {currentQuiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctOption;
                const correctAnswerText = question.options.find(
                  opt => opt.id === question.correctOption
                )?.text;
                
                return (
                  <div key={question.id} className="mb-3 pb-3 border-bottom">
                    <p className="mb-2 fw-semibold">
                      {index + 1}. {question.text}
                    </p>
                    <div className={`d-flex align-items-center ${isCorrect ? 'text-success' : 'text-danger'}`}>
                      <span className="me-2">
                        {isCorrect ? '✅' : '❌'}
                      </span>
                      {isCorrect ? (
                        <span>Correct! (+{question.points} points)</span>
                      ) : (
                        <span>
                          Incorrect. Correct answer: {correctAnswerText}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <Button 
                variant="outline-primary"
                onClick={onHome}
                className="mb-3 mb-md-0"
              >
                Back to Home
              </Button>
              <Button 
                variant="primary"
                onClick={onPlayAgain}
              >
                Play Another Quiz
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResultPage;
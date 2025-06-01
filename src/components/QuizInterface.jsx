import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Modal } from 'react-bootstrap';
import { useQuiz } from '../contexts/QuizContext';
import QuizOption from './QuizOption';

const QuizInterface = ({ quizCode, onFinish, onExit }) => {
  const {
    loadQuiz,
    currentQuiz,
    getCurrentQuestion,
    currentQuestionIndex,
    answerQuestion,
    nextQuestion,
    answers,
    timeLeft,
    decrementTime,
    isTimeUp,
    calculateScore
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [timePercent, setTimePercent] = useState(100);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  
  // Load quiz on component mount
  useEffect(() => {
    loadQuiz(quizCode);
  }, [quizCode, loadQuiz]);
  
  // Set up timer
  useEffect(() => {
    if (!currentQuiz) return;
    
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuiz, decrementTime]);

  // Update time percentage for progress bar
  useEffect(() => {
    if (currentQuiz) {
      setTimePercent((timeLeft / currentQuiz.timePerQuestion) * 100);
    }
  }, [timeLeft, currentQuiz]);
  
  // Check if time is up
  useEffect(() => {
    if (isTimeUp() && !showTimeUpModal) {
      setShowTimeUpModal(true);
    }
  }, [timeLeft, isTimeUp, showTimeUpModal]);

  // Reset selected option when question changes
  useEffect(() => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      setSelectedOption(answers[currentQuestion.id] || null);
    }
  }, [currentQuestionIndex, getCurrentQuestion, answers]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      answerQuestion(currentQuestion.id, optionId);
    }
  };

  const handleNextQuestion = () => {
    const hasMoreQuestions = nextQuestion();
    if (!hasMoreQuestions) {
      calculateScore();
      onFinish();
    }
  };

  const handleFinishQuiz = () => {
    calculateScore();
    onFinish();
  };

  const currentQuestion = getCurrentQuestion();

  if (!currentQuiz) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading quiz...</p>
      </Container>
    );
  }

  return (
    <div className="quiz-interface page-transition">
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowExitModal(true)}
          >
            Exit Quiz
          </Button>
          <div className="quiz-info">
            <h5 className="mb-0">{currentQuiz.title}</h5>
            <small className="text-muted">Quiz Code: {currentQuiz.code}</small>
          </div>
          <div className="quiz-progress">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </div>
        </div>

        <div className="timer-bar mb-4">
          <div
            className="timer-progress"
            style={{ width: `${timePercent}%` }}
          ></div>
        </div>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="quiz-card shadow-sm border-0 mb-4 question-transition">
              <Card.Body className="p-4">
                <div className="question-header d-flex justify-content-between mb-3">
                  <span className="badge bg-primary py-2 px-3">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <span className="badge bg-secondary py-2 px-3">
                    {timeLeft} seconds
                  </span>
                </div>

                <h3 className="question-text mb-4">{currentQuestion?.text}</h3>

                <div className="options-container">
                  {currentQuestion?.options.map((option) => (
                    <QuizOption
                      key={option.id}
                      option={option}
                      isSelected={selectedOption === option.id}
                      onSelect={() => handleOptionSelect(option.id)}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between">
              <div></div> {/* Empty div for spacing */}
              {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  className="px-4"
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleFinishQuiz}
                  disabled={!selectedOption}
                  className="px-4"
                >
                  Finish Quiz
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Exit Confirmation Modal */}
      <Modal show={showExitModal} onHide={() => setShowExitModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Exit Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to exit? Your progress will be lost.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExitModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onExit}>
            Exit Quiz
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Time Up Modal */}
      <Modal show={showTimeUpModal} onHide={() => setShowTimeUpModal(false)} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Time's Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You've run out of time for this question.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowTimeUpModal(false);
              handleNextQuestion();
            }}
          >
            Continue to Next Question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuizInterface;
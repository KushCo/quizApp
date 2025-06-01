import { createContext, useContext, useState } from 'react';
import { quizzes } from '../data/quizData';

const QuizContext = createContext(null);

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  
  // Load a quiz by code
  const loadQuiz = (quizCode) => {
    const quiz = quizzes.find(q => q.code === quizCode);
    if (quiz) {
      setCurrentQuiz(quiz);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTimeLeft(quiz.timePerQuestion);
      setScore(0);
      return true;
    }
    return false;
  };

  // Check if a quiz exists by code
  const quizExists = (quizCode) => {
    return quizzes.some(q => q.code === quizCode);
  };
  
  // Answer a question
  const answerQuestion = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };
  
  // Move to the next question
  const nextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(currentQuiz.timePerQuestion);
      return true;
    }
    return false;
  };
  
  // Calculate final score
  const calculateScore = () => {
    if (!currentQuiz) return 0;
    
    let totalScore = 0;
    currentQuiz.questions.forEach(question => {
      if (answers[question.id] === question.correctOption) {
        totalScore += question.points;
      }
    });
    
    setScore(totalScore);
    return totalScore;
  };
  
  // Get maximum possible score
  const getMaxScore = () => {
    if (!currentQuiz) return 0;
    
    return currentQuiz.questions.reduce((total, question) => {
      return total + question.points;
    }, 0);
  };
  
  // Timer functions
  const decrementTime = () => {
    setTimeLeft(prevTime => Math.max(0, prevTime - 1));
  };
  
  const isTimeUp = () => {
    return timeLeft === 0;
  };

  // Get current question
  const getCurrentQuestion = () => {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
      return null;
    }
    return currentQuiz.questions[currentQuestionIndex];
  };

  const value = {
    currentQuiz,
    currentQuestionIndex,
    answers,
    timeLeft,
    score,
    loadQuiz,
    quizExists,
    answerQuestion,
    nextQuestion,
    calculateScore,
    getMaxScore,
    decrementTime,
    isTimeUp,
    getCurrentQuestion
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
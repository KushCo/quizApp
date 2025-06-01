import { useState } from 'react';
import { QuizProvider } from './contexts/QuizContext';
import LandingPage from './components/LandingPage';
import AuthModals from './components/AuthModals';
import QuizEntry from './components/QuizEntry';
import QuizInterface from './components/QuizInterface';
import ResultPage from './components/ResultPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [user, setUser] = useState(null);
  const [currentQuizCode, setCurrentQuizCode] = useState('');

  // Function to handle navigation between pages
  const navigate = (page) => {
    setCurrentPage(page);
  };

  // Function to handle authentication
  const handleLogin = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Function to start a quiz with a code
  const startQuiz = (quizCode) => {
    setCurrentQuizCode(quizCode);
    navigate('quiz');
  };

  return (
    <QuizProvider>
      <div className="app-container page-transition">
        <AuthModals
          showLogin={showLoginModal}
          showSignup={showSignupModal}
          onHideLogin={() => setShowLoginModal(false)}
          onHideSignup={() => setShowSignupModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />

        {currentPage === 'landing' && (
          <LandingPage 
            onPlayClick={() => navigate('quizEntry')}
            onLoginClick={() => setShowLoginModal(true)}
            onSignupClick={() => setShowSignupModal(true)}
            user={user}
            onLogout={handleLogout}
          />
        )}

        {currentPage === 'quizEntry' && (
          <QuizEntry 
            onStart={startQuiz}
            onBack={() => navigate('landing')}
            user={user}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizInterface 
            quizCode={currentQuizCode}
            onFinish={() => navigate('result')}
            onExit={() => navigate('landing')}
          />
        )}

        {currentPage === 'result' && (
          <ResultPage
            onPlayAgain={() => navigate('quizEntry')}
            onHome={() => navigate('landing')}
          />
        )}
      </div>
    </QuizProvider>
  );
}

export default App;
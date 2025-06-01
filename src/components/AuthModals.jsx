import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const AuthModals = ({ 
  showLogin, 
  showSignup, 
  onHideLogin, 
  onHideSignup, 
  onLogin, 
  onSignup 
}) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    // Simple email validation
    if (!loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address');
      return;
    }
    
    // Simulate successful login
    onLogin({
      name: loginEmail.split('@')[0],
      email: loginEmail
    });
    
    // Reset form
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupError('Please fill in all fields');
      return;
    }
    
    // Simple email validation
    if (!signupEmail.includes('@')) {
      setSignupError('Please enter a valid email address');
      return;
    }
    
    // Password validation
    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }
    
    // Password match validation
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    
    // Simulate successful signup
    onSignup({
      name: signupName,
      email: signupEmail
    });
    
    // Reset form
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupError('');
  };

  return (
    <>
      {/* Login Modal */}
      <Modal show={showLogin} onHide={onHideLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login to QuizMaster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rememberMe">
              <Form.Check 
                type="checkbox" 
                label="Remember me" 
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
          
          <div className="text-center mt-3">
            <p className="mb-0">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0" 
                onClick={() => {
                  onHideLogin();
                  onSignup && setTimeout(() => onSignupClick(), 300);
                }}
              >
                Sign up
              </Button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={onHideSignup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {signupError && <Alert variant="danger">{signupError}</Alert>}
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3" controlId="signupName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Must be at least 6 characters long.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="termsAgreement">
              <Form.Check 
                type="checkbox" 
                label="I agree to the Terms and Conditions" 
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </div>
          </Form>
          
          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0" 
                onClick={() => {
                  onHideSignup();
                  onLogin && setTimeout(() => onLoginClick(), 300);
                }}
              >
                Login
              </Button>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModals;
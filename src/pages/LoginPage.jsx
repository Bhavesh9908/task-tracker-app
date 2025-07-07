import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Changed to use Link
import { authenticateUser } from '../utils/auth';
import { validateLoginForm } from '../utils/validation';
import PasswordInput from '../components/auth/PasswordInput';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';
import RememberMeCheckbox from '../components/auth/RememberMeCheckbox';
import '../styles/Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setFormData(prev => ({ ...prev, username: rememberedUser }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Rate limiting
    if (loginAttempts >= 5) {
      setErrors({ general: 'Too many attempts. Please try again later.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await authenticateUser(formData, rememberMe);
      navigate('/dashboard');
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12H15" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16H15" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1>TaskFlow Pro</h1>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to manage your tasks</p>
          </div>

          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className={`input-group ${errors.username ? 'error' : ''}`}>
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                disabled={isLoading}
                aria-invalid={!!errors.username}
                aria-describedby="username-error"
              />
              {errors.username && (
                <span id="username-error" className="error-text">
                  {errors.username}
                </span>
              )}
            </div>

            <PasswordInput
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
            />

            <RememberMeCheckbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span className="sr-only">Loading...</span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
          </div>

          <div className="social-login-divider">
            <span>OR</span>
          </div>

          <SocialLoginButtons disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../Login_asset/Logo.webp';

const Login = () => {
  const { loginUser } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const storedUser = localStorage.getItem(`user_${username}`);

    if (isLoginView) {
      // Login Logic
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
          setSuccess('Successfully logged in!');
          loginUser(username);
          navigate('/home');
        } else {
          setError('Incorrect password. Please try again.');
        }
      } else {
        setError('User not found. Please sign up first.');
      }
    } else {
      // Sign Up Logic
      if (storedUser) {
        setError('Username already taken. Please choose another.');
      } else {
        const newUser = { username, password };
        localStorage.setItem(`user_${username}`, JSON.stringify(newUser));
        setSuccess('Account created! Logging you in...');
        setTimeout(() => {
          loginUser(username);
          navigate('/home');
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        
        {/* Left Side: Visual Preview / Text Area */}
        <div className={styles.previewSection}>
          <div className={styles.headingText}>
            See everyday moments from your<br/>
            <span className={styles.gradientRed}>close</span> <span className={styles.gradientPink}>friends</span>.
          </div>

          <div className={styles.previewImageContainer}>
            <img 
              src={logo} 
              alt="Friends Moments" 
              className={styles.previewImg} 
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              {isLoginView ? 'Log into Nano-Gram' : 'Create Account'}
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder=" "
                  className={styles.inputField}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
                <label className={styles.floatingLabel}>Username</label>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder=" "
                  className={styles.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
                <label className={styles.floatingLabel}>Password</label>
              </div>

              {error && <div className={styles.errorMessage}>{error}</div>}
              {success && <div className={styles.successMessage}>{success}</div>}

              <button type="submit" className={styles.submitButton}>
                {isLoginView ? 'Log in' : 'Sign up'}
              </button>
            </form>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <button 
              type="button" 
              className={styles.outlineButton}
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError('');
                setSuccess('');
              }}
            >
               {isLoginView ? 'Create new account' : 'Back to Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

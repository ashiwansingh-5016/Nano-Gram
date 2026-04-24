import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../login_asset/Logo.webp';

const Login = () => {
  const { loginUser } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Always treat as login for visual mockup as per design
    const storedUser = localStorage.getItem(`user_${username}`);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        setSuccess('Successfully logged in! Welcome back, ' + username + '.');
        loginUser(username);
        navigate('/home');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } else {
      // Mock flow: if not found, create one automatically to satisfy previous requirement
      localStorage.setItem(
        `user_${username}`,
        JSON.stringify({ username, password })
      );
      setSuccess('Account created successfully! You can now log in.');
      loginUser(username);
      navigate('/home');
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
            <h2 className={styles.formTitle}>Log into Nano-Gram</h2>

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
                <label className={styles.floatingLabel}>Phone number, username, or email</label>
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

              <button type="submit" className={styles.submitButton}>
                Log in
              </button>
            </form>

            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>


            <button type="button" className={styles.outlineButton}>
               Create new account
            </button>
            


          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

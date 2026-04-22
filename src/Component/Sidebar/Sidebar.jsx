import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import CreatePost from '../CreatePost/CreatePost';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { logoutUser, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer} onClick={() => navigate('/home')}>
          <span className={styles.logoText}>Nano-Gram</span>
        </div>

        <nav className={styles.navMenu}>
          <NavLink to="/home" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            {/* Simple placeholder SVG for home */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </NavLink>

          <div className={styles.navItem}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search</span>
          </div>

          <div className={styles.navItem}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
             </svg>
            <span>Explore</span>
          </div>

          <div className={styles.navItem}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
             </svg>
            <span>Messages</span>
          </div>

          <div className={styles.navItem}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Notifications</span>
          </div>

          <div className={styles.navItem} onClick={() => setShowCreateModal(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>Create</span>
          </div>

          <NavLink to="/profile" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
             {/* Dynamic avatar logic */}
             <div className={styles.navAvatar}></div>
            <span>Profile</span>
          </NavLink>
        </nav>

        <div className={styles.moreMenu}>
          <div className={styles.navItem} onClick={handleLogout}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <line x1="3" y1="12" x2="21" y2="12"></line>
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>

      {showCreateModal && <CreatePost onClose={() => setShowCreateModal(false)} />}
    </>
  );
};

export default Sidebar;

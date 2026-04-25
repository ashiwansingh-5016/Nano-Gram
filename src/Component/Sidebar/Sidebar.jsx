import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import CreatePost from '../CreatePost/CreatePost';
import appIcon from '../Login_asset/letter-n.png';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { logoutUser, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleSearch = () => {
    setIsCreateMenuOpen(false);
    setIsNotificationsOpen(false);
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleNotifications = () => {
    setIsCreateMenuOpen(false);
    setIsSearchOpen(false);
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const toggleCreateMenu = () => {
    setIsSearchOpen(false);
    setIsNotificationsOpen(false);
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  // Dynamic Notifications Data
  const [notifications] = useState([
    {
      id: 1,
      group: 'Yesterday',
      items: [
        { id: 'n1', user: 'pixel_perfect', action: 'liked your photo.', time: '1d', type: 'like' },
        { id: 'n2', user: 'design_explorer', action: 'started following you.', time: '1d', type: 'follow' },
      ]
    },
    {
      id: 2,
      group: 'This week',
      items: [
        { id: 'n3', user: 'code_wizard', action: 'commented: "This is brilliant! 🔥"', time: '3d', type: 'comment' },
        { id: 'n4', user: 'wanderer_99', action: 'and 3 others liked your story.', time: '5d', type: 'like' },
        { id: 'n5', user: 'coffee_lover', action: 'replied to your comment.', time: '6d', type: 'comment' },
      ]
    },
    {
      id: 3,
      group: 'This month',
      items: [
        { id: 'n6', user: 'tech_aura', action: 'started following you.', time: '2w', type: 'follow' },
        { id: 'n7', user: 'minimalist_vibe', action: 'and 12 others liked your reel.', time: '3w', type: 'like' },
        { id: 'n8', user: 'avillix.ark', action: 'commented: "Crazy 🔥"', time: '19 Feb', type: 'comment' },
        { id: 'n9', user: 'suzume_01', action: 'commented: "🔥🔥❤️"', time: '19 Feb', type: 'comment' },
      ]
    }
  ]);

  const filteredNotifications = notifications.map(group => ({
    ...group,
    items: group.items.filter(item => activeFilter === 'all' || item.type === activeFilter)
  })).filter(group => group.items.length > 0);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <div className={`${styles.sidebar} ${(isSearchOpen || isNotificationsOpen) ? styles.sidebarNarrow : ''}`}>
        <div className={styles.logoContainer} onClick={() => navigate('/home')}>
          <img src={appIcon} alt="Nano-Gram logo" className={styles.logoIconImage} />
        </div>

        <nav className={styles.navMenu}>
          {/* Home */}
          <NavLink to="/home" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </NavLink>

          {/* Reels */}
          <div className={styles.navItem}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
             </svg>
            <span>Reels</span>
          </div>

          {/* Messages */}
          <div className={styles.navItem}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
             </svg>
            <span>Messages</span>
          </div>

          {/* Search */}
          <div className={`${styles.navItem} ${isSearchOpen ? styles.activeNavItem : ''}`} onClick={toggleSearch}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isSearchOpen ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search</span>
          </div>

          {/* Explore */}
          <NavLink to="/explore" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
             </svg>
            <span>Explore</span>
          </NavLink>

          {/* Notifications */}
          <div className={`${styles.navItem} ${isNotificationsOpen ? styles.activeNavItem : ''}`} onClick={toggleNotifications}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isNotificationsOpen ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Notifications</span>
          </div>

          {/* Create with Dropdown */}
          <div className={`${styles.navItem} ${isCreateMenuOpen ? styles.activeNavItem : ''}`} onClick={toggleCreateMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Create</span>

            {isCreateMenuOpen && (
              <div className={styles.createDropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.dropdownItem} onClick={() => { setShowCreateModal(true); setIsCreateMenuOpen(false); }}>
                  <span>Post</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className={styles.dropdownItem}>
                  <span>Live video</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <div className={styles.dropdownItem}>
                  <span>Ad</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className={styles.moreMenu}>
          {/* Profile */}
          <NavLink to="/profile" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
             <img src={`https://i.pravatar.cc/150?u=${currentUser.username}`} alt="avatar" className={styles.navAvatar} />
            <span>Profile</span>
          </NavLink>

          <div className={styles.navItem} onClick={handleLogout}>
             <span style={{color: '#ed4956', fontWeight: 'bold', fontSize: '14px', marginLeft: '4px'}}>Logout</span>
          </div>
        </div>
      </div>

      {/* Slide Out Search Drawer */}
      <div className={`${styles.searchDrawer} ${isSearchOpen ? styles.searchDrawerOpen : ''}`}>
        <div className={styles.searchHeader}>
          <h2>Search</h2>
        </div>
        <div className={styles.searchInputContainer}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
          <button className={styles.clearSearchBtn} onClick={() => setIsSearchOpen(false)}>×</button>
        </div>
        <div className={styles.searchResultsContainer}>
          <div className={styles.recentHeader}>
            <h4>Recent</h4>
          </div>
          <div className={styles.noSearchText}>
            No recent searches.
          </div>
        </div>
      </div>

      {/* Slide Out Notifications Drawer */}
      <div className={`${styles.notifDrawer} ${isNotificationsOpen ? styles.notifDrawerOpen : ''}`}>
        <div className={styles.notifHeader}>
          <h2>Notifications</h2>
          <button className={styles.closeBtn} onClick={() => setIsNotificationsOpen(false)}>×</button>
        </div>
        
        <div className={styles.filterBar}>
          <button 
            className={`${styles.filterChip} ${activeFilter === 'all' ? styles.activeChip : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`${styles.filterChip} ${activeFilter === 'comment' ? styles.activeChip : ''}`}
            onClick={() => setActiveFilter('comment')}
          >
            Comments
          </button>
        </div>

        <div className={styles.notifList}>
          {filteredNotifications.map(group => (
            <div key={group.id} className={styles.timeGroup}>
              <h3>{group.group}</h3>
              {group.items.map(item => (
                <div key={item.id} className={styles.notifItem}>
                  <img src={`https://i.pravatar.cc/150?u=${item.user}`} alt="user" className={styles.avatar} />
                  <div className={styles.notifText}>
                    <strong>{item.user}</strong> {item.action} <span className={styles.time}>{item.time}</span>
                  </div>
                  {item.type === 'follow' ? (
                    <button className={styles.followBtn}>Follow</button>
                  ) : (
                    <div className={styles.postThumbnail}></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && <CreatePost onClose={() => setShowCreateModal(false)} />}
    </>
  );
};

export default Sidebar;

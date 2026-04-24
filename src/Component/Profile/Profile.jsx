import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './Profile.module.css';

const Profile = () => {
  const { currentUser, posts } = useAppContext();

  // Random Data Generater
  const randomBios = [
    '"Not the sun in your bright day, but the brightest moonlight in your darkest night." 🌙',
    'Adventure seeker | Coffee addict | Dreamer ✨',
    'Creating my own sunshine in this digital world ☀️',
    'Living life one pixel at a time 🎮',
    'Simply me, doing what I love. 💫',
    'Tech enthusiast | Amateur photographer | Lifelong learner 📸'
  ];

  const randomNames = [
    'Ashwan Singh',
    'Alex Rivers',
    'Jordan Smith',
    'Taylor Reed',
    'Morgan Sky'
  ];

  // Using simple hash of username to keep it consistent per user, but "random"
  const getIndex = (arr) => {
    if (!currentUser) return 0;
    const code = currentUser.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return code % arr.length;
  };

  const bio = randomBios[getIndex(randomBios)];
  const fullName = randomNames[getIndex(randomNames)];

  // Filter posts belonging to the current user
  const userPosts = posts.filter(post => post.username === currentUser?.username);

  if (!currentUser) return null;

  return (
    <div className={styles.profilePage}>
      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            <img 
              src={`https://i.pravatar.cc/150?u=${currentUser.username}`} 
              alt="profile" 
              className={styles.avatar} 
            />
            <div className={styles.avatarOverlay}>
               <svg color="#ffffff" fill="#ffffff" height="24" width="24" viewBox="0 0 24 24">
                  <path d="M12 11.5a3.5 3.5 0 1 0 3.5 3.5 3.5 3.5 0 0 0-3.5-3.5zm0-4.5A7 7 0 1 1 5 14a7 7 0 0 1 7-7zm0 18a11 11 0 1 1 11-11 11 11 0 0 1-11 11z"></path>
               </svg>
            </div>
          </div>
          <div className={styles.noteBubble}>Note...</div>
        </div>

        <section className={styles.infoSection}>
          <div className={styles.usernameRow}>
            <h2>{currentUser.username}</h2>
            <button className={styles.settingsBtn}>
               <svg color="#262626" fill="#262626" height="24" width="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                  <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66 1.269 1.269 0 0 1-1.018-.028L7.682 3.14 6.364 4.458l.412 1.069a1.269 1.269 0 0 1-.028 1.018 1.269 1.269 0 0 1-.66.796L5.1 7.846v1.86l.996.505a1.269 1.269 0 0 1 .66.796 1.269 1.269 0 0 1-.028 1.018l-.513 1.069 1.318 1.318 1.069-.513a1.269 1.269 0 0 1 1.018-.028 1.269 1.269 0 0 1 .796.66l.505.996h1.86l.505-.996a1.269 1.269 0 0 1 .796-.66 1.269 1.269 0 0 1 1.018.028l1.069.513 1.318-1.318-.513-1.069a1.269 1.269 0 0 1 .028-1.018 1.269 1.269 0 0 1 .66-.796l.996-.505v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796 1.269 1.269 0 0 1 .028-1.018l.513-1.069-1.318-1.318-1.069.513a1.269 1.269 0 0 1-1.018.028z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
               </svg>
            </button>
          </div>

          <div className={styles.statsRow}>
            <span><strong>{userPosts.length}</strong> posts</span>
            <span><strong>253</strong> followers</span>
            <span><strong>277</strong> following</span>
          </div>

          <div className={styles.bioSection}>
            <span className={styles.fullName}>{fullName}</span>
            <p>{bio}</p>
            <a href="#" className={styles.bioLink}>@{currentUser.username}</a>
          </div>
        </section>
      </header>

      <div className={styles.actionButtons}>
        <button className={styles.editBtn}>Edit Profile</button>
        <button className={styles.archiveBtn}>View archive</button>
      </div>

      <div className={styles.highlights}>
        <div className={styles.highlightItem}>
          <div className={styles.newHighlightCircle}>
             <svg color="#262626" fill="#262626" height="44" width="44" viewBox="0 0 24 24">
                <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8h-1.5c-.4 0-.8.3-.8.8v8.3H3c-.4 0-.8.3-.8.8v1.5c0 .4.3.8.8.8h8.3V21c0 .4.3.8.8.8h1.5c.4 0 .8-.3.8-.8v-8.3H21c.4 0 .8-.3.8-.8v-1.5c.1-.4-.3-.8-.8-.8z" fill="currentColor"></path>
             </svg>
          </div>
          <span>New</span>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.activeTab}`}>
           <svg color="#262626" fill="#262626" height="12" width="12" viewBox="0 0 24 24">
              <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
           </svg>
           <span>POSTS</span>
        </div>
        <div className={styles.tab}>REELS</div>
        <div className={styles.tab}>SAVED</div>
        <div className={styles.tab}>TAGGED</div>
      </div>

      <div className={styles.emptyState}>
        <div className={styles.cameraIconCircle}>
           <svg color="#262626" fill="#262626" height="62" width="62" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
           </svg>
        </div>
        <h1>Share photos</h1>
        <p>When you share photos, they will appear on your profile.</p>
        <button className={styles.shareFirstBtn}>Share your first photo</button>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <span>Meta</span> <span>About</span> <span>Blog</span> <span>Jobs</span> <span>Help</span> <span>API</span> <span>Privacy</span> <span>Terms</span>
        </div>
        <div className={styles.footerCopyright}>
           © 2026 Nano-Gram from Meta
        </div>
      </footer>
    </div>
  );
};

export default Profile;

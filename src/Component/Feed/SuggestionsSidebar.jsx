import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './SuggestionsSidebar.module.css';

const SuggestionsSidebar = () => {
  const { currentUser } = useAppContext();

  const suggestions = [
    { id: 1, name: 'Hardika & Nirmeet', label: 'Followed by kanishqofficial' },
    { id: 2, name: 'APSK2K25-26', label: 'Followed by ughhdipanshi_' },
    { id: 3, name: 'Disha', label: 'Followed by akshatahajanre12' },
    { id: 4, name: 'Honey', label: 'Suggested for you' },
    { id: 5, name: 'Fema+', label: 'Followed by namikaze_yash' },
  ];

  if (!currentUser) return null;

  return (
    <div className={styles.container}>
      {/* Current User Switcher */}
      <div className={styles.userSection}>
        <div className={styles.avatarBig}></div>
        <div className={styles.userInfo}>
           <span className={styles.username}>{currentUser.username}</span>
           <span className={styles.userSubtitle}>{currentUser.username.replace('_', ' ')}</span>
        </div>
        <button className={styles.switchBtn}>Switch</button>
      </div>

      <div className={styles.suggestionsHeader}>
        <span>Suggested for you</span>
        <button className={styles.seeAllBtn}>See all</button>
      </div>

      <div className={styles.suggestionsList}>
        {suggestions.map(s => (
          <div key={s.id} className={styles.suggestItem}>
            <div className={styles.avatarSmall}></div>
            <div className={styles.userInfo}>
              <span className={styles.suggestName}>{s.name}</span>
              <span className={styles.suggestLabel}>{s.label}</span>
            </div>
            <button className={styles.followBtn}>Follow</button>
          </div>
        ))}
      </div>

      <div className={styles.footerLinks}>
        About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
        <br/><br/>
        © 2026 INSTAGRAM FROM META
      </div>
    </div>
  );
};

export default SuggestionsSidebar;

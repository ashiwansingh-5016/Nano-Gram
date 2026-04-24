import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styles from './SuggestionsSidebar.module.css';

const SuggestionsSidebar = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  const namesPool = [
    'Hardika & Nirmeet', 'APSK2K25-26', 'Disha', 'Honey', 'Fema+', 
    'Alex Rivers', 'Jordan Smith', 'Taylor Reed', 'Morgan Sky', 
    'pixel_art', 'coding_guru', 'nature_lover', 'traveler_01',
    'mountain_climber', 'coffee_enthusiast', 'tech_wizard', 'sunshine_rays',
    'velocity_vibe', 'urban_explorer', 'creative_soul', 'ocean_breeze',
    'night_owl', 'morning_star', 'wanderlust_king', 'zen_master'
  ];
  
  const labelsPool = [
    'Suggested for you',
    'New to Nano-Gram',
    'Followed by '
  ];

  // Randomize suggestions on component load and keep them stable
  const suggestions = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const name = namesPool[Math.floor(Math.random() * namesPool.length)];
      let label = labelsPool[Math.floor(Math.random() * labelsPool.length)];
      
      if (label === 'Followed by ') {
        let follower = namesPool[Math.floor(Math.random() * namesPool.length)];
        // Ensure follower is not the same as the suggested user
        while (follower === name) {
          follower = namesPool[Math.floor(Math.random() * namesPool.length)];
        }
        label += follower.toLowerCase().replace(/ /g, '_');
      }

      return {
        id: i + 1,
        name: name,
        label: label
      };
    }).filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
  }, []);



  if (!currentUser) return null;

  return (
    <div className={styles.container}>
      {/* Current User Switcher */}
      <div className={styles.userSection} onClick={() => navigate('/profile')}>
        <img src={`https://i.pravatar.cc/150?u=${currentUser.username}`} alt="avatar" className={styles.avatarBig} />
        <div className={styles.userInfo}>
           <span className={styles.username}>{currentUser.username}</span>
           <span className={styles.userSubtitle}>{currentUser.username.replace('_', ' ')}</span>
        </div>
        <button className={styles.switchBtn}>Visit</button>
      </div>

      <div className={styles.suggestionsHeader}>
        <span>Suggested for you</span>
        <button className={styles.seeAllBtn}>See all</button>
      </div>

      <div className={styles.suggestionsList}>
        {suggestions.map(s => (
          <div key={s.id} className={styles.suggestItem}>
            <img src={`https://i.pravatar.cc/150?u=${s.name}`} alt="avatar" className={styles.avatarSmall} />
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

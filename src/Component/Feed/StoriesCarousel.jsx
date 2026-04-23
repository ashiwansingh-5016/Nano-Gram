import React from 'react';
import styles from './StoriesCarousel.module.css';
import { useAppContext } from '../../context/AppContext';

const StoriesCarousel = () => {
  const { currentUser } = useAppContext();

  // Generate some fake stories users based on current user
  const stories = [
    { id: 1, text: 'Your story', isUser: true },
    { id: 2, text: 'john_doe123' },
    { id: 3, text: 'sarah.smth' },
    { id: 4, text: 'wanderlust_00' },
    { id: 5, text: '_creator_xyz' },
    { id: 6, text: 'music.daily' },
    { id: 7, text: 'tech_guru' },
  ];

  return (
    <div className={styles.carouselContainer}>
      {stories.map(story => (
        <div key={story.id} className={styles.storyItem}>
          <div className={`${styles.avatarRing} ${story.isUser ? styles.grayRing : ''}`}>
             <img src={`https://i.pravatar.cc/150?u=${story.text}`} alt="story" className={styles.avatar} />
             {story.isUser && <div className={styles.addIcon}>+</div>}
          </div>
          <span className={styles.storyText}>{story.text}</span>
        </div>
      ))}
    </div>
  );
};

export default StoriesCarousel;

import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './Profile.module.css';

const Profile = () => {
  const { posts, currentUser } = useAppContext();
  
  if (!currentUser) return null;

  const userPosts = posts.filter(post => post.username === currentUser.username);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}></div>
        <div className={styles.userInfo}>
          <h2 className={styles.username}>{currentUser.username}</h2>
          <div className={styles.stats}>
            <span><strong>{userPosts.length}</strong> posts</span>
          </div>
        </div>
      </div>

      <div className={styles.gridDivider}></div>

      <div className={styles.gridContainer}>
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <div key={post.id} className={styles.gridItem}>
              <img src={post.imageUrl} alt="User post" className={styles.gridImage} />
              <div className={styles.gridOverlay}>
                <span>❤️ {post.likes}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noPostsMessage}>
            No posts yet. Tap "+ Create" to share your first memory!
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

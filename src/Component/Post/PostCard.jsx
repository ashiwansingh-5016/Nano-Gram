import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  const { toggleLike, currentUser } = useAppContext();
  
  const isLiked = currentUser ? post.likedBy.includes(currentUser.username) : false;

  const handleLike = () => {
    toggleLike(post.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.headerText}>
          <span className={styles.username}>{post.username} <span className={styles.timeLabel}>• 1h</span></span>
          <span className={styles.subtext}>Original audio</span>
        </div>
        <div className={styles.moreOptions}>•••</div>
      </div>
      
      <div className={styles.imageContainer}>
        <img src={post.imageUrl} alt="Post content" className={styles.image} />
      </div>

      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <button className={styles.actionBtn} onClick={handleLike}>
            {isLiked ? (
              <svg color="#ed4956" fill="#ed4956" height="24" width="24" viewBox="0 0 48 48">
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            ) : (
              <svg color="#262626" fill="#262626" height="24" width="24" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.174 1.644 1.171 2.484 0a4.21 4.21 0 0 1 3.425-1.941z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )}
          </button>
          
          <button className={styles.actionBtn}>
             <svg color="#262626" fill="#262626" height="24" width="24" viewBox="0 0 24 24">
               <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
             </svg>
          </button>
          
          <button className={styles.actionBtn}>
             <svg color="#262626" fill="#262626" height="24" width="24" viewBox="0 0 24 24">
               <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
               <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
             </svg>
          </button>
        </div>
        
        <button className={styles.actionBtn}>
           <svg color="#262626" fill="#262626" height="24" width="24" viewBox="0 0 24 24">
             <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
           </svg>
        </button>
      </div>

      <div className={styles.likesCount}>
        {post.likes} {post.likes === 1 ? 'like' : 'likes'}
      </div>

      <div className={styles.captionBlock}>
        <span className={styles.captionUsername}>{post.username}</span>
        <span className={styles.captionText}>{post.caption}</span>
      </div>
    </div>
  );
};

export default PostCard;

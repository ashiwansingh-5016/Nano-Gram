import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './CreatePost.module.css';

const CreatePost = ({ onClose }) => {
  const { addPost, currentUser } = useAppContext();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl || !caption) return;

    addPost({
      username: currentUser.username,
      imageUrl,
      caption,
    });
    
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Create new post</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputBlock}>
            <label>Image URL:</label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          {imageUrl && (
            <div className={styles.previewBox}>
               <img src={imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
          <div className={styles.inputBlock}>
            <label>Caption:</label>
            <textarea 
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows="3"
              required
              className={styles.input}
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Share</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './CreatePost.module.css';

const CreatePost = ({ onClose }) => {
  const { addPost } = useAppContext();
  const [step, setStep] = useState(1); 
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const fileInputRef = React.useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl) return;

    addPost({
      imageUrl,
      caption,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <button className={styles.closeScreenBtn} onClick={onClose}>×</button>
      
      <div className={styles.modal}>
        <div className={styles.header}>
          {step === 2 && (
            <button className={styles.backBtn} onClick={() => setStep(1)}>
               <svg color="#262626" fill="#262626" height="24" width="24" viewBox="0 0 24 24">
                 <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                 <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
               </svg>
            </button>
          )}
          <h3>Create new post</h3>
          {step === 2 && (
             <button className={styles.shareBtn} onClick={handleSubmit}>Share</button>
          )}
        </div>

        <div className={styles.content}>
          <input 
            type="file" 
            ref={fileInputRef} 
            className={styles.hiddenInput} 
            accept="image/*"
            onChange={handleFileChange}
          />
          
          {step === 1 ? (
            <div 
              className={styles.uploadStage}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className={styles.dragText}>Drag photos and videos here</p>
              <button 
                className={styles.selectBtn} 
                onClick={() => fileInputRef.current.click()}
              >
                Select from computer
              </button>
            </div>
          ) : (
            <div className={styles.detailsStage}>
               <div className={styles.previewContainer}>
                  <img src={imageUrl} alt="Preview" className={styles.previewImage} />
               </div>
               <div className={styles.formContainer}>
                  <div className={styles.userRow}>
                     <div className={styles.miniAvatar}></div>
                     <strong>Current User</strong>
                  </div>
                  <textarea 
                    placeholder="Write a caption..." 
                    className={styles.captionInput}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

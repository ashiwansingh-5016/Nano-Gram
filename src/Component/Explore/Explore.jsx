import React, { useState, useEffect, useRef } from 'react';
import styles from './Explore.module.css';

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const fetchExploreItems = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generating 15 random items for the grid
      const newItems = Array.from({ length: 15 }).map(() => ({
        id: `explore_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/400/600`, // Taller aspect ratio like the image
        type: Math.random() > 0.5 ? 'video' : 'image', // Randomly assign types for icons
      }));

      setItems(prev => [...prev, ...newItems]);
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchExploreItems();
        }
      },
      { rootMargin: '200px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            <img src={item.imageUrl} alt="Explore" className={styles.image} />
            <div className={styles.overlay}>
              {item.type === 'video' ? (
                <svg className={styles.icon} viewBox="0 0 24 24" fill="white" width="24" height="24">
                  <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46 3.393 3.393 0 0 1-1.667-3v-14.08a3.393 3.393 0 0 1 1.667-3 3.445 3.445 0 0 1 3.527.1l11.52 7.04a3.393 3.393 0 0 1 0 5.8l-11.52 7.04a3.41 3.41 0 0 1-1.806.56z"></path>
                </svg>
              ) : (
                <svg className={styles.icon} viewBox="0 0 24 24" fill="white" width="24" height="24">
                  <path d="M19.974 3.002H4.026a1.024 1.024 0 0 0-1.024 1.024V19.97a1.024 1.024 0 0 0 1.024 1.024h15.948a1.024 1.024 0 0 0 1.024-1.024V4.026a1.024 1.024 0 0 0-1.024-1.024z"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className={styles.sentinel}>
        {loading && <div className={styles.loader}>Loading...</div>}
      </div>
    </div>
  );
};

export default Explore;

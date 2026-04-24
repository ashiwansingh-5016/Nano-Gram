import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import PostCard from '../Post/PostCard';
import StoriesCarousel from './StoriesCarousel';
import SuggestionsSidebar from './SuggestionsSidebar';
import styles from './Feed.module.css';

const Feed = () => {
  const { posts, fetchMorePosts, loadingMore } = useAppContext();
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore) {
        fetchMorePosts();
      }
    }, { rootMargin: '100px' });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loadingMore, fetchMorePosts]);

  return (
    <div className={styles.feedContainer}>
      <div className={styles.postsColumn}>
        <StoriesCarousel />
        
        {posts.length > 0 ? (
          <>
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            <div ref={sentinelRef} style={{ height: '50px', width: '100%' }}>
              {loadingMore && <p style={{ textAlign: 'center' }}>Loading more...</p>}
            </div>
          </>
        ) : (
          <div className={styles.noPosts}>
            <h2>No posts yet</h2>
            <p>Be the first to share a moment!</p>
          </div>
        )}
      </div>
      <div className={styles.sidebarColumn}>
        <SuggestionsSidebar />
      </div>
    </div>
  );
};

export default Feed;

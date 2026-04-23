import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Try to load posts from local storage, fallback to empty array
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('nanogram_posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('nanogram_currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loadingMore, setLoadingMore] = useState(false);

  // Automatically save posts to local storage when they change
  useEffect(() => {
    localStorage.setItem('nanogram_posts', JSON.stringify(posts));
  }, [posts]);

  // Provide initial mock posts if empty
  useEffect(() => {
    if (posts.length === 0) {
      fetchMorePosts();
    }
  }, []);

  const loginUser = (username) => {
    const user = { username, id: Date.now() };
    setCurrentUser(user);
    localStorage.setItem('nanogram_currentUser', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('nanogram_currentUser');
  };

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      likes: 0,
      timestamp: new Date().toISOString(),
      likedBy: [], 
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId) => {
    if (!currentUser) return;

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const hasLikedIndex = post.likedBy.indexOf(currentUser.username);
        let newLikedBy = [...post.likedBy];
        let newLikes = post.likes;

        if (hasLikedIndex !== -1) {
          // Unlike
          newLikedBy.splice(hasLikedIndex, 1);
          newLikes -= 1;
        } else {
          // Like
          newLikedBy.push(currentUser.username);
          newLikes += 1;
        }

        return { ...post, likes: newLikes, likedBy: newLikedBy };
      }
      return post;
    }));
  };

  const fetchMorePosts = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      // Create a small artificial delay
      await new Promise(r => setTimeout(r, 600));

      const newPosts = Array.from({ length: 3 }).map(() => ({
        id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/500/500`, // Random generic image
        username: `user_${Math.floor(Math.random() * 9999)}`,
        caption: 'Enjoying the moments ✨ #nano-gram',
        likes: Math.floor(Math.random() * 300),
        timestamp: new Date().toISOString(),
        likedBy: [],
      }));
      
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    } catch (err) {
      console.error('Failed to load more posts', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const value = {
    posts,
    currentUser,
    loadingMore,
    loginUser,
    logoutUser,
    addPost,
    toggleLike,
    fetchMorePosts
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

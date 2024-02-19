import React, { createContext, useContext, useState } from 'react';

const LikedPostsContext = createContext();

export const LikedPostsProvider = ({ children, initialLikedPosts }) => {
  const [likedPosts, setLikedPosts] = useState(initialLikedPosts);

  return (
    <LikedPostsContext.Provider value={{ likedPosts }}>
      {children}
    </LikedPostsContext.Provider>
  );
};

export const useLikedPosts = () => {
  const context = useContext(LikedPostsContext);

  if (!context) {
    throw new Error('useLikedPosts must be used within a LikedPostsProvider');
  }

  return context;
};

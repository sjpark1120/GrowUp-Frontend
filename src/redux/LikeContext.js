import React, { createContext, useContext, useState } from 'react';
import GrowRoomApi from '../apis/GrowRoomApi';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({});

  const updateLikeStatus = async (growRoomId) => {
    try {
      const updatedState = await GrowRoomApi.toggleLike(growRoomId);
      setLikes((prevLikes) => ({
        ...prevLikes,
        [growRoomId]: updatedState.liked,
      }));

      console.log('Updated State from Server:', { liked: updatedState.liked });
      return { liked: updatedState.liked };
    } catch (error) {
      console.error('좋아요 토글 중 오류 발생:', error);
      throw error;
    }
  };

  return (
    <LikeContext.Provider value={{ likes, updateLikeStatus }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  return useContext(LikeContext);
};

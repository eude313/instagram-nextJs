// LikeContext.js

import React, { createContext, useContext, useState } from "react";

const LikeContext = createContext();

// A custom hook to use the LikeContext
export const useLike = () => useContext(LikeContext);

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({}); 
  
  const toggleLike = (itemId) => {
    setLikes((prevLikes) => {
      const isLiked = prevLikes[itemId]?.isLiked || false;
      const likeCount = prevLikes[itemId]?.likeCount || 0;
      
      return {
        ...prevLikes,
        [itemId]: {
          isLiked: !isLiked,
          likeCount: isLiked ? likeCount - 1 : likeCount + 1,
        },
      };
    });
  };

  return (
    <LikeContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

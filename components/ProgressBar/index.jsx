import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setIsVisible(false);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-white dark:bg-black h-2 z-50">
      <div
        className="h-full rounded-full transition-all duration-500 css-selector"
        style={{
          width: `${progress}%`,
          // here is the css classname css-selector 
          //background: 'linear-gradient(to right, #6B46C1, #FBBF24, #EC4899)', 
          // background: 'bg-gradient-to-r from-purple-700 to-yellow-400 via-pink-500',
        }}
      />
    </div>
  );
};

export default ProgressBar;

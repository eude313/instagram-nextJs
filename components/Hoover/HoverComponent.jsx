
import React, { useState, useEffect } from 'react';

export default function HoverComponent({ children, hoverContent }) {
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleThemeChange = () => {
      const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(darkMode ? 'dark' : 'light');
    };

    handleThemeChange();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange); 

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange); 
    };
  }, []);

  const boxShadowStyle = theme === 'dark' 
    ? '0px 10px 25px 6px rgba(255, 255, 255, 0.2)' 
    : '0px 10px 25px 6px rgba(0, 0, 0, 0.2)';    

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {isHovered && (
        <div 
          className="absolute top-10 left-0 z-50 rounded-lg transition-all duration-300 bg-white dark:bg-black "
          style={{ boxShadow: boxShadowStyle }} 
        >
          {hoverContent}
        </div>
      )}
    </div>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import { useMediaQuery } from '@/hooks/useMediaQuery'; 

// export default function HoverComponent({ children, hoverContent }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [theme, setTheme] = useState('light');
//   const [positionStyles, setPositionStyles] = useState({});
//   const hoverRef = useRef(null);
//   const isMediumScreen = useMediaQuery('(min-width: 640px)');

//   useEffect(() => {
//     const handleThemeChange = () => {
//       const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//       setTheme(darkMode ? 'dark' : 'light');
//     };

//     handleThemeChange();
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

//     return () => {
//       window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (isHovered && hoverRef.current) {
//       const rect = hoverRef.current.getBoundingClientRect();
//       const newPositionStyles = {};

//       if (rect.right > window.innerWidth) {
//         newPositionStyles.left = `-${rect.right - window.innerWidth + 10}px`; 
//       }
//       if (rect.bottom > window.innerHeight) {
//         newPositionStyles.top = `-${rect.bottom - window.innerHeight + 10}px`; 
//       }
//       setPositionStyles(newPositionStyles);
//     }
//   }, [isHovered]);

//   const boxShadowStyle = theme === 'dark' 
//     ? '0px 10px 25px 6px rgba(255, 255, 255, 0.2)' 
//     : '0px 10px 25px 6px rgba(0, 0, 0, 0.2)';    

//   if (!isMediumScreen) {
//     return <>{children}</>; 
//   }

//   return (
//     <div
//       className="relative inline-block"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {children}

//       {isHovered && (
//         <div
//           ref={hoverRef}
//           className="absolute top-10 left-0 z-50 rounded-lg transition-all duration-300 bg-white dark:bg-black"
//           style={{ ...positionStyles, boxShadow: boxShadowStyle }}
//         >
//           {hoverContent}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function HoverComponent({ children, hoverContent }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false); // Track hover over popup
  const [theme, setTheme] = useState('light');
  const [positionStyles, setPositionStyles] = useState({});
  const hoverRef = useRef(null);
  const isMediumScreen = useMediaQuery('(min-width: 640px)');

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

  useEffect(() => {
    if ((isHovered || isPopupHovered) && hoverRef.current) {
      const rect = hoverRef.current.getBoundingClientRect();
      const newPositionStyles = {};

      if (rect.right > window.innerWidth) {
        newPositionStyles.left = `-${rect.right - window.innerWidth + 10}px`;
      }
      if (rect.bottom > window.innerHeight) {
        newPositionStyles.top = `-${rect.bottom - window.innerHeight + 10}px`;
      }
      setPositionStyles(newPositionStyles);
    }
  }, [isHovered, isPopupHovered]);

  const boxShadowStyle = theme === 'dark'
    ? '0px 10px 25px 6px rgba(255, 255, 255, 0.2)'
    : '0px 10px 25px 6px rgba(0, 0, 0, 0.2)';

  if (!isMediumScreen) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {(isHovered || isPopupHovered) && (
        <div
          ref={hoverRef}
          className="absolute top-10 left-0 z-50 rounded-lg transition-all duration-300"
          style={{ ...positionStyles, boxShadow: boxShadowStyle }}
          onMouseEnter={() => setIsPopupHovered(true)}
          onMouseLeave={() => setIsPopupHovered(false)}
        >
          {hoverContent}
        </div>
      )}
    </div>
  );
}

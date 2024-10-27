"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-600 relative transition-colors duration-200 ease-in-out"
    >
      <div
        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ease-in-out
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`}
      />
    </button>
  );
};

export default ThemeSwitch;
"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IoSunny, IoMoon, IoDesktop } from "react-icons/io5";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <IoSunny className="inline-block mr-2 text-yellow-500" /> },
    { value: 'dark', label: 'Dark', icon: <IoMoon className="inline-block mr-2 text-gray-500" /> },
    { value: 'system', label: 'System', icon: <IoDesktop className="inline-block mr-2 text-blue-500" /> }
  ];

  const getSelectedIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <IoSunny className="mr-2 text-yellow-500" />;
      case 'dark':
        return <IoMoon className="mr-2 text-gray-500" />;
      case 'system':
        return <IoDesktop className="mr-2 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
          {getSelectedIcon()}
        </span>
        <select
          value={theme}
          onChange={handleChange}
          className="z-10 outline-none pl-8 pr-2 py-1 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
          >
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}> 
              {option.icon}
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

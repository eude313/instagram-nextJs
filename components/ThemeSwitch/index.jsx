"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {Switch} from "@nextui-org/react";
import { IoSunny, IoMoon } from "react-icons/io5";



export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-4">
    <IoSunny className={`transition-opacity duration-300 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-500'}`}/>
    <Switch
      checked={theme === 'dark'} size="sm"
      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      color="primary"
    />
    <IoMoon className={`transition-opacity duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`} />
  </div>
  );
};

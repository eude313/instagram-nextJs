"use client";

import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import BottomBar from "@/components/BottomBar";
import ProgressBar from "@/components/ProgressBar"


export default function RootLayout({ children }) {
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isMessagesPage, setIsMessagesPage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); 
  const pathname = usePathname();  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1270);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isDirectPage = pathname.startsWith('/direct');
    setIsMessagesPage(isDirectPage);
    
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, [pathname, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <main className='flex flex-row relative'>
        <ProgressBar />
      <aside 
        className={`border-r px-[12px] border-[#DBDBDB] shrink hidden md:block 
        ${isScreenSmall || (isMessagesPage && isPageLoaded) ? 'w-[70px]' : 'w-[245px]'} 
        h-screen overflow-hidden px-[6px] pt-[8px] pb-[20px] dark:border-[#262626]`} 
        aria-label="Sidebar"
      >
        <Sidebar
          isScreenSmall={isScreenSmall}
          isMessagesPage={isMessagesPage}
          setIsMessagesPage={setIsMessagesPage}
        />
      </aside>

      <div className='w-full md:w-fit h-screen flex-1 overflow-y-auto'>
        {children}
      </div>

      <div className={`h-[8vh] w-full fixed bottom-0 left-0 right-0 md:hidden border-t border-[#DBDBDB] dark:border-[#262626] z-3 bg-white dark:bg-black ${( isMessagesPage ) ? 'hidden' : 'block'}`}>
        <BottomBar />
      </div>
    </main>
  );
}

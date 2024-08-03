"use client";

import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }) {
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isMessagesPage, setIsMessagesPage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

    setIsMessagesPage(pathname === '/direct');
  }, [pathname, isMounted]);

  if (!isMounted) {
    return null;
  }
  return (
    <main className='flex flex-row'>
      <aside className={`border-r px-[12px]  border-[#DBDBDB] shrink ${isScreenSmall || isMessagesPage  ? 'w-[70px]' : 'w-[245px]'} h-screen overflow-hidden px-[6px] pt-[8px] pb-[20px] dark:border-[#262626]`} aria-label="Sidebar">
        <Sidebar className=""  isScreenSmall={isScreenSmall}
          isMessagesPage={isMessagesPage}
          setIsMessagesPage={setIsMessagesPage}/>
      </aside>
      <section className='border border-success w-fit h-full flex-1'>{children}</section>
    </main>
  );
}


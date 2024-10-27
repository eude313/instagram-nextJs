'use client';

import React from 'react';
import Inbox from "@/components/Inbox";
import { usePathname } from 'next/navigation';
import SearchModal from '@/components/SearchModal';
import ChatPage from './inbox/[chatId]/page';
import AuthModal from '@/components/AuthModal';

export default function DirectLayout({ children }) {
  const pathname = usePathname();
  const isInboxPage = pathname.startsWith('/direct/inbox/');


  return (
    <main className='w-auto flex flex-row'>
      <aside className='w-full md:w-[390px] pt-[12px] h-screen border-r border-[#DBDBDB]  dark:border-[rgb(27,22,22)] overflow-y-auto pb-[50px] md:pb-0 '>
        <Inbox />
      </aside>
      <div className={`w-fit flex-1 z-0 px-3 md:px-0 md:mx-0 mx-1 overflow-y-auto h-screen ${isInboxPage ? 'block' : 'hidden md:block'}`}>
        {isInboxPage ? <ChatPage /> : children}
      </div>
      <SearchModal />
      <AuthModal />
    </main>
  );
}



'use client';

import React from 'react';
import Inbox from "@/components/Inbox";
import SearchModal from '@/components/SearchModal';
import { useModal } from '@/contexts/ModalContext';

export default function DirectLayout({ children }) {
  const { modals, closeModal } = useModal();

  React.useEffect(() => {
    console.log('Current modal state:', modals);
  }, [modals]);


  return (
    <main className='w-auto flex flex-row'>
      <aside className='w-full md:w-[390px] pt-[12px] h-screen border-r border-[#DBDBDB]  dark:border-[rgb(27,22,22)] overflow-y-auto pb-[50px] md:pb-0 '>
        <Inbox/>
      </aside>
      <div className='w-fit flex-1 z-0 px-3 md:px-0 md:mx-0 mx-1 hidden md:block overflow-y-auto h-screen'>
        {children}
      </div>
      <SearchModal open={modals.searchModal} onClose={() => closeModal('searchModal')} />
    </main>
  );
}



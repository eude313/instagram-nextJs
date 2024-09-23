"use client";

import React from 'react'
import Link from 'next/link';
import { Avatar} from "@nextui-org/react";
import { Messenger, Search, Home, Reels} from '@/icons';

const BottomItems = `w-full flex justify-center items-center hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] rounded-lg transition-colors duration-300 font-medium ` 

export default function BottomBar() {
  return (
    <div className="w-full p-1 h-full">
      <div className="flex flex-row gap-x-2 h-full">
        <Link href="/" className={BottomItems}>
          <Home />
        </Link>

        <Link href="/explore" className={BottomItems}>
          <Search/>
        </Link>

        <Link href="/reels" className={BottomItems}>
          <Reels />
        </Link>
        
        <Link href="/direct" className={BottomItems}>
          <Messenger />
        </Link>

        <Link href="/accounts" className={BottomItems}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-6 h-6 text-tiny" />
        </Link>
      </div>
    </div>
  )
}

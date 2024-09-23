"use client";

import React from 'react'
import { Avatar } from '@nextui-org/react';

export default function SideList() {
  return (
  <>
    <div className='flex flex-row py-2 gap-3'>
      <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] 
        p-[2px] mt-0 bg-default text-default-foreground rounded-full">
        <a href="#" className="block bg-white dark:bg-black p-[2px] rounded-full">
          <Avatar
            radius="full"
            className="text-sm"
            width={38}
            height={38}
            shadow='sm'
            src="/user.png"
            alt="cute kitty"
          />
        </a>
      </div>
      <div className='mr-auto flex items-center'>
        <div>
          <p className='font-semibold text-sm '>kshdkbckidsab</p>
          <p className='text-sm font-light'>kdanckadndkjkasnckad</p>
        </div>
      </div>
      <div className='flex items-center'>
        <h2
          type='submit'
          className='mt-1 cursor-pointer font-semibold text-[#1877F2]' >
          Post
        </h2>
      </div>
    </div>
  </>
  )
}

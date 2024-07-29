"use client";

import React from 'react';
import Link from 'next/link';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Messenger, Create, Explore, Heart, Home, Reels, Search, Menu, Threads } from '@/icons';
import { ThemeSwitch } from '../ThemeSwitch';

const linkItems = `flex items-center justify-center md:justify-start py-3 px-4 hover:bg-[#F2F2F2] rounded-lg transition-colors duration-300 font-medium focus:font-bold dark:text-gray-300 dark:hover:bg-[#1A1A1A] dark:hover:text-white rounded-md transition-colors duration-300`;

export default function Sidebar() {
  
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className="">
        <h2 className="font-bold">Dashboard</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <Link href="#" className={linkItems}>
          <Home className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Home</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Search className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Search</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Explore className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Explore</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Reels className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Reels</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Messenger className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Messages</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Heart className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Notifications</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Create className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Create</span>
        </Link>
        <Link href="#" className={linkItems}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-6 h-6 text-tiny md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Profile</span>
        </Link>
      </div>
      <div className="border-2 mt-auto">
        <Link href="#" className={`hide-on-small-height ${linkItems}`}>
          <Threads className="md:mr-0" />
          <span className="hidden md:inline ml-2 xl:ml-4">Threads</span>
        </Link>
        <Dropdown placement="top-end">
          <DropdownTrigger>
            <div className={linkItems}>
              <Menu className="md:mr-0" />
              <span className="hidden md:inline ml-2 xl:ml-4">More</span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" className="w-[266px] px-[6px] h-max-[405px] p-[8px] dark:bg-[#262626]">
            <DropdownItem key="profile" className={linkItems}>
              Settings
            </DropdownItem>
            <DropdownItem key="settings" className={linkItems}>Your activity</DropdownItem>
            <DropdownItem key="team_settings"className={linkItems}>Saved</DropdownItem>
            <DropdownItem key="analytics"className={linkItems}>
              Switch a prearence <ThemeSwitch/> 
            </DropdownItem>
            <DropdownItem key="system"className={linkItems}>Report a problem</DropdownItem>
            <DropdownItem key="configurations"className={linkItems}>Threads</DropdownItem>
            <DropdownItem key="help_and_feedback"className={linkItems}>Swith accounts</DropdownItem>
            <DropdownItem key="logout"className={linkItems}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      
      </div>
    </div>
  );
}

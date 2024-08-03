"use client";

import React, { useState,useEffect, useRef  } from 'react';
import Link from 'next/link';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Tooltip, Button,  User, DropdownSection } from "@nextui-org/react";
import { Messenger, Create, Explore, Heart, Home, Reels, Search, Menu, Threads, Insta, Instagram, Setting, Bookmark, MessageWarning, Activity } from '@/icons';
import { ThemeSwitch } from '../ThemeSwitch';
import ScaleUpHorLeft from '../ScaleUpHorLeft';

const linkItems = `flex items-center justify-center md:justify-start py-3 px-4 hover:bg-[#F2F2F2] rounded-lg transition-colors duration-300 font-medium focus:font-bold dark:text-gray-300 dark:hover:bg-[#1A1A1A] dark:hover:text-white rounded-md transition-colors duration-300`;

const sidebarStyles = `fixed top-0 left-0 w-[390px] h-screen bg-inherit bg-white dark:bg-black border-r border-r-[#262626] shadow-lg rounded-r-lg transition-transform duration-300`

const menuStyles = `px-4 py-3`

export default function Sidebar({ isMessagesPage, setIsMessagesPage, isScreenSmall }) {
  const [isSearchSidebarOpen, setSearchSidebarOpen] = useState(false);
  const [isNotificationsSidebarOpen, setNotificationsSidebarOpen] = useState(false);
  const searchSidebarRef = useRef(null);
  const notificationsSidebarRef = useRef(null);

  const handleSearchClick = () => {
    setSearchSidebarOpen(!isSearchSidebarOpen);
    if (isNotificationsSidebarOpen) setNotificationsSidebarOpen(false);
  };

  const handleNotificationsClick = () => {
    setNotificationsSidebarOpen(!isNotificationsSidebarOpen);
    if (isSearchSidebarOpen) setSearchSidebarOpen(false);
  };

  const handleMessagesClick = () => {
    setIsMessagesPage(true);
  };

  const handleClickOutside = (event) => {
    if (
      searchSidebarRef.current && !searchSidebarRef.current.contains(event.target) &&
      notificationsSidebarRef.current && !notificationsSidebarRef.current.contains(event.target)
    ) {
      setSearchSidebarOpen(false);
      setNotificationsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='h-screen flex'>
      <div className={`flex flex-col transition-all duration-300 ${isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
        || isScreenSmall ? 'w-auto' : 'w-full'} z-20`}>
        <div className="my-6 flex items-center">
          {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
            || isScreenSmall ? (
            <div className="w-full flex justify-center">
              <Insta />
            </div>
          ) : (
            <div className="pl-4">
              <Instagram />
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Tooltip showArrow={true} content="Home" placement="right">
            <Link href="/" className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Home className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Home className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Home</span>
                </div>
              )}
            </Link>
          </Tooltip>
          <Tooltip showArrow={true} content="Search" placement="right">
            <button onClick={handleSearchClick} className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Search className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Search className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Search</span>
                </div>
              )}
            </button>
          </Tooltip>
          <Tooltip showArrow={true} content="Explore" placement="right">
            <Link href="/explore" className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Explore className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Explore className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Explore</span>
                </div>
              )}
            </Link>
          </Tooltip>
          <Tooltip showArrow={true} content="Reels" placement="right">
            <Link href="/reels" className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Reels className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Reels className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Reels</span>
                </div>
              )}
            </Link>
          </Tooltip>
          <Tooltip showArrow={true} content="Direct" placement="right">
            <Link href="/direct" className={linkItems} onClick={handleMessagesClick} >
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Messenger className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Messenger className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Messages</span>
                </div>
              )}
            </Link>
          </Tooltip>
          <Tooltip showArrow={true} content="Notiffications" placement="right">
            <button onClick={handleNotificationsClick} className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Heart className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Heart className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Notifications</span>
                </div>
              )}
            </button>
          </Tooltip>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {/* <Tooltip showArrow={true} content="Create" placement="right"> */}
              <div className={linkItems}>
                {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                  || isScreenSmall ? (
                  <Create className="md:mr-0" />
                ) : (
                  <div className="flex">
                    <Create className="md:mr-0" />
                    <span className="ml-2 xl:ml-4">Create</span>
                  </div>
                )}
              </div>
              {/* </Tooltip> */}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" className="w-[266px] px-[6px] h-max-[405px] p-[8px]">
              <DropdownItem key="help_and_feedback" className={linkItems}>Switch accounts</DropdownItem>
              <DropdownItem key="logout" className={linkItems}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Tooltip showArrow={true} content="Profile" placement="right">
            <Link href="/accounts" className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-6 h-6 text-tiny md:mr-0" />
              ) : (
                <div className="flex">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-6 h-6 text-tiny md:mr-0" />
                  <span className="ml-2 xl:ml-4">Profile</span>
                </div>
              )}
            </Link>
          </Tooltip>
        </div>
        <div className="mt-auto mb-4">
          <Tooltip showArrow={true} content="Threads" placement="right">
            <Link href="#" className={`hide-on-small-height ${linkItems}`}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Threads className="md:mr-0" />
              ) : (
                <div className="flex">
                  <Threads className="md:mr-0" />
                  <span className="ml-2 xl:ml-4">Threads</span>
                </div>
              )}
            </Link>
          </Tooltip>
          <Dropdown placement="top-end">
            <DropdownTrigger>
              <div className={linkItems}>
                {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                  || isScreenSmall ? (
                  <Menu className="md:mr-0" />
                ) : (
                  <div className="flex">
                    <Menu className="md:mr-0" />
                    <span className="ml-2 xl:ml-4">More</span>
                  </div>
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" className="w-[266px] h-max-[405px]">
              <DropdownItem key="profile" className={menuStyles}>
                <div className="flex border">
                  <Setting className="md:mr-0" />
                  <span className="ml-2 xl:ml-4"> Settings</span>
                </div>
              </DropdownItem>
              <DropdownItem key="profile" className={menuStyles}>
                <div className="flex">
                  <Activity className="md:mr-0" />
                  <span className="ml-2 xl:ml-4"> Your activity</span>
                </div>
              </DropdownItem>

              <DropdownItem key="profile" className={menuStyles}>
                <div className="flex">
                  <Bookmark className="md:mr-0" />
                  <span className="ml-2 xl:ml-4"> Saved</span>
                </div>
              </DropdownItem>

              <DropdownItem key="profile" className={menuStyles}>
                <div className="flex">
                  {/* <IoMoon className="md:mr-0" />  */}
                  <ThemeSwitch />
                  <span className="ml-2 xl:ml-4">Switch appearance </span>
                </div>
              </DropdownItem>

              <DropdownItem key="profile" className={menuStyles}>
                <div className="flex">
                  <MessageWarning className="md:mr-0" /> 
                  <span className="ml-2 xl:ml-4">Report a problem</span>
                </div>
              </DropdownItem>
              <DropdownSection>
                <DropdownItem key="profile"  className={`my-4 hide-on-large-height divide-y border-t-[#3F3F46]  ${menuStyles}`}>
                  <div className="flex">
                    <Threads className="md:mr-0" /> 
                    <span className="ml-2 xl:ml-4">Threads</span>
                  </div>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="help_and_feedback" className={menuStyles}>Switch accounts</DropdownItem>

              <DropdownItem key="logout" className={menuStyles}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* <Tooltip showArrow={true} content="More" placement="right">

          </Tooltip> */}
        </div>
      </div>


      {/* Search Sidebar */}
      <ScaleUpHorLeft>
        <div ref={searchSidebarRef} className={`${sidebarStyles} ${isSearchSidebarOpen ? 'translate-x-[70px]' : '-translate-x-full'} z-0}`}>
          <div className="px-[24px]">
            <div className='pb-[12px] pt-[36px] spacing'>
              <h1 className='font-bold text-2xl'>Search</h1>
            </div>
            <Input type="search" isClearable
             className='pb-[4px] pt-[20px]' placeholder="Search" startContent={
              <Search className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
            } />
          </div>
          <hr className="my-4 border-[1px] border-[#262626]" />
          <div className="px-[24px] overflow-y-auto">
            <h2 className='mt-[6px] mx-[24px] mb-[8px] pt-[4px] font-bold'>Recents</h2>
            <div className='flex flex-row p-3 gap-3 my-2'>
              <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <div className='pl-2'>
                <p className='text-sm font-semibold'>kshdkbckidsab</p>
                <p className='text-sm font-light'>kdanckadndkjkasnckad</p>
              </div>
            </div>
          </div>
        </div>
      </ScaleUpHorLeft>

      {/* Notifications Sidebar */}
      <ScaleUpHorLeft>
        <div ref={notificationsSidebarRef} className={`${sidebarStyles} ${isNotificationsSidebarOpen ? 'translate-x-[70px]' : '-translate-x-full'} z-0}`}>
          {/* <button onClick={handleNotificationsClick} className="p-4">
            Close
            </button> */}

          <div className="px-[24px]">
            <div className='pb-[12px] pt-[36px] spacing'>
              <h1 className='font-bold text-2xl'>Notifications</h1>
            </div>
            <div className="flex flex-col shrink-1">

              <div className='flex flex-row py-3 gap-3 my-2'>
                <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <div className='pl-2 mr-auto'>
                  <p className='text-sm font-semibold'>kshdkbckidsab</p>
                  <p className='text-sm font-light'>kdanckadndkjkasnckad</p>
                </div>
                <Button color="primary">
                  Follow
                </Button>
              </div>
              <User
              name="Junior Garcia"
              description="@jrgarciadev"
              classNames={{
                name: "text-default-600",
                  description: "text-default-500",
                }}
                avatarProps={{
                  size: "sm",
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
              />
            </div>
          </div>
        </div>
      </ScaleUpHorLeft>
    </div>
  );
}


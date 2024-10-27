"use client";

import Link from 'next/link';
import ApiService from '@/lib/ApiService';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useModal } from "@/contexts/ModalContext";
import ScaleUpHorLeft from '@/Animation/ScaleUpHorLeft';
import NestedDropdown from "@/components/NestedDropdown";
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Tooltip, Button, User, ScrollShadow, } from "@nextui-org/react";
import { Messenger, Create, Explore, Heart, Home, Reels, Search, Menu, Threads, Insta, Instagram, Setting, Bookmark, MessageWarning, Activity, VideoPic, Live } from '@/icons';

import { IoMoon } from "react-icons/io5";

const linkItems = `flex items-center justify-center md:justify-start py-3 px-4 hover:bg-[#F2F2F2] transition-colors duration-300 font-light  active:font-bold dark:text-gray-300 dark:hover:bg-[#1A1A1A] dark:hover:text-white rounded-md`;

const sidebarStyles = `fixed top-0 left-0 w-[390px] h-screen bg-inherit bg-white dark:bg-black border-r border-r-[#262626] shadow-lg rounded-r-lg transition-transform duration-300 z-30`

const menuStyles = `py-3 my-1`

export default function Sidebar({ isMessagesPage, setIsMessagesPage, isScreenSmall }) {
  const [isSearchSidebarOpen, setSearchSidebarOpen] = useState(false);
  const [isNotificationsSidebarOpen, setNotificationsSidebarOpen] = useState(false);
  const searchSidebarRef = useRef(null);
  const notificationsSidebarRef = useRef(null);
  const [user, setUser] = useState(null);
  const { openModal } = useModal();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);


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

  const handleLogout = async () => {
    try {
      await ApiService.logoutUser();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/auth/login');
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    const fetchUserData = async () => {
      try {
        const userData = await ApiService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const results = await ApiService.searchUsers(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Dropdown 1 with Theme Switch and Custom Styles
  const menuItemsWithTheme = [
    {
      key: "settings",
      label: "Settings",
      href: "/accounts/settings",
      icon: <Setting className="w-5 h-5" />
    },
    {
      key: "activity",
      label: "Your activity",
      href: "/accounts/activity",
      icon: <Activity className="w-5 h-5" />
    },
    {
      key: "saved",
      label: "Saved",
      icon: <Bookmark className="w-5 h-5" />
    },
    {
      key: "report-problem",
      label: "Report a problem",
      icon: <MessageWarning className="w-5 h-5" />
    },
    {
      key: "theme",
      label: "Switch Theme",
      hasSubmenu: true,
      icon: <IoMoon className="w-5 h-5" />,
      children: [{
        key: "themeToggle",
        type: "toggle",
        label: "Dark Mode",
        icon: <IoMoon className="w-5 h-5" />
      }],
    },
    {
      key: "threads",
      label: "Threads",
      icon: <Threads className="w-5 h-5" />
    },
    { key: "switch-account", label: "Switch account", onClick: () => openModal('authModal') },
    { key: "logout", label: "Logout", onClick: handleLogout },
  ];

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
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
          <Dropdown
            placement={isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage || isScreenSmall ? "right" : "bottom-end"}
            classNames={{
              content: "dark:bg-[#262626] m-2",
            }}
          >
            <DropdownTrigger>
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
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" className="w-[266px] px-[4px] h-max-[405px] py-2">
              <DropdownItem key="post" onPress={() => { openModal('createPostModal') }}
                className={linkItems} endContent={<VideoPic className="mx-1" />}>
                Post
              </DropdownItem>
              <DropdownItem key="live" className={linkItems} endContent={<Live className="mx-1" />}>
                Live video
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Tooltip showArrow={true} content="Profile" placement="right">
            <Link href="/accounts" className={linkItems}>
              {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage
                || isScreenSmall ? (
                <Avatar src={user.profile_picture || `/api/placeholder/150/150?text=${user.username[0]}`}
                  alt={user.username} className="w-6 h-6 text-tiny md:mr-0" />
              ) : (
                <div className="flex">
                  <Avatar src={user.profile_picture || `/api/placeholder/150/150?text=${user.username[0]}`} alt={user.username} className="w-6 h-6 text-tiny md:mr-0" />
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
          {/* Dropdown 1 with Theme Switch and Custom Styles */}
          <NestedDropdown
            menuItems={menuItemsWithTheme}
            className="-z-50"
            isScreenSmall={isScreenSmall}
            isMessagesPage={isMessagesPage}
            isSearchSidebarOpen={isSearchSidebarOpen}
            isNotificationsSidebarOpen={isNotificationsSidebarOpen}
            isDarkMode={isDarkMode}
            isThemeDropdown={true}
            onThemeToggle={handleThemeToggle}
            triggerButtonContent={
              <div className={linkItems}>
                {isSearchSidebarOpen || isNotificationsSidebarOpen || isMessagesPage || isScreenSmall ? (
                  <Menu className="md:mr-0" />
                ) : (
                  <div className="flex">
                    <Menu className="md:mr-0" />
                    <span className="ml-2 xl:ml-4">More</span>
                  </div>
                )}
              </div>

            }
            triggerButtonStyle="hover:bg-[#F2F2F2] rounded-md dark:hover:bg-[#1A1A1A] w-full dark:hover:text-white font-light active:font-bold dark:text-gray-300"
          />
        </div>
      </div>


      {/* Search Sidebar */}
      <AnimatePresence>
        <ScaleUpHorLeft>
          <div ref={searchSidebarRef} className={`${sidebarStyles} ${isSearchSidebarOpen ? 'translate-x-[70px]' : '-translate-x-full'} z-0}`}>
            <div className="px-[24px]">
              <div className='pb-[12px] pt-[36px] spacing'>
                <h1 className='font-bold text-2xl'>Search</h1>
              </div>
              <Input
                type="search"
                isClearable
                className='pb-[4px] pt-[20px]'
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                startContent={
                  <Search className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <hr className="my-4 border-[1px] border-[#262626]" />
            <ScrollShadow hideScrollBar className="px-[24px]">
              <h2 className='mt-[6px] mx-[24px] mb-[8px] pt-[4px] font-bold'>Recents</h2>
              {searchResults.map((user) => (
                <div key={user.id} className='flex flex-row p-3 gap-3 my-2'>
                  <Avatar isBordered src={user.profile_picture || `/api/placeholder/150/150?text=${user.username[0]}`} />
                  <div className='pl-2'>
                    <p className='text-sm font-semibold'>{user.username}</p>
                    <p className='text-sm font-light'>{user.first_name} {user.last_name}</p>
                  </div>
                </div>
              ))}
            </ScrollShadow>
          </div>
        </ScaleUpHorLeft>
      </AnimatePresence>

      {/* Notifications Sidebar */}
      <AnimatePresence>
        <ScaleUpHorLeft>
          <div ref={notificationsSidebarRef} className={`${sidebarStyles} ${isNotificationsSidebarOpen ? 'translate-x-[70px]' : '-translate-x-full'} z-50}`}>
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
      </AnimatePresence>
    </div>
  );
}


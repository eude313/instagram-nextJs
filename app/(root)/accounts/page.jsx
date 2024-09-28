'use client';

import React from "react";
import Link from "next/link";
import ApiService from '@/lib/ApiService';
import  {useMediaQuery } from '@/hooks/useMediaQuery';
import {Button, Avatar, Tabs, Tab, Chip} from "@nextui-org/react";
import { Back, Setting, Threads, Posts, Tagged, Bookmark, Feed } from "@/icons";

export default function AccountsPage() {
  const isSmallScreen = useMediaQuery('(max-width: 640px)'); 
  const [selected, setSelected] = React.useState("posts");
  const [profile, setProfile] = React.useState(null);


  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await ApiService.getCurrentUser();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, []);
  return (
    <div> 
      <div className='border-b border-[#DBDBDB] dark:border-[#262626] h-auto pb-2 
      block md:hidden'>
        <div className="flex justify-between px-[12px]">
          <Button 
            href="/accounts/settings"
            as={Link}
            isIconOnly  
            className="bg-inherit" 
            aria-label="settings"
          >
            <Setting/>
          </Button>
          {profile && (
            <Button className="text-medium bg-inherit mt-1" endContent={
              <span className="rotate-180">
                <Back width="15" height='15'/>
              </span>
            }>
              {profile.username}
            </Button>
          )}
          <Button 
            isIconOnly  
            className="bg-inherit" 
            aria-label="Threads"
          >
            <Threads/>
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-2">

     
        <div className='px-1 md:px-4 py-5'> 
          <div className='flex flex-col relative w-auto justify-center mt-5'>
            <div className="absolute left-0 -top-8 z-20">
              <button className="ml-2 rounded-xl px-4 py-2 shadow-md text-sm
                bg-[#262626] relative z-20">
                Note...
              </button>
              <div className='ml-4 h-[8px] w-[10px] bg-[#262626] rounded-full'>
              </div>
              <div className="h-1 w-1 ml-6 rounded-full bg-[#262626]"></div>
            </div>
             {/* {profile && !isSmallScreen ? 
              <Avatar src={profile.profile_picture || '/default-avatar.png'} alt='Profile Picture' className="text-large h-[140px] w-[140px]" /> :
              <Avatar src={profile.profile_picture || '/default-avatar.png'} alt='Profile Picture' className="text-large h-24 w-24" />} */}
              {profile ? (
                !isSmallScreen ? 
                  <Avatar src={profile.profile_picture || '/default-avatar.png'} alt='Profile Picture' className="text-large h-[140px] w-[140px]" /> :
                  <Avatar src={profile.profile_picture || '/default-avatar.png'} alt='Profile Picture' className="text-large h-24 w-24" />
              ) : (
                  <Avatar src='/default-avatar.png' alt='Default Avatar' className="text-large h-24 w-24" />
              )}
          </div>
        </div>

        <div className="grow md: pt-3 pl-0 md-pl-4 md:mt-4">
          <div className="flex flex-col w-auto border">
            <div className="flex flex-col md:flex-row px-2 gap-y-2 md:gap-x-4">
              <div className="px-2 mt-2">
                {profile && (
                 <p>{profile.username}</p>
                )}
              </div>
              <div className="flex flex-row gap-x-2 md:gap-x-4">
                <Button 
                  href="/accounts/edit"
                  as={Link}
                  fullWidth={isSmallScreen} size="sm">
                  Edit profile
                </Button>
                <Button fullWidth={isSmallScreen} size="sm">
                  View archive
                </Button>
              </div>
              <Button fullWidth={isSmallScreen} size="sm">
                Ad tools
              </Button>
            </div>
            <div className="px-2 my-2">
              {profile && (
              <p>{profile.bio}</p>
              )}
            </div>
            <div className="hidden md:block">
              {/* {profile && (
              <div className='w-full flex flex-row justify-between px-[12px] py-2 my-2'>
                <div className='text-center flex flex-row gap-x-2'>
                  <span className='font-semibold text-sm'>{profile.posts.length}</span>
                  <span className='font-light text-sm'>posts</span>
                </div>
                <div className='text-center flex flex-row gap-x-2'>
                  <span className='font-semibold text-sm'>{profile.followers.length}</span>
                  <span className='font-light text-sm'>followers</span>
                </div>
                <div className='text-center flex flex-row gap-x-2'>
                  <span className='font-semibold text-sm'>{profile.following.length}</span>
                  <span className='font-light text-sm'>following</span>
                </div>
              </div>
              )} */}
              {profile && (
                <div className='w-full flex flex-row justify-between px-[12px] py-2 my-2'>
                  <div className='text-center flex flex-row gap-x-2'>
                    <span className='font-semibold text-sm'>{profile.posts?.length || 0}</span>
                    <span className='font-light text-sm'>posts</span>
                  </div>
                  <div className='text-center flex flex-row gap-x-2'>
                    <span className='font-semibold text-sm'>{profile.followers?.length || 0}</span>
                    <span className='font-light text-sm'>followers</span>
                  </div>
                  <div className='text-center flex flex-row gap-x-2'>
                    <span className='font-semibold text-sm'>{profile.following?.length || 0}</span>
                    <span className='font-light text-sm'>following</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden border-y border-[#DBDBDB]
        dark:border-[#262626]">
          {/* {profile && (
        <div className='w-full flex flex-row justify-between px-[12px] py-2 my-2 '>
          <div className='text-center flex flex-col'>
              <span className='font-semibold text-sm'>{profile.posts.length}</span>
              <span className='font-light text-sm'>posts</span>
          </div>
          <div className='text-center flex flex-col'>
              <span className='font-semibold text-sm'>{profile.followers.length}</span>
              <span className='font-light text-sm'>followers</span>
          </div>
          <div className='text-center flex flex-col'>
              <span className='font-semibold text-sm'>{profile.following.length}</span>
              <span className='font-light text-sm'>following</span>
          </div>
        </div>)} */}
        {profile && (
          <div className='w-full flex flex-row justify-between px-[12px] py-2 my-2'>
            <div className='text-center flex flex-row gap-x-2'>
              <span className='font-semibold text-sm'>{profile.posts?.length || 0}</span>
              <span className='font-light text-sm'>posts</span>
            </div>
            <div className='text-center flex flex-row gap-x-2'>
              <span className='font-semibold text-sm'>{profile.followers?.length || 0}</span>
              <span className='font-light text-sm'>followers</span>
            </div>
            <div className='text-center flex flex-row gap-x-2'>
              <span className='font-semibold text-sm'>{profile.following?.length || 0}</span>
              <span className='font-light text-sm'>following</span>
            </div>
          </div>
        )}

      </div>
    
      <div className="flex w-full flex-col">

      {profile && (
        <Tabs
          color="primary" 
          variant="underlined"
          classNames={{
            tabList: "gap-16 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#0095F6]",
            tab: " px-0 h-12 flex justify-center",
            tabContent: "group-data-[selected=true]:text-[#0095F6]"
          }}
          selectedKey={selected}
          onSelectionChange={setSelected}>
          <Tab 
            key="posts"
            title={
              <div className="flex items-center space-x-2">
                <Posts/>
                <span> {!isSmallScreen ? 'Posts':''}</span>
                <Chip size="sm" variant="faded">{profile.posts?.length || 0}</Chip>
              </div>
            }
          >
            <div className="px-[18px]">
              <div className="flex flex-col">
                <div className="flex">
                  <Avatar alt='{alt}' size="lg" className="flex-shrink-0" src='/user.png'/>
                  <div className="flex flex-col ml-2 pt-1">
                    <span className="text-small">name</span>
                    <span className="text-tiny text-default-400">online</span>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab 
            key="saved" 
            title={
              <div className="flex items-center space-x-2">
                <Bookmark/>
                <span>{!isSmallScreen ? 'Saved':''}</span>
                <Chip size="sm" variant="faded">{profile.savedPosts?.length || 0}</Chip>
              </div>
            }
          >
            <form className="flex flex-col gap-4 h-[300px]">
              
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary">
                  Sign up
                </Button>
              </div>
            </form>
          </Tab>
          <Tab 
            key="tagged" 
            title={
              <div className="flex items-center space-x-2">
                <Tagged/>
                <span>{!isSmallScreen ? 'Tagged':''}</span>
                <Chip size="sm" variant="faded">9</Chip>
              </div>
            }
          >
          </Tab>
        </Tabs>
      )}
      </div>
    </div>
  );
}

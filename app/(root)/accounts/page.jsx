'use client';

import React from "react";
import  {useMediaQuery } from '@/hooks/useMediaQuery';
import { Back, Setting, Threads, Posts, Tagged, Bookmark, Feed } from "@/icons";
import {Button, Avatar, Tabs, Tab, Chip} from "@nextui-org/react";

export default function AccountsPage() {
  const isSmallScreen = useMediaQuery('(max-width: 640px)'); 
  const [selected, setSelected] = React.useState("posts");

  return (
    <div> 
      {/* start nav */}
      <div className='border-b border-[#DBDBDB] dark:border-[#262626] h-auto pb-2 block md:hidden'>
        <div className="flex justify-between px-[12px]">
          <Button 
            isIconOnly  
            className="bg-inherit" 
            aria-label="settings"
          >
            <Setting/>
          </Button>
          <Button className="text-medium bg-inherit mt-1" endContent={
            <span className="rotate-180">
              <Back width="15" height='15'/>
            </span>
          }>
            Username
          </Button>
          <Button 
            isIconOnly  
            className="bg-inherit" 
            aria-label="Threads"
          >
            <Threads/>
          </Button>
        </div>
      </div>
      {/* end nav */}

      <div className="flex flex-row gap-2">
        {/* avator */}
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
            {!isSmallScreen ? 
            <Avatar src='/user.png' alt='hey' className="text-large h-[140px] w-[140px]" />:
            <Avatar src='/user.png' alt='hey' className="text-large h-24 w-24" />}
          </div>
        </div>

        <div className="grow md: pt-3 pl-0 md-pl-4 md:mt-4">
          <div className="flex flex-col w-auto border">
            <div className="flex flex-col md:flex-row px-2 gap-y-2 md:gap-x-4">
              <div className="px-2 mt-2">
                <p>wbdhubcduw</p>
              </div>
              <div className="flex flex-row gap-x-2 md:gap-x-4">
                <Button fullWidth={isSmallScreen} size="sm">
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
              <p>hshanbcxudsbhcu</p>
            </div>
            <div className="hidden md:block">
              <div className='w-full flex flex-row justify-between px-[12px] py-2 my-2'>
                <div className='text-center flex flex-row gap-x-2'>
                  <span className='font-semibold text-sm'>10</span>
                  <span className='font-light text-sm'>posts</span>
                </div>
                <div className='text-center flex flex-row gap-x-2'>
                  <span className='font-semibold text-sm'>40</span>
                  <span className='font-light text-sm'>followers</span>
                </div>
                <div className='text-center flex flex-row gap-x-2'>
                  <span className='font-semibold text-sm'>30</span>
                  <span className='font-light text-sm'>following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden border-y border-[#DBDBDB] dark:border-[#262626] ">
        <div className='w-full flex flex-row justify-between px-[12px] py-2 my-2 '>
          <div className='text-center flex flex-col'>
              <span className='font-semibold text-sm'>10</span>
              <span className='font-light text-sm'>posts</span>
          </div>
          <div className='text-center flex flex-col'>
              <span className='font-semibold text-sm'>40</span>
              <span className='font-light text-sm'>followers</span>
          </div>
          <div className='text-center flex flex-col'>
              <span className='font-semibold text-sm'>30</span>
              <span className='font-light text-sm'>following</span>
          </div>
        </div>
      </div>
      <div>
        <Tabs
          fullWidth
          size="md"
          radius='none'
          aria-label="Tabs form"
          variant="underlined"
          classNames={{
            cursor: "w-full bg-[#0095F6]",
            tab: "h-12",
            tabList: "border-b border-divider p-0 relative",
            tabContent: 'fw-semibold group-data-[selected=true]:text-[#0095F6]'
          }}
          selectedKey={selected}
          onSelectionChange={setSelected}>
          <Tab 
            key="posts"
            title={
              <div className="flex items-center space-x-2">
                <Posts/>
                <span> {!isSmallScreen ? 'Posts':''}</span>
                <Chip size="sm" variant="faded">9</Chip>
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
                <Chip size="sm" variant="faded">9</Chip>
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
      </div>
    </div>
  );
}

import React from 'react';
import { Messenger } from '@/icons';
import { Avatar, Button } from '@nextui-org/react';
import  {useMediaQuery } from '@/hooks/useMediaQuery';

export default function HoverContent() {
    const isSmallScreen = useMediaQuery('(max-width: 640px)');  

    return (
        <div className="p-2 w-[100%-50px] md:w-[400px]">
            <div className='flex flex-row py-2 gap-3 px-3'>
                <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] 
                p-[2px] bg-default text-default-foreground rounded-full">
                <button className="block bg-white dark:bg-black p-[2px] 
                rounded-full">
                    <Avatar
                    radius="full"
                    className="text-sm"
                    size="lg"
                    shadow='sm'
                        src="./1331867.jpeg"
                        alt="cute kitty"
                    />
                </button>
                </div>
                <div className='mr-auto flex items-center'>
                <div>
                    <p className='font-semibold text-sm cursor-pointer'>kshdkbckidsab</p>
                    <p className='text-sm font-light'>kdanckadndkjkasnckad</p>
                </div>
                </div>
            </div>
            <div className='w-full flex flex-row justify-between px-[12px] py-2'>
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
            <div className='flex flex-row gap-2 pb-2 w-full'>
                <div className='h-40 w-full border '></div>
                <div className='h-40 w-full border '></div>
                <div className='h-40 w-full border '></div>
            </div>
            <div className='flex flex-row gap-3 w-full'>
                <Button fullWidth size='md' className="bg-[#1877F2]"  startContent={!isSmallScreen && <Messenger />}>
                    Send Message 
                </Button>
                <Button fullWidth size='md'>
                    follow
                </Button>
            </div>
        </div>
  );
}

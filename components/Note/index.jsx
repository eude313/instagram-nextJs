import React from 'react'
import Link from "next/link";
import { Back } from "@/icons";
import { Button, Avatar, Textarea } from "@nextui-org/react";

export default function Note() {
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex justify-between px-[12px] mt-3 md:mt-5 mb-4">
                <Button
                    href="/"
                    as={Link}
                    isIconOnly
                    className="bg-inherit -rotate-90 block md:hidden"
                    aria-label="Back"
                >
                    <Back />
                </Button>
                <h2
                    className='cursor-pointer font-semibold'
                >
                    New Note
                </h2>
                <Button
                    type='submit'
                    className="mt-2 mr-2 cursor-pointer font-semibold text-[#1877F2] bg-inherit"
                >
                    Send
                </Button>
            </div>

            <div className="my-auto flex justify-center">
                <div className='pt-9'>
                    <div className='flex flex-col relative w-auto justify-center'>
                        <div className="absolute left-0 -top-8 z-20">
                            <button className="ml-6 rounded-xl px-4 py-2 shadow-md
                        bg-[#262626] relative z-20">
                                Note
                            </button>
                            <Textarea
                                minRows={1}
                                placeholder="Note..."
                                className="ml-6 rounded-xl px-4 py-2 shadow-md
                            bg-[#262626] relative z-20"
                            />
                            <div className='ml-8 h-[8px] w-[10px] bg-[#262626] rounded-full'>
                            </div>
                            <div className="h-1 w-1 ml-10 rounded-full bg-[#262626]"></div>
                        </div>
                        <Avatar src='/user.png' alt='hey' className="w-22 h-22 text-large" />
                        <div className="px-[2px] mt-1 truncate text-center">
                            <small className='text-medium'>Your note</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

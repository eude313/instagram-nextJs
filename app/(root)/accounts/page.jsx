'use client';

import React from "react";

import { Back, Setting, Threads,  } from "@/icons";
import {Button} from "@nextui-org/react";

export default function AccountsPage() {
  return (
    <div className=""> 
      <div className='border-b border-[#DBDBDB] dark:border-[#262626] h-auto pb-2 block md:hidden'>
        <div className=" flex justify-between px-[12px]">
          <Button 
            isIconOnly  
            className="bg-inherit" 
            aria-label="settings"
          >
            <Setting/>
          </Button>
          <Button className="text-medium bg-inherit mt-1" endContent={
            <span className="rotate-180">
              <Back/>
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
      <div className=""></div>
    </div>
  );
}

'use client';

import React from "react";
import Link from "next/link";
import { Back, Create, Heart } from "@/icons";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Badge} from "@nextui-org/react";

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function Navbar() {
  return (
    <div className="flex justify-between px-[12px]">
      <Dropdown>
        <DropdownTrigger>
          <Button className="text-medium bg-inherit mt-1" endContent={
            <span className="rotate-180">
              <Back/>
            </span>
          }>
            Username
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="following" endContent={<Heart className={iconClasses} />}>Following</DropdownItem>
          <DropdownItem key="favorites" endContent={<Heart className={iconClasses} />}>Favorites</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="flex gap-2">
        <Button
          isIconOnly  
          className="bg-inherit -rotate-90" 
          aria-label="Back" 
        >
          <Create/>
        </Button>
        <Badge content="" shape="circle" color="danger">
          <Button 
            isIconOnly  
            href="/"
            as={Link}
            className="bg-inherit" 
            aria-label="start chat"
          >
            <Heart/>
          </Button> 
        </Badge>
      </div>
    </div>
  )
}

'use client';

import React from "react";
import Link from "next/link";
import { Back, Create, Heart } from "@/icons";
import { useModal } from "@/contexts/ModalContext";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Badge} from "@nextui-org/react";

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <div className="flex justify-between px-[12px]">
      <Dropdown>
        <DropdownTrigger>
          <Button className="text-medium bg-inherit mt-1" 
          onPress={() => {openModal('authModal')}}
          endContent={
            <span className="rotate-180">
              <Back width="15" height='15'/>
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
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-medium bg-inherit mt-1" isIconOnly  
              aria-label="Back" >
              <Create/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Create Actions">
            <DropdownItem key="post" 
            onPress={() => { openModal('createPostModal') }} endContent={<Heart className={iconClasses} />}>Post</DropdownItem>
            <DropdownItem key="story"
            onPress={() => { openModal('createStoryModal') }} endContent={<Heart className={iconClasses} />}>Story</DropdownItem>
          </DropdownMenu>
        </Dropdown>

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

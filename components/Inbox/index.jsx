'use client';

import React from "react";
import Link from "next/link";
import { Message, Back } from "@/icons";
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useModal } from "@/contexts/ModalContext";
import {Tabs, Tab, Button, Avatar} from "@nextui-org/react";

import 'swiper/css';
import 'swiper/css/navigation';

export default function Inbox() { 
  const { openModal } = useModal();
  const [selected, setSelected] = React.useState("login");
 
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between px-[12px] mt-3 md:mt-5 mb-4">
        <Button
          href="/"
          as={Link}
          isIconOnly  
          className="bg-inherit -rotate-90 block md:hidden" 
          aria-label="Back" 
        >
          <Back/>
        </Button>
        <Button className="text-medium bg-inherit mt-1" endContent={
          <span className="rotate-180">
            <Back/>
          </span>
        }>
          Username
        </Button>
        <Button isIconOnly  className="bg-inherit" aria-label="start chat" onPress={() => {
          console.log('Opening Search Modal');
          openModal('searchModal');
        }}>
          <Message/>
        </Button> 
      </div>
      <div className="flex flex-col w-full">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          variant="underlined"
          classNames={{
            cursor: "bg-[#3797f0] w-full",
            tabList: "border-b border-divider p-0 relative",
            tabContent: "group-data-[selected=true]:text-[#3797f0] fw-semibold"
          }}
          selectedKey={selected}
          onSelectionChange={setSelected}>
          <Tab key="primary" title="Primary">
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              scrollbar={{ draggable: true }}
              className="custom-swiper mt-2 mb-4 h-auto">
              <SwiperSlide>
                <div className='pt-9'> 
                  <div className='flex flex-col relative w-auto justify-center'>
                    <div className="absolute left-0 -top-8 z-20">
                      <button className="ml-6 rounded-xl px-4 py-2 shadow-md
                       bg-[#262626] relative z-20">
                        Note
                      </button>
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
              </SwiperSlide>
            </Swiper>
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
          <Tab key="general" title="General">
          </Tab>
          <Tab key="requests" title="Requests">
            <form className="flex flex-col gap-4 h-[300px]">
              
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary">
                  Sign up
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

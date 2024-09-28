"use client";

import  Link from 'next/link';
// import { mockUsers } from '@/data'
import ApiService from '@/lib/ApiService';
import { Avatar } from '@nextui-org/react';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState, useEffect} from "react";

import 'swiper/css';
import 'swiper/css/navigation';

export default function Stories() {
  const [userStories, setUserStories] = useState([]);


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const stories = await ApiService.getFollowingStories();
        setUserStories(stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={2}
      slidesPerView={3}
      navigation
      scrollbar={{ draggable: true }}
      className="custom-swiper"
      breakpoints={{
        550: {
          slidesPerView: 7, 
        },
        500: {
          slidesPerView: 6, 
        },
        350: {
          slidesPerView: 5,
          spaceBetween: 1,
        },
        300: {
          slidesPerView: 4, 
        }
      }}>
      {userStories.map((story) => (
        story.has_story && (
          <SwiperSlide key={story.id}> 
            <Link href='#' className='text-medium'>
              <li className="flex flex-col items-center pt-[3px]">
                <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] 
                  p-[2px] bg-default text-default-foreground rounded-full">
                  <button className="block bg-white dark:bg-black p-[2px] 
                  rounded-full">
                    <Avatar
                      radius="full"
                      className="text-sm"
                      size="lg"
                      shadow='sm'
                      src={story.user.profile_picture}
                      alt={story.user.username}
                    />
                  </button>
                </div>
                <div className="px-[2px] mt-1 truncate w-full text-center">
                    <div className='text-sm tracking-tight font-normal '>{story.user.username}</div>
                </div>
              </li>
            </Link>
          </SwiperSlide>
        )
      ))}
    </Swiper>
  )
}

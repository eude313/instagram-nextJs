'use client';

import Loading from './loading';
import Reel from '@/components/Reel';
import React,{ Suspense } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';


export default function page() { 
  return (
    <div> 
      <Swiper
        slidesPerView={'auto'}
        scrollbar={{ draggable: true }}
        className="custom-swiper h-screen w-full"
        direction={'vertical'}>
        <SwiperSlide className="w-full">
          <Suspense fallback={<Loading/>}>
            <Reel/>
          </Suspense>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

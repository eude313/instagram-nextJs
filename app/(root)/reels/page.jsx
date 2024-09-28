'use client';


import Reel from '@/components/Reel';
import ProgressBar from '@/components/ProgressBar'
import React,{ Suspense, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ApiService from '@/lib/ApiService';
import { Image } from "@nextui-org/react"


import 'swiper/css';


export default function page() { 
  const [reelsData, setReelsData] = useState([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const data = await ApiService.getReels();
        console.log("API response:", data);
        if (data && Array.isArray(data.results)) {
          setReelsData(data.results);
        } else {
          console.error("API did not return expected structure:", data);
          setReelsData([]);
        }
      } catch (error) {
        console.error('Error fetching reels:', error);
        setReelsData([]);
      }
    };
  
    fetchReels();
  }, []);
  return (
    <div> 
      <Swiper
        slidesPerView={'auto'}
        scrollbar={{ draggable: true }}
        className="custom-swiper h-screen w-full"
        direction={'vertical'}>
        {Array.isArray(reelsData) ? (
        reelsData.map((reel) => (
          <SwiperSlide key={reel.id} className="w-full">
            <Suspense fallback={<ProgressBar/>}>
              <Reel reel={reel} />
            </Suspense>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide className="w-full">
          <div>No reels available or data is loading...</div>
        </SwiperSlide>
      )}
        {/* <SwiperSlide className="w-full">
            <Reel/>

        </SwiperSlide>
        <SwiperSlide className="w-full">
          <div className="fixed top-0 left-0 w-full h-2">
            <div className="h-full w-full animated-gradient"></div>
          </div>
          <div className="w-screen h-screen flex justify-center">
            <div className='self-center'>
              <Image
                  width={100}  
                  height={100} 
                  alt="instagram"
                  src="/instagram-new-2022-seeklogo.svg"
              />
            </div>
            <h1 class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">hello world</h1>

            <p className="text-lg font-semibold self-end">by <span > Eudes</span></p> 
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}

// 'use client';


// import Reel from '@/components/Reel';
// import ProgressBar from '@/components/ProgressBar'
// import React,{ Suspense, useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import ApiService from '@/lib/ApiService';


// import 'swiper/css';


// export default function ReelsPage() { 
//   const [reelsData, setReelsData] = useState([]);

//   useEffect(() => {
//     const fetchReels = async () => {
//       try {
//         const data = await ApiService.getReels();
//         console.log("API response:", data);
//         if (data && Array.isArray(data.results)) {
//           setReelsData(data.results);
//         } else {
//           console.error("API did not return expected structure:", data);
//           setReelsData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching reels:', error);
//         setReelsData([]);
//       }
//     };

//     fetchReels();
//   }, []);

//   return (
//     <div> 
//       <Swiper
//         slidesPerView={'auto'}
//         scrollbar={{ draggable: true }}
//         className="custom-swiper h-screen w-full"
//         direction={'vertical'}>
//         {Array.isArray(reelsData) ? (
//         reelsData.map((reel) => (
//           <SwiperSlide key={reel.id} className="w-full">
//             <Suspense fallback={<ProgressBar/>}>
//               <Reel reel={reel} />
//             </Suspense>
//           </SwiperSlide>
//         ))
//       ) : (
//         <SwiperSlide className="w-full">
//           <div>No reels available or data is loading...</div>
//         </SwiperSlide>
//       )}
//       </Swiper>
//     </div>
//   );
// }
'use client';

import Reel from '@/components/Reel';
import ProgressBar from '@/components/ProgressBar';
import React, { Suspense, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ApiService from '@/lib/ApiService';
import { useRouter, usePathname } from 'next/navigation';

import 'swiper/css';

export default function ReelsPage() {
  const [reelsData, setReelsData] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const data = await ApiService.getReels();
        if (data && Array.isArray(data.results)) {
          setReelsData(data.results);

          if (data.results.length > 0 && pathname === '/reels') {
            router.push(`/reels/${data.results[0].id}`, { scroll: false });
          }
        }
      } catch (error) {
        console.error('Error fetching reels:', error);
        setReelsData([]);
      }
    };

    fetchReels();
  }, [router, pathname]);

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    if (reelsData[activeIndex]) {
      router.push(`/reels/${reelsData[activeIndex].id}`, { scroll: false });
    }
  };

  return (
    <div>
      <Swiper
        slidesPerView={'auto'}
        scrollbar={{ draggable: true }}
        className="custom-swiper h-screen w-full"
        direction={'vertical'}
        onSlideChange={handleSlideChange}>
        {Array.isArray(reelsData) && reelsData.length > 0 ? (
          reelsData.map((reel) => (
            <SwiperSlide key={reel.id} className="w-full">
              <Suspense fallback={<ProgressBar />}>
                <Reel reel={reel} />
              </Suspense>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="w-full">
            <ProgressBar />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
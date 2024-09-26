'use client';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

const slider = [
  {
    id: "b1",
    name: "adv",
    images: ['/images/promotions/laptop/testing.png']
  },
  {
    id: "b2",
    name: "adv2",
    images: ['/images/promotions/laptop/testing.png']
  },
  {
    id: "b3",
    name: "adv2",
    images: ['/images/promotions/laptop/testing.png']
  },
  {
    id: "b4",
    name: "adv2",
    images: ['/images/promotions/laptop/testing.png']
  },
  {
    id: "b5",
    name: "adv2",
    images: ['/images/promotions/laptop/testing.png']
  },
];

export default function Carousel() {
  return (
    <main suppressHydrationWarning={true}>
        <Swiper
        effect={'cube'}
        autoplay={
          {
            delay:2500,
            waitForTransition:true,
            pauseOnMouseEnter:true,
          }
        }
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        // pagination={true}
        modules={[EffectCube, Pagination ,Autoplay]}
        className="mySwiper w-11/12"
      >
        <SwiperSlide>
          <img src={slider[0].images[0]} />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider[1].images[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider[2].images[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider[3].images[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider[4].images[0]} />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}



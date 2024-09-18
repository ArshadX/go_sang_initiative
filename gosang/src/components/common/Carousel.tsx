'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination, Virtual } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        className="mySwiper swiper-h w-screen bg-slate-500 h-96"
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,Virtual]}
        autoplay
        virtual
      >
        <SwiperSlide>Horizontal Slide 1</SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-v w-full h-full"
            direction={'vertical'}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay,Virtual]}
            autoplay
            virtual
          >
            <SwiperSlide>Vertical Slide 1</SwiperSlide>
            <SwiperSlide>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>Horizontal Slide 3</SwiperSlide>
        <SwiperSlide>Horizontal Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
}



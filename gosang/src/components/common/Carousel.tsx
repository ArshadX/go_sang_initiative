"use client";
import { Autoplay, EffectCoverflow, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@/styles/carousel.module.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import Image from 'next/image';

export default function Carousel() {
  // Create array with 10 slides
  const slides = Array.from({ length: 10 }).map((el, index) => (
    <div key={index} className="relative">
      <Image 
        alt="your destination" 
        src={`/images/promotions/laptop/testing.png`} 
        width={1920} 
        height={484} 
        loading={index===0?"eager":"lazy"} // Lazy load remote images
        priority={index === 0} // Prioritize the first image
        className='w-screen h-auto'
      />
    </div>
  ));

  return (
    <Swiper
      effect="coverflow" // Set coverflow effect
      loop
      autoplay
      coverflowEffect={{
        rotate: 5,            // No rotation for a clean look
        stretch: 0,           // No additional spacing
        depth: 10,           // Increase depth to create a sense of 3D perspective
        modifier: 1,
        slideShadows: false,  // Optional: turn off shadows for clean look
      }}
      modules={[EffectCoverflow, Virtual,Autoplay]}
      spaceBetween={50}
      slidesPerView={1.2}  
      centeredSlides={true}
      virtual   
   
      className={styles.swiper} // Custom class for custom styling
    >
      {slides.map((slideContent, index) => (
        <SwiperSlide key={index} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}



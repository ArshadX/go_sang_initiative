"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Define slide data with image, mobileImage, and link
const slides = [
  {
    image: "/images/about/vimal.jpg",
    mobileImage: "/images/promotions/mobile/mobileslider1.jpg",
    link: "/link-to-first-slide",
  },
  {
    image: "/images/promotions/laptop/testing.png",
    mobileImage: "/images/promotions/mobile/mobileslider2.jpg",
    link: "/link-to-second-slide",
  },
  // Add more slides as needed
];

const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Track mobile state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect window size only on client-side
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Update state on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleImageClick = (link: string) => {
    window.location.href = link; // Navigate to the link
  };

  const currentImage = isMobile ? slides[currentSlide].mobileImage : slides[currentSlide].image;

  // Swipe functionality for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) {
      handleNextSlide(); // Swipe left
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevSlide(); // Swipe right
    }
  };

  return (
    <div className="relative w-full max-w-screen-lg mx-auto mt-4 overflow-hidden px-4">
      {/* Show navigation buttons only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
          <button
            onClick={handlePrevSlide}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNextSlide}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}

      <div
        className="relative w-full h-64 md:h-64 sm:h-40 max-h-80 overflow-hidden rounded-lg bg-gray-200"
        onTouchStart={handleTouchStart} // Detect swipe start on mobile
        onTouchEnd={handleTouchEnd} // Detect swipe end on mobile
      >
        <div
          onClick={() => handleImageClick(slides[currentSlide].link)}
          className="block w-full h-full cursor-pointer"
        >
          <Image
            src={currentImage}
            alt={`Slide ${currentSlide + 1}`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSlider;


import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://red-parts.react.themeforest.scompiler.ru/themes/red/images/slides/slide-3.jpg",
  "https://red-parts.react.themeforest.scompiler.ru/themes/red/images/slides/slide-2-mobile.jpg",
  "https://red-parts.react.themeforest.scompiler.ru/themes/red/images/slides/slide-1-mobile.jpg",
];


function HomeBanner() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoSlide(); // Restart the timer after manual navigation
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval
    intervalRef.current = setInterval(goToNext, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide(); // Cleanup on unmount
  }, []);
  return (
    // <div className="relative w-full  max-w-4xl mx-auto overflow-hidden rounded-lg">
    <div
      className="relative w-full overflow-hidden rounded-none bg-gray-100"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >

      {/* Slides */}
      <div className="flex transition-transform duration-700 ease-in-out w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[400px]" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute  bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === index ? "bg-red-600" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>

      {/* Prev Button */}
      {/* <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button> */}

      {/* Next Button */}
      {/* <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button> */}
    </div>
  );
}

export default HomeBanner

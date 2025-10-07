import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://red-parts.react.themeforest.scompiler.ru/themes/red/images/slides/slide-3.jpg",
      // "https://img.freepik.com/free-photo/young-happy-sportswoman-running-road-morning-copy-space_637285-3758.jpg?semt=ais_incoming&w=740&q=80",
      // "https://media.istockphoto.com/id/2153823097/photo/cheerful-athletic-couple-jogging-through-the-park.jpg?s=612x612&w=0&k=20&c=7ZDGNkOSuXWxEmJkKpbisVSvo5mM3d3VcHkVhLhSD1Q=",
    category: "Apparel",
    title: "Performance Apparel",
    subtitle: "Look Good, Feel Good, Play Better.",
    link: "/productViewAll?category=Apparel",
  },
  {
    image:
      // "https://red-parts.react.themeforest.scompiler.ru/themes/red/images/slides/slide-2-mobile.jpg",
      // "https://media.istockphoto.com/id/533336742/photo/strongman-with-can-of-supplements.jpg?s=612x612&w=0&k=20&c=ckq9eDWfA9Fd6uPsIWun6hgw-w5aMAME-iHBGTrXlhc=",
      "https://media.istockphoto.com/id/584213296/photo/taking-supplements.jpg?s=612x612&w=0&k=20&c=j2HgxEicMM2pk78BzLBnQJq9ymo5INGOULqBLXOT7aw=",
    category: "Nutrition",
    title: "Fuel Your Body",
    subtitle: "Top-Quality Nutritions for Peak Performance.",
    link: "/productViewAll?category=Nutrition",
  },
  {
    image:
      // "https://red-parts.react.themeforest.scompiler.ru/themes/red/images/slides/slide-1-mobile.jpg",
      // "https://www.shutterstock.com/image-photo/young-8-years-old-indian-600nw-2627690837.jpg",
      "https://media.istockphoto.com/id/1709373217/photo/kid-in-cricket-dress-holding-bat-and-helmet-celebrating-century-on-isolated-background-studio.jpg?s=612x612&w=0&k=20&c=ZeBcLIxzcAHHU9vKoVdB4gxzPMwry33qDWo5tmJvPSM=",
    category: "Equipment",
    title: "Gear Up for Glory",
    subtitle: "The Best Equipment for Every Sport.",
    link: "/productViewAll?category=Equipment",
  },
];

function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoSlide(); // Restart the timer after manual navigation
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
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
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Link
            to={slide.link}
            key={index}
            className="group w-full h-full flex-shrink-0 relative text-white cursor-pointer"
          >
            {/* Image container */}
            <div className="absolute inset-0 bg-black">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-fill object-center"
              />
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            <div className="relative h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 flex flex-col justify-center items-center xsm:items-start text-center xsm:text-left p-6 sm:p-8 md:p-12 lg:p-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow">
                {slide.subtitle}
              </p>
              <div
                className="mt-6 sm:mt-8 px-4 py-2 text-sm sm:px-7 sm:py-3 sm:text-base bg-red-600 text-white font-bold rounded-md shadow-lg group-hover:bg-red-700 transform group-hover:scale-105 transition-all duration-300 pointer-events-auto"
              >
                Shop Now
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute  bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${
              currentSlide === index ? "bg-red-600" : "bg-gray-400"
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

export default HomeBanner;

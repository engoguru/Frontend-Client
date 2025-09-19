import React, { useState, useRef, useEffect } from 'react';

function ProductDetail() {
  const productImages = [
    'https://www.100acress.com/amenities_image/basketball.webp',
    'https://www.100acress.com/amenities_image/senior_citizen.webp',
    'https://www.100acress.com/amenities_image/senior_citizen.webp',
    'https://via.placeholder.com/300x200/FF0000',
    'https://via.placeholder.com/300x200/00FF00',
    'https://via.placeholder.com/300x200/0000FF',
    'https://via.placeholder.com/300x200/FFFF00',
    'https://via.placeholder.com/300x200/FF00FF',
    'https://via.placeholder.com/300x200/00FFFF',
  ];
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const thumbnailContainerRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // Swipe logic for mobile slider
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end position on new touch
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;

    const handleScrollState = () => {
      // Only run this for desktop view
      if (window.innerWidth < 768) {
        setCanScrollUp(false);
        setCanScrollDown(false);
        return;
      }

      const { scrollHeight, clientHeight } = container;
      const hasScroll = scrollHeight > clientHeight;

      setCanScrollUp(hasScroll && container.scrollTop > 0);
      // Use a small tolerance for the bottom check
      setCanScrollDown(hasScroll && container.scrollTop < scrollHeight - clientHeight - 1);
    };

    // Add event listener for scroll events
    container.addEventListener('scroll', handleScrollState);
    // Add event listener for window resize
    window.addEventListener('resize', handleScrollState);

    // Initial check after a delay to ensure layout is stable
    const timer = setTimeout(handleScrollState, 300);

    // Cleanup
    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', handleScrollState);
      window.removeEventListener('resize', handleScrollState);
    };
  }, [productImages]);

  const handleThumbnailScroll = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 240; // Scroll by 4 items: 4 * (48px height + 12px gap)
      thumbnailContainerRef.current.scrollBy({ top: direction === 'down' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const tabs = ['Description', 'Specifications', 'Reviews'];

  return (
  <div className="p-4 md:p-5 px-between-480-768">
      {/* Product Card */}
  <div className="flex flex-col md:flex-row gap-5 bg-white shadow-md rounded-lg py-4 px-6 md:p-4 card-px-between-480-768">
        {/* Images Section (Left on Desktop) */}
        <div className="md:w-1/2 lg:w-7/12">
          {/* Mobile Slider */}
          <div className="relative md:hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {productImages.map((img, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <img
                      src={img}
                      alt={`Product image ${idx + 1}`}
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
              {productImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-4 bg-red-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-[auto_1fr] gap-4 card-px-between-480-768">
            {/* Thumbnails */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => handleThumbnailScroll('up')}
                className={`mb-2 transition-opacity duration-200 ${canScrollUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                disabled={!canScrollUp}
                aria-label="Scroll thumbnails up"
              >
                <svg className="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
              </button>
              <div
                ref={thumbnailContainerRef}
                className="flex flex-col gap-3 overflow-y-auto scroll-smooth scrollbar-hide h-[288px]"
              >
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-12 h-12 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                      currentSlide === idx ? 'border-red-600' : 'border-gray-300'
                    }`}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
              <button
                onClick={() => handleThumbnailScroll('down')}
                className={`mt-2 transition-opacity duration-200 ${canScrollDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                disabled={!canScrollDown}
                aria-label="Scroll thumbnails down"
              >
                <svg className="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>
            {/* Main Image */}
            <div>
              <img
                src={productImages[currentSlide]}
                alt="Main Product"
                className="w-full h-auto md:aspect-[4/5] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Details Section (Right on Desktop) */}
  <div className="md:w-1/2 lg:w-5/12 space-y-4 card-px-between-480-768">
          <h2 className="md:text-lg lg:text-2xl font-bold text-gray-800 ">Awesome Product Name</h2>
          <div className="flex items-center gap-4">
            <p className="text-red-600 md:text-sm lg:text-lg font-bold">₹1,499</p>
            <p className="text-gray-500 line-through md:text-md lg:text-lg ">₹1,999</p>
            <p className="text-green-600 font-semibold md:text-md lg:text-lg ">(25% OFF)</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">Color</h4>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-red-600 border-2 border-gray-300 cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-blue-600 border-2 border-gray-300 cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-green-600 border-2 border-gray-300 cursor-pointer"></span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 mt-3 text-gray-800 md:text-sm lg:text-md">Size</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1.5 rounded-md transition-colors duration-200 ${
                    selectedSize === size
                      ? 'bg-red-600 text-white border-red-600'
                      : 'text-gray-800 border-gray-300 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {/* Mobile & Tablet View: Quantity + Add to Cart */}
          <div className="mt-6 md:mt-8 flex items-center gap-3 lg:hidden">
            <div className="w-36 h-11 flex justify-between items-center border rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 h-full text-lg text-gray-700 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="text-lg">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 h-full text-lg text-gray-700 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className="w-36 h-11 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 font-semibold text-sm md:text-base">
              Add to Cart
            </button>
          </div>

          {/* Desktop View: Quantity + Add to Cart */}
          {/* Desktop View: show quantity read-only because payment summary handles edits */}
          <div className="hidden lg:flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded overflow-hidden px-4 py-1">
              <span className="text-lg text-gray-700">Qty: {quantity}</span>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-sm sm:text-base font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="text-black text-sm leading-6">
          This is a sample product description. It's high-quality, durable, and perfect for your needs. Detailed
          specifications and customer reviews will be available soon.
        </p>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Related Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`https://www.100acress.com/amenities_image/senior_citizen.webp`}
                alt={`Related Product ${idx + 1}`}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="text-md font-semibold mt-2">Product Name</h4>
              <p className="text-red-600 font-bold mt-1">₹999</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

// and hide particular forward and backward button for thumbnail scrolling if there is no more image to scroll in that direction

// Also, center the whole product detail page on the screen and limit its maximum width to 1200px
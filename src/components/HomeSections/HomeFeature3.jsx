import React, { useRef,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEquipmentProducts } from '../../store/slice/productSlice';
function HomeFeature3() {
  const scrollContainerRef = useRef(null);
  
  // Swipe logic
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  const dispatch = useDispatch();

  const { equipmentProducts, totalCount, totalPages, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchEquipmentProducts({ productCategory:'Equipment' }));
  }, [dispatch]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      // Scroll by the width of the container, which shows the next "page" of items
      const scrollAmount = clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount),
        behavior: 'smooth',
      });
    }
  };

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollPrev(scrollLeft > 0);
      // Check if we are at the end (with a small tolerance for fractional pixels)
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check on mount and when products change
      checkScrollability();
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [equipmentProducts]);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with a single touch
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scroll('next');
    } else if (isRightSwipe) {
      scroll('prev');
    }
  };
  return (
    <>

      <div className="w-full text-center">
        {/* Header */}
        <div className="flex bg-red-100 border-b border-gray-500 justify-between items-center w-full py-4">
          <div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[21px] font-semibold text-black px-2 transition-all duration-300">Featured Equipment Products</p>
          </div>
          <div className="flex items-center space-x-2 px-2">
            <button onClick={() => scroll('prev')} disabled={!canScrollPrev} aria-label="Previous Products" className={`p-1 rounded-full text-white transition-colors ${canScrollPrev ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}>
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => scroll('next')} disabled={!canScrollNext} aria-label="Next Products" className={`p-1 rounded-full text-white transition-colors ${canScrollNext ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}>
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Product Grid */}
        <div className="w-full bg-whitesmoke-700 py-6">
          {/* The scrollbar-hide class is a common utility; you may need to add it to your CSS if you don't have a plugin for it. */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-3"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Product Card */}
            {equipmentProducts?.map((equipment, index) => (
              <div key={index} className="snap-start w-full xs:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3">
                <div className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col">
                  <img
                    src="https://www.jiomart.com/images/product/original/rvrsolhn2k/yogarise-anti-skid-yoga-mat-with-carry-bag-strap-for-home-gym-outdoor-workout-water-resistant-soft-easy-to-fold-4mm-army-green-product-images-orvrsolhn2k-p596407634-0-202212161253.jpg?im=Resize=(420,420)"
                    alt="Product"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h2 className="text-lg font-semibold mt-3">{equipment?.productName}</h2>
                  <p className="text-gray-600 text-sm mt-1">Short product description goes here.</p>
                  <p className="text-red-600 font-bold mt-2">$29.99</p>
                  <Link to={`/productDetail/${equipment?._id}`} className="mt-auto block focus:outline-none">
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



    </>
  )
}

export default HomeFeature3
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../../store/slice/selectedSlice";
import { addItemToCart } from "../../store/slice/cartSlice";
import { getMeDetails } from "../../store/slice/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createFeedback } from "../../store/slice/feedbackSlice";
import ProductDetailPayment from "./ProductDetailPayment";

function ProductDetail({
  productData = {},
  reletedProduct,
  feedback,
  onCommentAdded,
  onAddToCart,
}) {
  // console.log(feedback, "k")
  const dispatch = useDispatch();
  const { meDetails, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const productImages = [
    "https://www.100acress.com/amenities_image/basketball.webp",
    "https://www.100acress.com/amenities_image/senior_citizen.webp",
    "https://www.100acress.com/amenities_image/senior_citizen.webp",
    "https://via.placeholder.com/300x200/FF0000",
    "https://via.placeholder.com/300x200/00FF00",
    "https://via.placeholder.com/300x200/0000FF",
    "https://via.placeholder.com/300x200/FFFF00",
    "https://via.placeholder.com/300x200/FF00FF",
    "https://via.placeholder.com/300x200/00FFFF",
  ];

  const [selected_Nutrition_flavor, setSelected_Nutrition_flavor] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  // console.log(selectedSize,"sddd")
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const thumbnailContainerRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // Swipe logic
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // State for image zoom effect
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });
  const [loupePosition, setLoupePosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // reviews adding
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  // for review
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleReviewSubmit = () => {
    if (!meDetails) {
      return toast.warning("Login before Comment");
    }
    if (!newComment.trim() || newRating === 0) {
      alert("Please add a rating and comment.");
      return;
    }

    // Create FormData if sending images to server
    const formData = new FormData();
    formData.append("comment", newComment);
    formData.append("rating", newRating);
    formData.append("productId", productData?._id);
    selectedImages.forEach((file) => {
      formData.append("feedbackImage", file); // note: name must match multer field name
    });

    // Submit the review (mocked or API call)
    dispatch(createFeedback(formData));
    // setReviews(prev => [reviewData, ...prev]);
    onCommentAdded();
    toast.success("Your FeedBack Added");
    // Clear form
    setNewComment("");
    setNewRating(0);
    setSelectedImages([]);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches?.[0]?.clientX || null);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches?.[0]?.clientX || null);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    const images = productData?.productImages || [];

    if (isLeftSwipe) {
      // Swipe forward (left)
      if (currentSlide < images.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    } else if (isRightSwipe) {
      // Swipe backward (right)
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Thumbnail scroll state (desktop)
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;

    const handleScrollState = () => {
      if (window.innerWidth < 768) {
        setCanScrollUp(false);
        setCanScrollDown(false);
        return;
      }
      const { scrollHeight, clientHeight, scrollTop } = container;
      const hasScroll = scrollHeight > clientHeight;
      setCanScrollUp(hasScroll && scrollTop > 0);
      setCanScrollDown(
        hasScroll && scrollTop < scrollHeight - clientHeight - 1
      );
    };

    container.addEventListener("scroll", handleScrollState);
    window.addEventListener("resize", handleScrollState);
    const timer = setTimeout(handleScrollState, 200);

    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", handleScrollState);
      window.removeEventListener("resize", handleScrollState);
    };
  }, [productImages]);

  const handleThumbnailScroll = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 240; // 4 items approx
      thumbnailContainerRef.current.scrollBy({
        top: direction === "down" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handlers for the zoom effect
  const handleMouseMove = (e) => {
    if (!zoomActive) return;
    const LOUPE_SIZE = 144; // Corresponds to w-36 (9rem * 16px/rem)
    const LOUPE_HALF_SIZE = LOUPE_SIZE / 2;

    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to the image
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Clamp the loupe's position to stay within the image boundaries
    const clampedX = Math.max(
      LOUPE_HALF_SIZE,
      Math.min(x, rect.width - LOUPE_HALF_SIZE)
    );
    const clampedY = Math.max(
      LOUPE_HALF_SIZE,
      Math.min(y, rect.height - LOUPE_HALF_SIZE)
    );

    // Convert to percentage for background-position
    // Use the original mouse position for a natural zoom mapping
    const xPercent = (clampedX / rect.width) * 100;
    const yPercent = (clampedY / rect.height) * 100;

    setZoomPosition({ x: `${xPercent}%`, y: `${yPercent}%` });
    // Set the loupe's visual position to the clamped values
    setLoupePosition({ x: clampedX, y: clampedY });
  };

  const handleMouseEnter = () => setZoomActive(true);
  const handleMouseLeave = () => setZoomActive(false);

  // Auto-select first available size when productData loads
  useEffect(() => {
    const variants = productData?.productVarient;
    if (Array.isArray(variants) && variants.length > 0 && !selectedSize) {
      setSelectedSize(variants[0]?.size ?? null);
    }
  }, [productData, selectedSize]);

  // Robust handleSelect: works for mobile & desktop, handles undefineds, quantity, fallback
  // const {addCart,loading,error}=useSelector((state)=>state?.cart)

  let addCartLoading = false;
  const { addCart, loaading, error } = useSelector((state) => state.cart);
  const handleSelect = async (sizeArg = null) => {
    try {
      if (!meDetails) {
        toast.warning("Login first!");
        return;
      }
      addCartLoading = true;
      const variants = Array.isArray(productData?.productVarient)
        ? productData.productVarient
        : [];

      // If there are variants, prefer: sizeArg -> selectedSize -> first variant size
      const sizeToUse =
        sizeArg ??
        selectedSize ??
        (variants.length > 0 ? variants[0]?.size ?? null : null) ??
        productData?.size ??
        null;

      // Find matching variant (if any)
      let selectedVariant = variants.find((v) => v?.size === sizeToUse);

      // Fallback to first variant if none matched and variants exist
      if (!selectedVariant && variants.length > 0) {
        selectedVariant = variants[0];
      }

      // Final fallbacks for price and color
      const finalPrice = selectedVariant?.price ?? productData?.price ?? 0;
      const finalColor = Array.isArray(selectedVariant?.color)
        ? selectedVariant.color
        : selectedVariant?.color
        ? [selectedVariant.color]
        : Array.isArray(productData?.color)
        ? productData.color
        : [];

      const payload = {
        productId: productData?._id ?? null, // included (may be null if source lacks it)
        productName: productData?.productName ?? "Unknown Product",
        productBrand: productData?.productBrand ?? null,
        category: productData?.productCategory ?? null,
        size: sizeToUse ?? null, // always present (maybe null)
        color: finalColor, // always present as array
        flavor:
          selectedVariant?.flavor?.[selected_Nutrition_flavor] ??
          productData?.flavor?.[selected_Nutrition_flavor] ??
          "",

        price: finalPrice, // always present (fallback 0)
        // originalPrice: intentionally removed
        discount: selectedVariant?.discount ?? productData?.discount ?? null,
        quantity: quantity ?? 1,
      };

      // Dispatch the payload
      const result = await dispatch(addItemToCart(payload)).unwrap();

      if (result?.status === 201 || result?.status === 200) {
        addCartLoading = false;
        onAddToCart();
        toast.success("Item successfully added to your cart.");
      } else {
        toast.warning("Unexpected response.");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add item to cart.");
    }

    // Final fallbacks for price and color
    const finalPrice = selectedVariant?.price ?? productData?.price ?? 0;
    const finalColor =
      Array.isArray(selectedVariant?.color) ? selectedVariant.color :
        selectedVariant?.color ? [selectedVariant.color] :
          Array.isArray(productData?.color) ? productData.color :
            [];

    const payload = {
      productId: productData?._id ?? null, // included (may be null if source lacks it)
      productName: productData?.productName ?? 'Unknown Product',
      category: productData?.productCategory ?? null,
      size: sizeToUse ?? null,        // always present (maybe null)
      color: finalColor,             // always present as array
      flavor:
  selectedVariant?.flavor?.[selected_Nutrition_flavor] ??
  productData?.flavor?.[selected_Nutrition_flavor] ??
  '',
      price: finalPrice,             // always present (fallback 0)
      // originalPrice: intentionally removed 
      discount: selectedVariant?.discount ?? productData?.discount ?? null,
      quantity: quantity ?? 1,

    };

    // Dispatch the payload
 const result = await dispatch(addItemToCart(payload)).unwrap();


  if (result?.status === 201 || result?.status === 200) {
    addCartLoading = false;
    onAddToCart();
    toast.success('Item successfully added to your cart.');
  } else {
    toast.warning('Unexpected response.');
  }
  
// } catch (error) {
//     console.error("Add to cart failed:", error);
//   toast.error('Failed to add item to cart.');
// }
   

  };

  const tabs = ["Description", "Specifications", "Reviews"];

  return (
    <div className="p-4 md:p-5 px-between-480-768">
      {/* Full-screen Lightbox for Mobile */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-white flex items-center justify-center z-50"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-black text-4xl font-bold"
            aria-label="Close image view"
          >
            &times;
          </button>
          <img
            src={productData?.productImages[currentSlide]?.url}
            alt="Full screen product view"
            className="max-w-full max-h-full object-contain"
            // Prevent the click on the image from closing the lightbox
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Product Card */}
      <div className="flex flex-col md:flex-row gap-5 bg-white shadow-md rounded-lg py-4 px-6 md:p-4 card-px-between-480-768">
        {/* Images Section (Left on Desktop) */}
        <div className="md:w-1/2 lg:w-7/12">
          {/* Mobile Slider */}
          <div
            className="relative md:hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {productData?.productImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full flex-shrink-0 cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <img
                      src={img?.url}
                      alt={`Product image ${idx + 1}`}
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
              {productData?.productImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-4 bg-red-600" : "bg-gray-300"
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
                onClick={() => handleThumbnailScroll("up")}
                className={`mb-2 transition-opacity duration-200 ${
                  canScrollUp ? "opacity-100" : "opacity-0 pointer-events-none"
                } cursor-pointer`}
                disabled={!canScrollUp}
                aria-label="Scroll thumbnails up"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </button>
              <div
                ref={thumbnailContainerRef}
                className="flex flex-col gap-3 overflow-y-auto scroll-smooth scrollbar-hide h-[288px]"
              >
                {productData?.productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img?.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-12 h-12 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                      currentSlide === idx
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    onMouseEnter={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
              <button
                onClick={() => handleThumbnailScroll("down")}
                className={`mt-2 transition-opacity duration-200 ${
                  canScrollDown
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                } cursor-pointer`}
                disabled={!canScrollDown}
                aria-label="Scroll thumbnails down"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            {/* Main Image */}
            <div
              className={`relative ${zoomActive ? "cursor-none" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <img
                src={productData?.productImages[currentSlide]?.url}
                alt="Main Product"
                className="w-full h-auto md:aspect-[4/5] object-cover rounded-lg"
              />
              {/* Zoom Loupe Indicator - visible on hover */}
              {zoomActive && (
                <div
                  className="absolute flex items-center justify-center w-36 h-36 bg-gray-200/30 border border-gray-200 pointer-events-none"
                  style={{
                    left: `${loupePosition.x}px`,
                    top: `${loupePosition.y}px`,
                    transform: "translate(-50%, -50%)", // Center the loupe on the cursor
                  }}
                >
                  <span className="text-5xl font-light text-gray-600">+</span>
                </div>
              )}
              {/* Zoom Container - visible on hover */}
              {zoomActive && (
                <div
                  className="absolute top-0 left-[105%] h-[120%] lg:h-[150%] w-[120%] lg:w-[210%] bg-no-repeat bg-white border border-gray-300 rounded shadow-lg pointer-events-none z-10"
                  style={{
                    backgroundImage: `url(${productData?.productImages[currentSlide]?.url})`,
                    backgroundPosition: `${zoomPosition.x} ${zoomPosition.y}`,
                    // Adjust backgroundSize for zoom level. 200% = 2x zoom.
                    backgroundSize: "200%",
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* Details Section (Right on Desktop) */}
        <div className="md:w-1/2 lg:w-5/12 space-y-4 card-px-between-480-768">
          <h2 className="md:text-lg lg:text-2xl font-bold text-gray-800 ">
            {productData?.productName ?? "Product"}
          </h2>

          {/* Price (shows for selected size) */}
          <div className="flex items-center gap-4">
            {Array.isArray(productData?.productVarient) &&
              productData.productVarient.map((variant, index) => (
                <React.Fragment key={index}>
                  {selectedSize === variant?.size && (
                    <>
                      <p className="text-red-600 md:text-sm lg:text-lg font-bold">
                        ₹{variant?.price ?? "0"}
                      </p>
                      <p className="text-gray-500 line-through md:text-md lg:text-lg">
                        {variant?.originalPrice ?? "—"}
                      </p>
                      <p className="text-green-600 font-semibold md:text-md lg:text-lg">
                        ({variant?.discount ?? "0"}% OFF)
                      </p>
                    </>
                  )}
                </React.Fragment>
              ))}
          </div>

          {/* Color / Flavors */}
          {productData?.productCategory === "Apparel" && (
            <div>
              <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">
                Color
              </h4>
              <div className="flex gap-3">
                {productData?.productVarient
                  ?.find((el) => el.size === selectedSize)
                  ?.color?.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: (color || "").toLowerCase() }}
                      title={color}
                    ></button>
                  )) ?? (
                  <span className="text-sm text-gray-500">No colors</span>
                )}
              </div>
            </div>
          )}

          {productData?.productCategory === "Nutrition" && (
            <div>
              <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">
                Flavors
              </h4>
              <div className="flex gap-3">
                {(Array.isArray(
                  productData?.productVarient?.find(
                    (el) => el.size === selectedSize
                  )?.flavor
                )
                  ? productData.productVarient.find(
                      (el) => el.size === selectedSize
                    )?.flavor
                  : productData?.productVarient?.find(
                      (el) => el.size === selectedSize
                    )?.flavor
                  ? [
                      productData?.productVarient?.find(
                        (el) => el.size === selectedSize
                      )?.flavor,
                    ]
                  : []
                ).map((flavor, index) => (
                  <button
                    key={index}
                    onClick={() => setSelected_Nutrition_flavor(index)}
                    className={`border px-3 py-1 rounded text-sm hover:border-red-600 cursor-pointer 
          ${
            selected_Nutrition_flavor === index
              ? "bg-red-500 text-white border-red-600"
              : ""
          }`}
                  >
                    {flavor ?? "—"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productData?.productCategory === "Equipment" && (
            <div>
              <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">
                Color
              </h4>
              <div className="flex gap-3">
                {productData?.productVarient
                  ?.find((el) => el.size === selectedSize)
                  ?.color?.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: (color || "").toLowerCase() }}
                      title={color}
                    ></button>
                  )) ?? (
                  <span className="text-sm text-gray-500">No colors</span>
                )}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div>
            <h4 className="font-semibold mb-2 mt-3 text-gray-800 md:text-sm lg:text-md">
              Available Size
            </h4>
            <div className="flex flex-wrap gap-2 text-sm">
              {Array.isArray(productData?.productVarient) &&
              productData.productVarient.length > 0 ? (
                productData.productVarient.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(variant?.size)}
                    className={`border px-3 py-1.5 rounded-md transition-colors duration-200 cursor-pointer ${
                      selectedSize === variant?.size
                        ? "bg-red-600 text-white border-red-600"
                        : "text-gray-800 border-gray-300 hover:border-red-600 hover:text-red-600"
                    }`}
                  >
                    {variant?.size ?? "—"}
                  </button>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No sizes available
                </span>
              )}
            </div>
          </div>

          {/* Mobile & Tablet View: Quantity + Add to Cart */}
          <div className="mt-6 md:mt-8 flex items-center gap-3 lg:hidden">
            <div className="w-36 h-11 flex justify-between items-center border rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(q > 1 ? q - 1 : 1))}
                className="px-4 h-full text-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="text-lg">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 h-full text-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleSelect()} // mobile add to cart uses handleSelect
              className="w-36 h-11 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 font-semibold text-sm md:text-base cursor-pointer"
            >
              Add to Cart
            </button>
          </div>

          {/* Desktop View: Quantity (read-only) + Add to Cart */}
          <div className="hidden lg:flex items-center gap-2 mt-6">
            <div className="flex items-center border rounded overflow-hidden px-2 py-1">
              <button
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                className="text-xl px-2 text-red-900 hover:bg-gray-200 transition font-bold cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-lg text-gray-700 px-4 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-xl px-2 text-green-900 hover:bg-gray-200 transition font-bold cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleSelect()} // desktop add to cart
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Payment Summary for Mobile/Tablet (Visible below 1024px) */}
      <div className="block lg:hidden mt-6">
        <ProductDetailPayment
          productData={productData}
          onAddToCart={onAddToCart}
        />
      </div>

      {/* Tabs Section */}
      <div className="mt-10 bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-sm sm:text-base font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Description" && (
          <p className="text-black text-sm leading-6">
            {productData?.productDescription ?? "No description available."}
          </p>
        )}

        {activeTab === "Specifications" && (
          <>
            {productData?.productCategory === "Apparel" && (
              <div>
                <p>Brand: {productData?.productBrand ?? "—"}</p>
                <p>Material: {productData?.material ?? "—"}</p>
                <p>Gender: {productData?.gender ?? "—"}</p>
                <p>Fit: {productData?.fit ?? "—"}</p>

                <p>Care Instructions:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {Array.isArray(productData?.careInstructions) &&
                  productData.careInstructions.length > 0 ? (
                    productData.careInstructions.map((care, index) => (
                      <li key={index}>{care}</li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </ul>
              </div>
            )}

            {productData?.productCategory === "Equipment" && (
              <div>
                <p>Weight: {productData?.weight ?? "5kg"}</p>
                <p>Material: {productData?.material ?? "Steel & Rubber"}</p>
              </div>
            )}

            {productData?.productCategory === "Nutrition" && (
              <div>
                <p>Brand: {productData?.productBrand ?? "—"}</p>
                <p>Protein: {productData?.protein ?? "—"}</p>
                <p>Calories: {productData?.calories ?? "—"}</p>
                <p>Serving Size: {productData?.servingSize ?? "—"}</p>
                <p>Carbs: {productData?.carbs ?? "—"}</p>
                <p>Fat: {productData?.fat ?? "—"}</p>

                <p>Ingredients:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {Array.isArray(productData?.ingredients) &&
                  productData.ingredients.length > 0 ? (
                    productData.ingredients.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </ul>

                <p>Allergens:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {Array.isArray(productData?.allergens) &&
                  productData.allergens.length > 0 ? (
                    productData.allergens.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </ul>
              </div>
            )}
          </>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-6">
            {/* Display existing reviews */}
            <div className="space-y-4">
              {feedback?.feedbacks?.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              ) : (
                feedback?.feedbacks?.map((review) => (
                  <div key={review._id} className="border-b pb-2">
                    <div className="flex items-center mb-1">
                      <div className="text-yellow-500 text-sm">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <span className="text-gray-400 text-xs ml-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-black text-sm">{review.comment}</p>

                    {review.feedbackImage?.length > 0 && (
                      <div className="flex mt-1 space-x-2">
                        {review.feedbackImage.map((img, idx) => (
                          <img
                            key={idx}
                            src={img.url || img}
                            alt={`Feedback ${idx + 1}`}
                            className="w-15 h-15 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Review Submission Form */}
            <div className=" pt-3">
              <h3 className="text-sm font-semibold mb-2">Leave a Review</h3>

              {/* Star Rating */}
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="text-xl focus:outline-none cursor-pointer"
                  >
                    {star <= newRating ? "★" : "☆"}
                  </button>
                ))}
              </div>

              {/* Comment Box */}
              <textarea
                rows={3}
                className="w-full p-2 border rounded mb-2 text-sm"
                placeholder="Write your reviews..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />

              {/* Image Upload */}
              <div className="flex items-center gap-2 mb-4">
                <label
                  htmlFor="imageUpload"
                  className="px-1 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm cursor-pointer"
                >
                  + Add Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {selectedImages.length > 0 && (
                  <span className="text-xs text-gray-600">
                    {selectedImages.length} file(s) selected
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleReviewSubmit}
                className="bg-black text-white text-sm px-2 py-1 rounded hover:bg-gray-800 cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Related Products
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {reletedProduct.map((item, idx) => (
            <Link to={`/productDetail/${item._id}`} key={idx}>
              <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                <img
                  src={item?.productImages?.[0].url}
                  alt={`Related Product ${idx + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="text-sm font-semibold mt-2">
                  {item?.productName}
                </h4>
                <p className="text-red-600 font-bold mt-1">
                  ₹{item?.productVarient[0]?.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

// import React, { useState, useRef, useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedItem } from '../../store/slice/selectedSlice';
// import { addItemToCart } from '../../store/slice/cartSlice';
// import { getMeDetails } from '../../store/slice/userSlice';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { createFeedback } from '../../store/slice/feedbackSlice';

// function ProductDetail({ productData = {}, reletedProduct, feedback, onCommentAdded,onAddToCart }) {
//   // console.log(feedback, "k")
//   const dispatch = useDispatch();
//   const { meDetails, loading: userLoading } = useSelector((state) => state.user);

//   const productImages = [
//     'https://www.100acress.com/amenities_image/basketball.webp',
//     'https://www.100acress.com/amenities_image/senior_citizen.webp',
//     'https://www.100acress.com/amenities_image/senior_citizen.webp',
//     'https://via.placeholder.com/300x200/FF0000',
//     'https://via.placeholder.com/300x200/00FF00',
//     'https://via.placeholder.com/300x200/0000FF',
//     'https://via.placeholder.com/300x200/FFFF00',
//     'https://via.placeholder.com/300x200/FF00FF',
//     'https://via.placeholder.com/300x200/00FFFF',
//   ];
// console.log(productData?.productImages
// ,"uigguih")
//   const [selected_Nutrition_flavor, setSelected_Nutrition_flavor] = useState(0)

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [selectedSize, setSelectedSize] = useState(null);
//   // console.log(selectedSize,"sddd")
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('Description');
//   const thumbnailContainerRef = useRef(null);
//   const [canScrollUp, setCanScrollUp] = useState(false);
//   const [canScrollDown, setCanScrollDown] = useState(false);

//   // Swipe logic
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   const minSwipeDistance = 50;

//   // reviews adding
//   const [newComment, setNewComment] = useState("");
//   const [newRating, setNewRating] = useState(0);
//   const [selectedImages, setSelectedImages] = useState([]);
//   // for review
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages(files);
//   };

//   const handleReviewSubmit = () => {
//     if(!meDetails){
//       return toast.warning("Login before Comment")
//     }
//     if (!newComment.trim() || newRating === 0) {
//       alert("Please add a rating and comment.");
//       return;
//     }

//     // Create FormData if sending images to server
//     const formData = new FormData();
//     formData.append("comment", newComment);
//     formData.append("rating", newRating);
//     formData.append("productId", productData?._id);
//     selectedImages.forEach((file) => {
//       formData.append("feedbackImage", file); // note: name must match multer field name
//     });

//     // Submit the review (mocked or API call)
//     dispatch(createFeedback(formData))
//     // setReviews(prev => [reviewData, ...prev]);
//     onCommentAdded()
//     toast.success("Your FeedBack Added")
//     // Clear form
//     setNewComment("");
//     setNewRating(0);
//     setSelectedImages([]);
//   };

//   const onTouchStart = (e) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches?.[0]?.clientX || null);
//   };
//   const onTouchMove = (e) => setTouchEnd(e.targetTouches?.[0]?.clientX || null);
//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;

//     if (isLeftSwipe) {
//       setCurrentSlide((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
//     } else if (isRightSwipe) {
//       setCurrentSlide((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
//     }

//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   // Thumbnail scroll state (desktop)
//   useEffect(() => {
//     const container = thumbnailContainerRef.current;
//     if (!container) return;

//     const handleScrollState = () => {
//       if (window.innerWidth < 768) {
//         setCanScrollUp(false);
//         setCanScrollDown(false);
//         return;
//       }
//       const { scrollHeight, clientHeight, scrollTop } = container;
//       const hasScroll = scrollHeight > clientHeight;
//       setCanScrollUp(hasScroll && scrollTop > 0);
//       setCanScrollDown(hasScroll && scrollTop < scrollHeight - clientHeight - 1);
//     };

//     container.addEventListener('scroll', handleScrollState);
//     window.addEventListener('resize', handleScrollState);
//     const timer = setTimeout(handleScrollState, 200);

//     return () => {
//       clearTimeout(timer);
//       container.removeEventListener('scroll', handleScrollState);
//       window.removeEventListener('resize', handleScrollState);
//     };
//   }, [productImages]);

//   const handleThumbnailScroll = (direction) => {
//     if (thumbnailContainerRef.current) {
//       const scrollAmount = 240; // 4 items approx
//       thumbnailContainerRef.current.scrollBy({ top: direction === 'down' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Auto-select first available size when productData loads
//   useEffect(() => {
//     const variants = productData?.productVarient;
//     if (Array.isArray(variants) && variants.length > 0 && !selectedSize) {
//       setSelectedSize(variants[0]?.size ?? null);
//     }
//   }, [productData, selectedSize]);

//   // Robust handleSelect: works for mobile & desktop, handles undefineds, quantity, fallback
//   // const {addCart,loading,error}=useSelector((state)=>state?.cart)

//   let addCartLoading = false
//   const{addCart,loaading,error}=useSelector((state)=>state.cart)
//   const handleSelect = (sizeArg = null) => {
//   if (!meDetails) {
//     toast.warning("Login first!");
//     return;
//   }
//     addCartLoading = true
//     const variants = Array.isArray(productData?.productVarient) ? productData.productVarient : [];

//     // If there are variants, prefer: sizeArg -> selectedSize -> first variant size
//     const sizeToUse =
//       sizeArg ??
//       selectedSize ??
//       (variants.length > 0 ? variants[0]?.size ?? null : null) ??
//       productData?.size ??
//       null;

//     // Find matching variant (if any)
//     let selectedVariant = variants.find((v) => v?.size === sizeToUse);

//     // Fallback to first variant if none matched and variants exist
//     if (!selectedVariant && variants.length > 0) {
//       selectedVariant = variants[0];
//     }

//     // Final fallbacks for price and color
//     const finalPrice = selectedVariant?.price ?? productData?.price ?? 0;
//     const finalColor =
//       Array.isArray(selectedVariant?.color) ? selectedVariant.color :
//         selectedVariant?.color ? [selectedVariant.color] :
//           Array.isArray(productData?.color) ? productData.color :
//             [];

//     const payload = {
//       productId: productData?._id ?? null, // included (may be null if source lacks it)
//       productName: productData?.productName ?? 'Unknown Product',
//       category: productData?.productCategory ?? null,
//       size: sizeToUse ?? null,        // always present (maybe null)
//       color: finalColor,             // always present as array
//       flavor: selectedVariant?.flavor ?? productData?.flavor ?? '',
//       price: finalPrice,             // always present (fallback 0)
//       // originalPrice: intentionally removed
//       discount: selectedVariant?.discount ?? productData?.discount ?? null,
//       quantity: quantity ?? 1,

//     };

//     // Dispatch the payload
//     dispatch(addItemToCart(payload));
//     if(addCart?.status){
//     addCartLoading = false;
//     onAddToCart()
//     toast.success('Item successfully added to your cart.');
//     }

//   };

//   const tabs = ['Description', 'Specifications', 'Reviews'];

//   return (
//     <div className="p-4 md:p-5 px-between-480-768">
//       {/* Product Card */}
//       <div className="flex flex-col md:flex-row gap-5 bg-white shadow-md rounded-lg py-4 px-6 md:p-4 card-px-between-480-768">
//         {/* Images Section (Left on Desktop) */}
//         <div className="md:w-1/2 lg:w-7/12">
//           {/* Mobile Slider */}
//           <div className="relative md:hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
//             <div className="overflow-hidden rounded-lg">
//               <div
//                 className="flex transition-transform duration-300 ease-in-out"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 {productData?.productImages.map((img, idx) => (
//                   <div key={idx} className="w-full flex-shrink-0">
//                     <img src={img?.url} alt={`Product image ${idx + 1}`} className="w-full h-[300px] object-cover" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Dots */}
//             <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
//               {productData?.productImages.map((_, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => setCurrentSlide(idx)}
//                   className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-4 bg-red-600' : 'bg-gray-300'}`}
//                   aria-label={`Go to slide ${idx + 1}`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Desktop View */}
//           <div className="hidden md:grid grid-cols-[auto_1fr] gap-4 card-px-between-480-768">
//             {/* Thumbnails */}
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={() => handleThumbnailScroll('up')}
//                 className={`mb-2 transition-opacity duration-200 ${canScrollUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                 disabled={!canScrollUp}
//                 aria-label="Scroll thumbnails up"
//               >
//                 <svg className="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
//               </button>
//               <div ref={thumbnailContainerRef} className="flex flex-col gap-3 overflow-y-auto scroll-smooth scrollbar-hide h-[288px]">
//                 {productData?.productImages.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img?.url}
//                     alt={`Thumbnail ${idx + 1}`}
//                     className={`w-12 h-12 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${currentSlide === idx ? 'border-red-600' : 'border-gray-300'}`}
//                     onClick={() => setCurrentSlide(idx)}
//                   />
//                 ))}
//               </div>
//               <button
//                 onClick={() => handleThumbnailScroll('down')}
//                 className={`mt-2 transition-opacity duration-200 ${canScrollDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                 disabled={!canScrollDown}
//                 aria-label="Scroll thumbnails down"
//               >
//                 <svg className="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//               </button>
//             </div>
//             {/* Main Image */}
//             <div>
//               <img src={productData?.productImages[currentSlide]?.url} alt="Main Product" className="w-full h-auto md:aspect-[4/5] object-cover rounded-lg" />
//             </div>
//           </div>
//         </div>

//         {/* Details Section (Right on Desktop) */}
//         <div className="md:w-1/2 lg:w-5/12 space-y-4 card-px-between-480-768">
//           <h2 className="md:text-lg lg:text-2xl font-bold text-gray-800 ">{productData?.productName ?? 'Product'}</h2>

//           {/* Price (shows for selected size) */}
//           <div className="flex items-center gap-4">
//             {Array.isArray(productData?.productVarient) && productData.productVarient.map((variant, index) => (
//               <React.Fragment key={index}>
//                 {selectedSize === variant?.size && (
//                   <>
//                     <p className="text-red-600 md:text-sm lg:text-lg font-bold">₹{variant?.price ?? '0'}</p>
//                     <p className="text-gray-500 line-through md:text-md lg:text-lg">₹{variant?.originalPrice ?? '—'}</p>
//                     <p className="text-green-600 font-semibold md:text-md lg:text-lg">({variant?.discount ?? '0%'} OFF)</p>
//                   </>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Color / Flavors */}
//           {productData?.productCategory === "Apparel" && (
//             <div>
//               <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">Color</h4>
//               <div className="flex gap-3">
//                 {productData?.productVarient?.find((el) => el.size === selectedSize)?.color?.map((color, index) => (
//                   <button key={index} className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: (color || '').toLowerCase() }} title={color}></button>
//                 )) ?? <span className="text-sm text-gray-500">No colors</span>}
//               </div>
//             </div>
//           )}

//     {productData?.productCategory === "Nutrition" && (
//   <div>
//     <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">Flavors</h4>
//     <div className="flex gap-3">
//       {(Array.isArray(
//           productData?.productVarient?.find((el) => el.size === selectedSize)?.flavor
//         )
//           ? productData.productVarient.find((el) => el.size === selectedSize)?.flavor
//           : productData?.productVarient?.find((el) => el.size === selectedSize)?.flavor
//           ? [productData?.productVarient?.find((el) => el.size === selectedSize)?.flavor]
//           : []
//       ).map((flavor, index) => (
//         <button
//           key={index}
//           onClick={() => setSelected_Nutrition_flavor(index)}
//           className={`border px-3 py-1 rounded text-sm hover:border-red-600
//           ${selected_Nutrition_flavor === index ? 'bg-red-500 text-white border-red-600' : ''}`}
//         >
//           {flavor ?? '—'}
//         </button>
//       ))}
//     </div>
//   </div>
// )}

//           {productData?.productCategory === "Equipment" && (
//             <div>
//               <h4 className="font-semibold mb-2 text-gray-800 md:text-sm lg:text-md">Color</h4>
//               <div className="flex gap-3">
//                 {productData?.productVarient?.find((el) => el.size === selectedSize)?.color?.map((color, index) => (
//                   <button key={index} className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: (color || '').toLowerCase() }} title={color}></button>
//                 )) ?? <span className="text-sm text-gray-500">No colors</span>}
//               </div>
//             </div>
//           )}

//           {/* Sizes */}
//           <div>
//             <h4 className="font-semibold mb-2 mt-3 text-gray-800 md:text-sm lg:text-md">Available Size</h4>
//             <div className="flex flex-wrap gap-2 text-sm">
//               {Array.isArray(productData?.productVarient) && productData.productVarient.length > 0
//                 ? productData.productVarient.map((variant, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedSize(variant?.size)}
//                     className={`border px-3 py-1.5 rounded-md transition-colors duration-200 ${selectedSize === variant?.size
//                       ? 'bg-red-600 text-white border-red-600'
//                       : 'text-gray-800 border-gray-300 hover:border-red-600 hover:text-red-600'
//                       }`}
//                   >
//                     {variant?.size ?? '—'}
//                   </button>
//                 ))
//                 : <span className="text-sm text-gray-500">No sizes available</span>
//               }
//             </div>

//           </div>

//           {/* Mobile & Tablet View: Quantity + Add to Cart */}
//           <div className="mt-6 md:mt-8 flex items-center gap-3 lg:hidden">
//             <div className="w-36 h-11 flex justify-between items-center border rounded overflow-hidden">
//               <button onClick={() => setQuantity((q) => Math.max(q > 1 ? q - 1 : 1))} className="px-4 h-full text-lg text-gray-700 hover:bg-gray-100" aria-label="Decrease quantity">-</button>
//               <div className="text-lg">{quantity}</div>
//               <button onClick={() => setQuantity((q) => q + 1)} className="px-4 h-full text-lg text-gray-700 hover:bg-gray-100" aria-label="Increase quantity">+</button>
//             </div>

//             <button
//               onClick={() => handleSelect()} // mobile add to cart uses handleSelect
//               className="w-36 h-11 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 font-semibold text-sm md:text-base"
//             >
//             Add to Cart
//             </button>
//           </div>

//           {/* Desktop View: Quantity (read-only) + Add to Cart */}
//           <div className="hidden lg:flex items-center gap-2 mt-6">
//             <div className="flex items-center border rounded overflow-hidden px-2 py-1">
//               <button
//                 onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
//                 className="text-xl px-2 text-red-900 hover:bg-gray-200 transition font-bold"
//                 aria-label="Decrease quantity"
//               >
//                 -
//               </button>
//               <span className="text-lg text-gray-700 px-4 font-semibold">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(q => q + 1)}
//                 className="text-xl px-2 text-green-900 hover:bg-gray-200 transition font-bold"
//                 aria-label="Increase quantity"
//               >
//                 +
//               </button>
//             </div>
//             <button
//               onClick={() => handleSelect()} // desktop add to cart
//               className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tabs Section */}
//       <div className="mt-10 bg-white shadow-md rounded-lg p-6">
//         <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 mb-4">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`py-2 text-sm sm:text-base font-semibold transition-colors duration-200 ${activeTab === tab ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {activeTab === "Description" && <p className="text-black text-sm leading-6">{productData?.productDescription ?? 'No description available.'}</p>}

//         {activeTab === "Specifications" && (
//           <>
//             {productData?.productCategory === "Apparel" && (
//               <div>
//                 <p>Brand: {productData?.productBrand ?? '—'}</p>
//                 <p>Material: {productData?.material ?? '—'}</p>
//                 <p>Gender: {productData?.gender ?? '—'}</p>
//                 <p>Fit: {productData?.fit ?? '—'}</p>

//                 <p>Care Instructions:</p>
//                 <ul className="list-disc list-inside text-sm text-gray-700">
//                   {Array.isArray(productData?.careInstructions) && productData.careInstructions.length > 0 ? productData.careInstructions.map((care, index) => <li key={index}>{care}</li>) : <li>—</li>}
//                 </ul>
//               </div>
//             )}

//             {productData?.productCategory === "Equipment" && (
//               <div>
//                 <p>Weight: {productData?.weight ?? '5kg'}</p>
//                 <p>Material: {productData?.material ?? 'Steel & Rubber'}</p>
//               </div>
//             )}

//             {productData?.productCategory === "Nutrition" && (
//               <div>
//                 <p>Brand: {productData?.productBrand ?? '—'}</p>
//                 <p>Protein: {productData?.protein ?? '—'}</p>
//                 <p>Calories: {productData?.calories ?? '—'}</p>
//                 <p>Serving Size: {productData?.servingSize ?? '—'}</p>
//                 <p>Carbs: {productData?.carbs ?? '—'}</p>
//                 <p>Fat: {productData?.fat ?? '—'}</p>

//                 <p>Ingredients:</p>
//                 <ul className="list-disc list-inside text-sm text-gray-700">
//                   {Array.isArray(productData?.ingredients) && productData.ingredients.length > 0 ? productData.ingredients.map((i, idx) => <li key={idx}>{i}</li>) : <li>—</li>}
//                 </ul>

//                 <p>Allergens:</p>
//                 <ul className="list-disc list-inside text-sm text-gray-700">
//                   {Array.isArray(productData?.allergens) && productData.allergens.length > 0 ? productData.allergens.map((a, idx) => <li key={idx}>{a}</li>) : <li>—</li>}
//                 </ul>
//               </div>
//             )}
//           </>
//         )}

//         {activeTab === "Reviews" && (
//           <div className="space-y-6">
//             {/* Display existing reviews */}
//             <div className="space-y-4">
//               {feedback?.feedbacks?.length === 0 ? (
//                 <p className="text-gray-500 text-sm">No reviews yet.</p>
//               ) : (
//                 feedback?.feedbacks?.map((review) => (
//                   <div key={review._id} className="border-b pb-2">
//                     <div className="flex items-center mb-1">
//                       <div className="text-yellow-500 text-sm">
//                         {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
//                       </div>
//                       <span className="text-gray-400 text-xs ml-2">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <p className="text-black text-sm">{review.comment}</p>

//                     {review.feedbackImage?.length > 0 && (
//                       <div className="flex mt-1 space-x-2">
//                         {review.feedbackImage.map((img, idx) => (
//                           <img
//                             key={idx}
//                             src={img.url || img}
//                             alt={`Feedback ${idx + 1}`}
//                             className="w-15 h-15 object-cover rounded"
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Review Submission Form */}
//             <div className=" pt-3">
//               <h3 className="text-sm font-semibold mb-2">Leave a Review</h3>

//               {/* Star Rating */}
//               <div className="flex items-center mb-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setNewRating(star)}
//                     className="text-xl focus:outline-none"
//                   >
//                     {star <= newRating ? "★" : "☆"}
//                   </button>
//                 ))}
//               </div>

//               {/* Comment Box */}
//               <textarea
//                 rows={3}
//                 className="w-full p-2 border rounded mb-2 text-sm"
//                 placeholder="Write your reviews..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//               />

//               {/* Image Upload */}
//               <div className="flex items-center gap-2 mb-4">
//                 <label
//                   htmlFor="imageUpload"
//                   className="px-1 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm cursor-pointer"
//                 >
//                   + Add Image
//                 </label>
//                 <input
//                   id="imageUpload"
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//                 {selectedImages.length > 0 && (
//                   <span className="text-xs text-gray-600">
//                     {selectedImages.length} file(s) selected
//                   </span>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleReviewSubmit}
//                 className="bg-black text-white text-sm px-2 py-1 rounded hover:bg-gray-800"
//               >
//                 Submit Review
//               </button>
//             </div>
//           </div>
//         )}

//       </div>

//       {/* Related Products */}
//       <div className="mt-10">
//         <h3 className="text-xl font-bold mb-4 text-gray-800">Related Products</h3>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {reletedProduct.map((item, idx) => (
//             <Link to={`/productDetail/${item._id}`} key={idx}>
//               <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
//                 <img
//                   src={item.productImages?.[0]?.url || 'https://via.placeholder.com/300x200'}
//                   alt={item?.productName || "Product"}
//                   className="w-full h-40 object-cover rounded"
//                 />
//                 <h4 className="text-md font-semibold mt-2">{item?.productName}</h4>
//                 <p className="text-red-600 font-bold mt-1">₹{item?.productVarient[0]?.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

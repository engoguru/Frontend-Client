import React, { useState } from 'react';

function ProductDetail() {
  const productImages = [
    'https://www.100acress.com/amenities_image/basketball.webp',
    'https://www.100acress.com/amenities_image/senior_citizen.webp',
    'https://www.100acress.com/amenities_image/senior_citizen.webp',
  ];

  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <div className="p-4 md:p-10">
      {/* Product Card */}
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg p-6">
        {/* Left - Images */}
        <div className="md:w-1/2">
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="flex gap-3 mt-4">
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${mainImage === img ? 'border-red-600' : 'border-gray-300'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Awesome Product Name</h2>
          <div className="flex items-center gap-4">
            <p className="text-red-600 text-xl font-bold">₹1,499</p>
            <p className="text-gray-500 line-through">₹1,999</p>
            <p className="text-green-600 font-semibold">(25% OFF)</p>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-gray-800">Color</h4>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-red-600 border-2 border-gray-300 cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-blue-600 border-2 border-gray-300 cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-green-600 border-2 border-gray-300 cursor-pointer"></span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-1 mt-3">Size</h4>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className="border text-gray-800 border-gray-300 px-3 py-1 rounded hover:border-red-600"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-4 bg-red-600 text-gray-800 px-6 py-2 rounded hover:bg-red-700">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 bg-white shadow-md rounded-lg p-6">
        <div className="flex gap-6 border-b pb-2 mb-4">
          <button className="font-semibold text-gray-700 hover:text-red-600">Description</button>
          <button className="font-semibold text-gray-700 hover:text-red-600">Specifications</button>
          <button className="font-semibold text-gray-700 hover:text-red-600">Reviews</button>
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

import React from 'react'

function HomeFeature() {
  return (
    <>

<div className="w-full">
  {/* Header */}
  <div className="flex bg-red-100 border-b border-gray-500 justify-between items-center w-full py-4 px-2">
    <div>
      <p className="text-[21px] font-semibold text-black">Featured  Nutrition Products</p>
    </div>
    <div className="flex items-center space-x-2">
      <div className="bg-red-600 p-1 rounded-full">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="bg-red-600 p-1 rounded-full">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>

  {/* Responsive Product Grid */}
  <div className="w-full bg-whitesmoke-700 px-4 py-6">
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Product Card */}
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Product"
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-3">Product Name</h2>
          <p className="text-gray-600 text-sm mt-1">Short product description goes here.</p>
          <p className="text-red-600 font-bold mt-2">$29.99</p>
          <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  </div>
</div>



    </>
  )
}

export default HomeFeature
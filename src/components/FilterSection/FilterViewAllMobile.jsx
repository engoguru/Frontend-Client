import React, { useState } from 'react';

const FilterViewAllMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={toggleFilter}
        className="md:hidden bg-red-600 text-white px-4 py-2 rounded mb-4"
      >
        Filter & Sort
      </button>

      {/* Overlay / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-end">
          <div className="w-4/5 sm:w-2/3 bg-white p-6 h-full overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filter & Sort</h2>
              <button onClick={toggleFilter} className="text-red-600 font-bold text-xl">×</button>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Sort By</label>
              <select className="w-full border px-3 py-2 rounded">
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Repeat filters from desktop */}
            <div className="space-y-6 text-sm text-gray-700">

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>All</option>
                  <option>Apparel</option>
                  <option>Nutrition</option>
                  <option>Equipment</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block mb-1 font-medium">Price Range ($)</label>
                <div className="flex space-x-2">
                  <input type="number" placeholder="Min" className="w-1/2 border px-2 py-1 rounded" />
                  <input type="number" placeholder="Max" className="w-1/2 border px-2 py-1 rounded" />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block mb-1 font-medium">Brand</label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>All</option>
                  <option>Nike</option>
                  <option>Adidas</option>
                  <option>Puma</option>
                </select>
              </div>

              {/* Ratings */}
              <div>
                <label className="block mb-1 font-medium">Rating</label>
                {[5, 4, 3, 2, 1].map((star) => (
                  <label key={star} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{star} Stars & up</span>
                  </label>
                ))}
              </div>

              {/* Stock */}
              <div>
                <label className="block mb-1 font-medium">Availability</label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Discount */}
              <div>
                <label className="block mb-1 font-medium">Discount</label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>Any</option>
                  <option>10% or more</option>
                  <option>25% or more</option>
                  <option>50% or more</option>
                </select>
              </div>

              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterViewAllMobile;

// src/components/FilterViewAllDesktop.jsx
import React from 'react';

const FilterViewAllDesktop = () => {
  return (
    <aside className="w-full  bg-white shadow-lg p-6 rounded-md h-fit sticky top-20">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>

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

        {/* Rating */}
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>{star} Stars & up</span>
            </label>
          ))}
        </div>

        {/* Size */}
        <div>
          <label className="block mb-1 font-medium">Size</label>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button key={size} className="border px-2 py-1 rounded text-sm">{size}</button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block mb-1 font-medium">Color</label>
          <div className="flex flex-wrap gap-2">
            {['Red', 'Blue', 'Black', 'White'].map((color) => (
              <label key={color} className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{color}</span>
              </label>
            ))}
          </div>
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

        {/* Clear Button */}
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterViewAllDesktop;

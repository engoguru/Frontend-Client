// src/components/FilterViewAllDesktop.jsx
import React, { useState } from 'react';

const FilterViewAllDesktop = () => {
  const [minPrice, setMinPrice] = useState(250);
  const [maxPrice, setMaxPrice] = useState(750);
  const priceCap = 100;
  const maxRange = 1000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - priceCap);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + priceCap);
    setMaxPrice(value);
  };

  const handleMinInputChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxInputChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  return (
    <aside className="w-full bg-white shadow-lg p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">Filters</h2>

      <div className="space-y-6 text-sm text-gray-700">
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-left">Category</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
            <option>All</option>
            <option>Apparel</option>
            <option>Nutrition</option>
            <option>Equipment</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block mb-1 font-medium text-left">Price Range ($)</label>
          <div className="relative my-4 h-5">
            <div className="relative h-1 rounded-md bg-gray-200 mt-1">
              <div
                className="absolute h-1 rounded-md bg-red-600"
                style={{
                  left: `${(minPrice / maxRange) * 100}%`,
                  right: `${100 - (maxPrice / maxRange) * 100}%`
                }}
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max={maxRange}
              step="10"
              value={minPrice}
              onChange={handleMinChange}
              className="absolute top-0 w-full appearance-none h-3 bg-transparent z-10"
              style={{
                accentColor: '#dc2626',
                pointerEvents: 'auto',
              }}
            />
            <input
              type="range"
              min="0"
              max={maxRange}
              step="10"
              value={maxPrice}
              onChange={handleMaxChange}
              className="absolute top-0 w-full appearance-none h-3 bg-transparent z-10"
              style={{
                accentColor: '#dc2626',
                pointerEvents: 'auto',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <input type="number" value={minPrice} onChange={handleMinInputChange} className="w-20 border border-gray-300 px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-red-500" />
            <span className="text-gray-400">-</span>
            <input type="number" value={maxPrice} onChange={handleMaxInputChange} className="w-20 border border-gray-300 px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium text-left">Brand</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
            <option>All</option>
            <option>Nike</option>
            <option>Adidas</option>
            <option>Puma</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1 font-medium text-left">Rating</label>
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center space-x-2 cursor-pointer hover:text-red-600">
              <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
              <span className="flex items-center">
                {Array.from({ length: star }).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}{Array.from({ length: 5 - star }).map((_, i) => <span key={i} className="text-gray-300">★</span>)}
              </span>
            </label>
          ))}
        </div>

        {/* Size */}
        <div>
          <label className="block mb-1 font-medium text-left">Size</label>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button key={size} className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition">{size}</button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block mb-1 font-medium text-left">Color</label>
          <div className="flex flex-wrap gap-2">
            {['Red', 'Blue', 'Black', 'White', 'Green'].map((color) => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                <span>{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium text-left">Availability</label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
            <span>In Stock Only</span>
          </label>
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1 font-medium text-left">Discount</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
            <option>Any</option>
            <option>10% or more</option>
            <option>25% or more</option>
            <option>50% or more</option>
          </select>
        </div>

        {/* Clear Button */}
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterViewAllDesktop;

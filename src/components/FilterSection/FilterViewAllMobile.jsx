import React, { useState } from 'react';

const FilterViewAllMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  // State for all filters
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [brand, setBrand] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discount, setDiscount] = useState('Any');

  const priceGap = 50;
  const maxRange = 1000;

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const colorMap = {
    Red: '#dc2626',    // red-600
    Blue: '#2563eb',   // blue-600
    Black: '#000000',  // actual black
    White: '#ffffff',  // actual white
    Green: '#16a34a',  // green-600
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - priceGap);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + priceGap);
    setMaxPrice(value);
  };

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= maxPrice - priceGap) {
      setMinPrice(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxRange && value >= minPrice + priceGap) {
      setMaxPrice(value);
    }
  };

  return (
    <div className='text-left'>
      {/* Button */}
      <button
        onClick={toggleFilter}
        className="w-full md:hidden bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
      >
        Filter
      </button>

      {/* Overlay / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 flex justify-center items-center p-4"
          onClick={toggleFilter}
        >
          <div
            className="w-full max-w-[280px] bg-white p-4 rounded-lg overflow-y-auto shadow-lg max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={toggleFilter} className="text-red-600 font-bold text-xl">×</button>
            </div>

            {/* Repeat filters from desktop */}
            <div className="space-y-4 text-sm text-gray-700">

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center text-xs"
                >
                  <option>All</option>
                  <option>Apparel</option>
                  <option>Nutrition</option>
                  <option>Equipment</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block mb-1 font-medium">Price Range ($)</label>
                <div className="relative h-5 my-4">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full"
                    style={{
                      left: `${(minPrice / maxRange) * 100}%`,
                      right: `${100 - (maxPrice / maxRange) * 100}%`,
                    }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max={maxRange}
                    step="10"
                    value={minPrice}
                    onChange={handleMinChange}
                    className="absolute mt-0.75 w-full h-1 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxRange}
                    step="10"
                    value={maxPrice}
                    onChange={handleMaxChange}
                    className="absolute mt-0.75 w-full h-1 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinInputChange}
                    className="w-full sm:flex-1 border border-gray-300 px-2 py-0.5 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400 hidden sm:block">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxInputChange}
                    className="w-full sm:flex-1 border border-gray-300 px-2 py-0.5 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block mb-1 font-medium">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center text-xs"
                >
                  <option>All</option>
                  <option>Nike</option>
                  <option>Adidas</option>
                  <option>Puma</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block mb-1 font-medium">Size</label>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`border px-2 py-0 rounded text-xs transition-colors duration-150 ${isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-100'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block mb-1 font-medium">Color</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {Object.entries(colorMap).map(([name, colorValue]) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(name)}
                        onChange={() => handleColorToggle(name)}
                        className={`h-2.5 w-2.5 border-gray-300 rounded focus:ring-blue-500 ${name === 'White' ? 'border-gray-400' : ''}`}
                        style={{ accentColor: colorValue }}
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <label className="block mb-1 font-medium">Rating</label>
                {[5, 4, 3, 2, 1].map((star) => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(star)}
                      onChange={() => handleRatingToggle(star)}
                      className="h-2.5 w-2.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span>{star} Stars & up</span>
                  </label>
                ))}
              </div>

              {/* Stock */}
              <div>
                <label className="block mb-1 font-medium">Availability</label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-2.5 w-2.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Discount */}
              <div>
                <label className="block mb-1 font-medium">Discount</label>
                <select
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center text-xs"
                >
                  <option>Any</option>
                  <option>10% or more</option>
                  <option>25% or more</option>
                  <option>50% or more</option>
                </select>
              </div>

              <button className="mt-6 w-2/3 mx-auto block bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterViewAllMobile;

import React, { useState } from 'react';

const FilterViewAllDesktop = ({ onFilterChange }) => {
  const maxRange = 1000;
  const priceGap = 50;

  const [filters, setFilters] = useState({
    productName: '',
    productTags: [],
    productCategory: '',
    productBrand: '',
    servingSize: [],
    weight: '',
    material: '',
    gender: '',
    fit: '',
    color: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  // Min/Max Price Handlers
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= filters.maxPrice - priceGap) {
      updateFilter('minPrice', value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxRange && value >= filters.minPrice + priceGap) {
      updateFilter('maxPrice', value);
    }
  };

  // Size Toggle (servingSize)
  const handleSizeToggle = (size) => {
    const currentSizes = filters.servingSize.includes(size)
      ? filters.servingSize.filter((s) => s !== size)
      : [...filters.servingSize, size];
    updateFilter('servingSize', currentSizes);
  };

  // Color Toggle
  const handleColorToggle = (color) => {
    const currentColors = filters.color.includes(color)
      ? filters.color.filter((c) => c !== color)
      : [...filters.color, color];
    updateFilter('color', currentColors);
  };

  const colorMap = {
    Red: '#dc2626',
    Blue: '#2563eb',
    Black: '#000000',
    White: '#ffffff',
    Green: '#16a34a',
  };
console.log(filters,"filters");
  return (
    <aside className="w-full text-left bg-white shadow-lg p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">Filters</h2>

      <div className="space-y-6 text-sm text-gray-700">

        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium text-left">Product Name</label>
          <input
            type="text"
            onChange={(e) => updateFilter('productName', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Tags */}
        <div>
          <label className="block mb-1 font-medium text-left">Product Tags</label>
          <input
            type="text"
            placeholder="Comma-separated"
            onChange={(e) =>
              updateFilter('productTags', e.target.value.split(',').map(tag => tag.trim()))
            }
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-left">Category</label>
          <select
            onChange={(e) => updateFilter('productCategory', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center"
          >
            <option value="">All</option>
            <option>Apparel</option>
            <option>Nutrition</option>
            <option>Equipment</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium text-left">Brand</label>
          <select
            onChange={(e) => updateFilter('productBrand', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center"
          >
            <option value="">All</option>
            <option>Nike</option>
            <option>Adidas</option>
            <option>Puma</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="text-left">
          <label className="block mb-1 font-medium text-left">Price Range ($)</label>
          <div className="relative h-5 my-4">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full"
              style={{
                left: `${(filters.minPrice / maxRange) * 100}%`,
                right: `${100 - (filters.maxPrice / maxRange) * 100}%`,
              }}
            ></div>
            <input
              type="range"
              min="0"
              max={maxRange}
              step="10"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
              className="absolute w-full h-1 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
            />
            <input
              type="range"
              min="0"
              max={maxRange}
              step="10"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
              className="absolute w-full h-1 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between mt-2 gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
              className="w-full border border-gray-300 px-2 py-0.5 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-400 hidden lg:block">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
              className="w-full border border-gray-300 px-2 py-0.5 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block mb-1 font-medium text-left">Size</label>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
              const isSelected = filters.servingSize.includes(size);
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

        {/* Material */}
        <div>
          <label className="block mb-1 font-medium text-left">Material</label>
          <select
            onChange={(e) => updateFilter('material', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center"
          >
            <option value="">All</option>
            <option>Cotton</option>
            <option>Polyester</option>
            <option>Leather</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium text-left">Gender</label>
          <select
            onChange={(e) => updateFilter('gender', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center"
          >
            <option value="">All</option>
            <option>Men</option>
            <option>Women</option>
            <option>Unisex</option>
          </select>
        </div>

        {/* Fit */}
        <div>
          <label className="block mb-1 font-medium text-left">Fit</label>
          <select
            onChange={(e) => updateFilter('fit', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center"
          >
            <option value="">All</option>
            <option>Regular</option>
            <option>Slim</option>
            <option>Loose</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium text-left">Weight (g)</label>
          <input
            type="number"
            placeholder="Enter weight"
            onChange={(e) => updateFilter('weight', e.target.value)}
            className="w-full border border-gray-300 px-3 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block mb-1 font-medium text-left">Color</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(colorMap).map(([name, colorValue]) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.color.includes(name)}
                  onChange={() => handleColorToggle(name)}
                  className="h-2.5 w-2.5 border-gray-300 rounded focus:ring-blue-500"
                  style={{ accentColor: colorValue }}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            const reset = {
              productName: '',
              productTags: [],
              productCategory: '',
              productBrand: '',
              servingSize: [],
              weight: '',
              material: '',
              gender: '',
              fit: '',
              color: [],
              minPrice: 0,
              maxPrice: 1000,
            };
            setFilters(reset);
            onFilterChange(reset);
          }}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>

      </div>
    </aside>
  );
};

export default FilterViewAllDesktop;

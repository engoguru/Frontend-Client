import React, { useState } from 'react';

const FilterViewAllMobile = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    onFilterChange?.(updated);
  };

  const toggleFilter = () => setIsOpen((v) => !v);

  // Price handlers (same logic as desktop)
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

  // thumb-drag handlers (range inputs)
  const handleMinDrag = (e) => {
    const value = Math.min(Number(e.target.value), filters.maxPrice - priceGap);
    updateFilter('minPrice', value);
  };

  const handleMaxDrag = (e) => {
    const value = Math.max(Number(e.target.value), filters.minPrice + priceGap);
    updateFilter('maxPrice', value);
  };

  // Size toggle
  const handleSizeToggle = (size) => {
    const next = filters.servingSize.includes(size)
      ? filters.servingSize.filter((s) => s !== size)
      : [...filters.servingSize, size];
    updateFilter('servingSize', next);
  };

  // Color toggle
  const handleColorToggle = (color) => {
    const next = filters.color.includes(color)
      ? filters.color.filter((c) => c !== color)
      : [...filters.color, color];
    updateFilter('color', next);
  };

  const colorMap = {
    Red: '#dc2626',
    Blue: '#2563eb',
    Black: '#000000',
    White: '#ffffff',
    Green: '#16a34a',
  };

  const clearAll = () => {
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
    onFilterChange?.(reset);
  };

  // (Optional) active filter count for the button badge
  const activeCount = (() => {
    let c = 0;
    const f = filters;
    if (f.productName) c++;
    if (f.productTags.length) c++;
    if (f.productCategory) c++;
    if (f.productBrand) c++;
    if (f.servingSize.length) c++;
    if (f.weight) c++;
    if (f.material) c++;
    if (f.gender) c++;
    if (f.fit) c++;
    if (f.color.length) c++;
    if (f.minPrice !== 0 || f.maxPrice !== 1000) c++;
    return c;
  })();

  return (
    <div className="text-left">
      {/* Trigger */}
      <button
        onClick={toggleFilter}
        className="w-full md:hidden bg-blue-600 text-white px-4 py-1.5 rounded text-sm flex items-center justify-center gap-2"
      >
        Filter
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center text-xs bg-white text-blue-600 rounded-full px-2 py-0.5">
            {activeCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50"
          onClick={toggleFilter}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-[320px] bg-white p-4 rounded-l-xl shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={toggleFilter}
                className="text-red-600 font-bold text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              {/* Product Name */}
              <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                  type="text"
                  value={filters.productName}
                  onChange={(e) => updateFilter('productName', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Product Tags */}
              <div>
                <label className="block mb-1 font-medium">Product Tags</label>
                <input
                  type="text"
                  placeholder="Comma-separated"
                  value={filters.productTags.join(', ')}
                  onChange={(e) =>
                    updateFilter(
                      'productTags',
                      e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  value={filters.productCategory}
                  onChange={(e) => updateFilter('productCategory', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                >
                  <option value="">All</option>
                  <option>Apparel</option>
                  <option>Nutrition</option>
                  <option>Equipment</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block mb-1 font-medium">Brand</label>
                <select
                  value={filters.productBrand}
                  onChange={(e) => updateFilter('productBrand', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                >
                  <option value="">All</option>
                  <option>Nike</option>
                  <option>Adidas</option>
                  <option>Puma</option>
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
                      left: `${(filters.minPrice / maxRange) * 100}%`,
                      right: `${100 - (filters.maxPrice / maxRange) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxRange}
                    step="10"
                    value={filters.minPrice}
                    onChange={handleMinDrag}
                    className="absolute w-full h-1 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none
                               [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxRange}
                    step="10"
                    value={filters.maxPrice}
                    onChange={handleMaxDrag}
                    className="absolute w-full h-1 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none
                               [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={handleMinPriceChange}
                    className="w-full border border-gray-300 px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-full border border-gray-300 px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block mb-1 font-medium">Size</label>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                    const isSelected = filters.servingSize.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`border px-2 py-0.5 rounded text-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block mb-1 font-medium">Material</label>
                <select
                  value={filters.material}
                  onChange={(e) => updateFilter('material', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                >
                  <option value="">All</option>
                  <option>Cotton</option>
                  <option>Polyester</option>
                  <option>Leather</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => updateFilter('gender', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                >
                  <option value="">All</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>
              </div>

              {/* Fit */}
              <div>
                <label className="block mb-1 font-medium">Fit</label>
                <select
                  value={filters.fit}
                  onChange={(e) => updateFilter('fit', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                >
                  <option value="">All</option>
                  <option>Regular</option>
                  <option>Slim</option>
                  <option>Loose</option>
                </select>
              </div>

              {/* Weight */}
              <div>
                <label className="block mb-1 font-medium">Weight (g)</label>
                <input
                  type="number"
                  placeholder="Enter weight"
                  value={filters.weight}
                  onChange={(e) => updateFilter('weight', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block mb-1 font-medium">Color</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {Object.entries(colorMap).map(([name, colorValue]) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.color.includes(name)}
                        onChange={() => handleColorToggle(name)}
                        className={`h-3 w-3 border-gray-300 rounded focus:ring-blue-500 ${
                          name === 'White' ? 'border-gray-400' : ''
                        }`}
                        style={{ accentColor: colorValue }}
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsOpen(false)} // values are already synced via updateFilter
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterViewAllMobile;

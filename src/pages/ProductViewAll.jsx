
import React, { use, useEffect, useState } from 'react';
import FilterViewAllDesktop from '../components/FilterSection/FilterViewAllDesktop';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import FilterViewAllMobile from '../components/FilterSection/FilterViewAllMobile';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slice/productSlice';
import Pagination from '../components/Pagination/Pagination';

import { useLocation } from 'react-router-dom';

function ProductViewAll() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("default");
  const location = useLocation();
  // Inside your component:
const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const category = params.get('category');
   const subCategory
    = params.get('subCategory');
  const query = params.get('search')


  const { products, totalCount, totalPages, loading, error } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);


 
  useEffect(() => {

    dispatch(fetchProducts({ page: currentPage, limit: 10, sort, productCategory: category, search: query ,subCategory:subCategory})); // Provide default pagination params
  }, [dispatch, currentPage, sort, category, query,subCategory]);


  const handlefilterChange = (filter) => {


    dispatch(fetchProducts({ page: 1, limit: 10, ...filter })); // Provide default pagination params
      // Update URL query parameters
  const searchParams = new URLSearchParams(location.search);

  // Set or update each filter key
  Object.entries(filter).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });

  // Always reset page to 1 when filter changes
  searchParams.set('page', '1');
  searchParams.set('limit', '10');

  // Push updated URL
  navigate({
    pathname: location.pathname,
    search: `?${searchParams.toString()}`
  });

  }




  return (

    <div className='pt-4 text-center'>
      <NavbarTop />
      <NavbarBottom />
      {/* Main content wrapper with dynamic top padding for navbars */}
      <div className="w-full flex flex-col md:flex-row md:items-start px-6 pb-8 gap-6" style={{ paddingTop: 'calc(var(--navbar-height, 64px) + 1rem)' }}>

        {/* Sidebar for desktop */}
        <div className="hidden md:block md:w-1/5">
          <FilterViewAllDesktop onFilterChange={handlefilterChange} />
        </div>

        {/* Main Content */}
        <section className="w-full md:w-4/5">
          {/* Mobile Controls Header - Stacks below 320px, row above */}
          <div className="flex flex-col xxs:flex-row xxs:justify-between items-start gap-2 md:hidden mb-4 overflow-x-auto">
            <div className="flex-shrink-0">
              <FilterViewAllMobile onFilterChange={handlefilterChange}
              />
            </div>
            <div className="flex-shrink-0 flex justify-end items-center gap-2">
              <label htmlFor="sort-mobile" className="text-gray-600 font-medium text-sm">Sort by:</label>
              <select
                id="sort-mobile"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center accent-blue-600 w-24 min-w-[6rem]"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">All</h2>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-gray-600 font-medium">Sort by:</label>
              <select
                id="sort"
                value={sort}
                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center sm:w-32 md:w-40"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* {Array.from({ length: 30 }).map((_, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Product"
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-3">Product Name</h2>
                <p className="text-gray-600 text-sm mt-1">Short product description goes here.</p>
                <p className="text-red-600 font-bold mt-2">$29.99</p>
                <Link to="/productDetail/1" className="mt-3 block focus:outline-none">
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                    Buy Now
                  </button>
                </Link>
              </div>
            ))} */}

            {products?.map((product) => {
              const firstVariant = product.productVarient?.[0];
              const firstImage = product.productImages?.[0]?.url || 'https://via.placeholder.com/300x200';

              return (
                <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
                  <img
                    src={firstImage}
                    alt={product?.productName}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h2 className="text-lg font-semibold mt-3">{product?.productName}{firstVariant?.color}</h2>
                  <p className="text-gray-600 text-sm mt-1">{product?.productCategory}</p>
                  <p className="text-gray-600 text-sm mt-1">{product?.productDescription}</p>
                  <p className="text-red-600 font-bold mt-2">
                    ₹{firstVariant?.price ? firstVariant.price.toFixed(2) : 'N/A'}
                  </p>

                  <Link to={`/productDetail/${product._id}`}>
                    <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                      Buy Now
                    </button>
                  </Link>
                </div>
              );
            })}

          </div>
          <div className="w-full flex justify-center mt-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>

      {/* Main Content */}


      <FooterMain />
    </div>
  );
}

export default ProductViewAll;

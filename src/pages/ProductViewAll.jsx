
import React,{use, useEffect,useState} from 'react';
import FilterViewAllDesktop from '../components/FilterSection/FilterViewAllDesktop';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import FilterViewAllMobile from '../components/FilterSection/FilterViewAllMobile';
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchProducts } from '../store/slice/productSlice';

function ProductViewAll() {
 const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 20 })); // Provide default pagination params
  }, [dispatch]);

  console.log(products, "products");

  return (

    <div className='pt-4'>
      <NavbarTop />
      <NavbarBottom />
      {/* Main content wrapper with top padding for navbars and consistent horizontal padding */}
      <div className="w-full flex flex-col md:flex-row md:items-start px-6 pt-16 md:pt-28 pb-8 gap-6">

        {/* Sidebar for desktop */}
        <div className="hidden md:block md:w-1/5">
          <FilterViewAllDesktop />
        </div>

        {/* Main Content */}
        <section className="w-full md:w-4/5">
          {/* Mobile Controls Header */}
          <div className="flex flex-col gap-y-4 sm:flex-row sm:justify-between items-center md:hidden mb-4">
            <div className="w-auto">
              <FilterViewAllMobile />
            </div>
            <div className="w-auto flex justify-end items-center gap-2">
              <label htmlFor="sort-mobile" className="text-gray-600 font-medium text-sm">Sort by:</label>
              <select
                id="sort-mobile"
                className="border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center accent-blue-600"
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
                className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center accent-blue-600"
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

            {products.map((product) => {
        const firstVariant = product.productVarient?.[0];
        const firstImage = product.productImages?.[0]?.url || 'https://via.placeholder.com/300x200';

        return (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={firstImage}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-3">{product.productName}</h2>
            <p className="text-gray-600 text-sm mt-1">{product.productDescription}</p>
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
        </section>
      </div>

      {/* Main Content */}
     
  
      <FooterMain />
    </div>
  );
}

export default ProductViewAll;

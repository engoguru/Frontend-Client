// import React from 'react';
// import FilterViewAllDesktop from '../components/FilterSection/FilterViewAllDesktop';
// import NavbarTop from '../components/Navbar/NavbarTop';
// import NavbarBottom from '../components/Navbar/NavbarBottom';
// import FooterMain from '../components/Footer/FooterMain';

// function ProductViewAll() {
//   return (

//     <>
//     <NavbarTop />
//       <NavbarBottom />
//     <div className="w-full flex flex-col md:flex-row px-4 md:px-10 py-8 gap-6 pt-30">

//       {/* Filter Section */}
//       <FilterViewAllDesktop />

//       {/* Product Content Section */}
//       <section className="w-full md:w-3/4">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800">All</h2>
//           <div className="flex items-center gap-2">
//             <label htmlFor="sort" className="text-gray-600 font-medium">Sort by:</label>
//             <select
//               id="sort"
//               className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring"
//             >
//               <option value="default">Default</option>
//               <option value="low-to-high">Price: Low to High</option>
//               <option value="high-to-low">Price: High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-4">
//               <img
//                 src="https://via.placeholder.com/300x200"
//                 alt="Product"
//                 className="w-full h-40 object-cover rounded-md"
//               />
//               <h2 className="text-lg font-semibold mt-3">Product Name</h2>
//               <p className="text-gray-600 text-sm mt-1">Short product description goes here.</p>
//               <p className="text-red-600 font-bold mt-2">$29.99</p>
//               <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
//                 Buy Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>

//      <FooterMain />
//     </>
//   );
// }

// export default ProductViewAll;




import React from 'react';
import FilterViewAllDesktop from '../components/FilterSection/FilterViewAllDesktop';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import FilterViewAllMobile from '../components/FilterSection/FilterViewAllMobile';
import { Link } from 'react-router-dom';
function ProductViewAll() {
  return (

       <>
    <NavbarTop />
      <NavbarBottom />
    <div className="w-full flex flex-col md:flex-row px-4 md:px-10 py-8 gap-6">

      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <FilterViewAllDesktop />
      </div>

      {/* Main Content */}
      <section className="w-full md:w-3/4">
        {/* Mobile Filter Trigger */}
        <div className="block md:hidden">
          <FilterViewAllMobile />
        </div>

        {/* Header */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">All</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-gray-600 font-medium">Sort by:</label>
            <select
              id="sort"
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring"
            >
              <option value="default">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Product"
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-3">Product Name</h2>
              <p className="text-gray-600 text-sm mt-1">Short product description goes here.</p>
              <p className="text-red-600 font-bold mt-2">$29.99</p>
              <Link to="/productDetail/1">
              <button   className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Buy Now
              </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>

      <FooterMain />
    </>
  );
}

export default ProductViewAll;


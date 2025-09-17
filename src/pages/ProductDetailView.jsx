import React from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductDetailPayment from '../components/ProductDetailPage/ProductDetailPayment';


function ProductDetailView() {
  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      <main className="pt-16 md:pt-28">
        {/* Page container with max-width and centering */}
        <div className="max-w-[1200px] mx-auto">
          {/* Product Detail and Payment Card */}
          <div className="flex flex-col lg:flex-row items-start">
            {/* Left: Product Detail */}
            <div className="w-full lg:w-8/12">
              <ProductDetail />
            </div>

            {/* Right: Payment Card */}
            <div className="hidden lg:block w-full lg:w-4/12 p-4 md:p-5 lg:pl-2">
              <ProductDetailPayment />
            </div>
          </div>
        </div>
      </main>

      <FooterMain />
    </>
  );
}

export default ProductDetailView;

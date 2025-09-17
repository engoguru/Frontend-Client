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

      {/* Product Detail and Payment Card (Desktop View) */}
      <div className="w-full h-full flex-col flex-row flex justify-center items-start mt-20 ">
        {/* Left: Product Detail */}
        <div className="w-full md:w-8/12">
          <ProductDetail />
        </div>

        {/* Right: Payment Card */}
        <div className="hidden md:block md:w-4/12">
          <ProductDetailPayment />
        </div>
      </div>

      <FooterMain />
    </>
  );
}

export default ProductDetailView;

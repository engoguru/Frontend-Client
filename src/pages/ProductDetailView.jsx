import React,{useState,useEffect} from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductDetailPayment from '../components/ProductDetailPage/ProductDetailPayment';

import { useSelector,useDispatch } from 'react-redux';
import { fetchSingleProduct } from '../store/slice/productSlice';
import { useParams } from 'react-router-dom';
function ProductDetailView() {
const {id}=useParams()
const dispatch=useDispatch();

  const {singleProduct, loading,error } = useSelector((state) => state.product);
useEffect(()=>{
dispatch (fetchSingleProduct(id))
},[dispatch])

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
              <ProductDetail productData={singleProduct} />
            </div>

            {/* Right: Payment Card */}
            <div className="hidden lg:block w-full lg:w-4/12 p-4 md:p-5 lg:pl-2">
              <ProductDetailPayment productData={singleProduct}  />
            </div>
          </div>
        </div>
      </main>

      <FooterMain />
    </>
  );
}

export default ProductDetailView;

import React from 'react'
import NavbarTop from '../components/Navbar/NavbarTop'
import NavbarBottom from '../components/Navbar/NavbarBottom'
import FooterMain from '../components/Footer/FooterMain'
import ProductDetail from '../components/ProductDetailPage/ProductDetail'
import ProductDetailPayment from '../components/ProductDetailPage/ProductDetailPayment'

function ProductDetailView() {
  return (
    <>
    <NavbarTop/>
    <NavbarBottom/>
      {/* product detail and payment card */}
      <div className="w-full h-full flex justify-center items-center mt-20">
        <div className="w-7/10">
        <ProductDetail/>
        </div>
        <div className="3/10">
                <div className="">
                       <ProductDetailPayment/> 
                </div>
        </div>

      </div>




      {/* product specification */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="">

        </div>


      </div>
      {/* reletd product */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="">

        </div>
      </div>
      <FooterMain/>
    </>
  )

}

export default ProductDetailView
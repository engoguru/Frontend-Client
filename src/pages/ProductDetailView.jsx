import React, { useState, useEffect } from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductDetailPayment from '../components/ProductDetailPage/ProductDetailPayment';

import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from '../store/slice/productSlice';
import { useParams } from 'react-router-dom';

import { fetchRelatedProducts } from '../store/slice/productSlice';
import { fetchFeedbacks } from '../store/slice/feedbackSlice';
import { fetchCartByUserId } from '../store/slice/cartSlice';
function ProductDetailView() {
  const { id } = useParams()
  const dispatch = useDispatch();

  const  [reloadCart,setReloadCart]=useState(false)
  const { singleProduct, loading, error } = useSelector((state) => state.product);
   const { relatedProducts, loading:reledtedLoading, error:reletedError } = useSelector((state) => state.product);
   const{items,status,error:feedbackError}=useSelector((state)=>state?.feedback)
  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [id])



const loadFeedbacks = (productId) => {
  console.log("sgh")
  dispatch(fetchFeedbacks(productId));
};


const loadCart=()=>{
  
   dispatch(fetchCartByUserId());
   setReloadCart(true)
   console.log(reloadCart,"p")
}

useEffect(() => {
  if (singleProduct) {
    const { productCategory, _id } = singleProduct;

    if (productCategory) {
      dispatch(fetchRelatedProducts(productCategory));
    }
  if (_id) {
      loadFeedbacks(_id); // Use the named function here
    }
  }
}, [singleProduct, dispatch]);


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
              {loading  && reledtedLoading? (
                <p>Loading product...</p> // Or a spinner
              ) : error ? (
                <p>Error loading product</p>
              ) : (
                <ProductDetail productData={singleProduct} reletedProduct={relatedProducts} feedback={items}   onCommentAdded={() => loadFeedbacks(singleProduct._id)}   onAddToCart={()=>loadCart()}/>
              )}
            </div>

            {/* Right: Payment Card */}
            <div className="hidden lg:block w-full lg:w-4/12 p-4 md:p-5 lg:pl-2">
            
                {loading ? (
                <p>Loading product...</p> // Or a spinner
              ) : error ? (
                <p>Error loading product</p>
              ) : (
                 <ProductDetailPayment productData={singleProduct}  onAddToCart={reloadCart}/>
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterMain />
    </>
  );
}

export default ProductDetailView;

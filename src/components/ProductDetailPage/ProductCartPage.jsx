import React from 'react'
import NavbarTop from '../Navbar/NavbarTop'
import NavbarBottom from '../Navbar/NavbarBottom'
import FooterMain from '../Footer/FooterMain'
import ProductDetailPayment from './ProductDetailPayment'

function ProductCartPage() {
  return (
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <div className='mt-30 mb-2'>
<ProductDetailPayment/>
</div>
    <FooterMain/>
    </>
  )
}

export default ProductCartPage

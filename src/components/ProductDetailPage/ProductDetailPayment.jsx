// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCartByUserId } from '../../store/slice/cartSlice';
// import { Link } from 'react-router-dom';
// import { addItemToCart } from '../../store/slice/cartSlice';
// import { toast } from 'react-toastify';
// import { getMeDetails } from '../../store/slice/userSlice';
// function ProductDetailPayment() {
//   const dispatch = useDispatch();
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//  const { meDetails, loading:userLoading, error:userError } = useSelector((state) => state.user);
//   const { loading, error, cartItems } = useSelector((state) => state?.cart);
//   const { addCart, loading: addcartLoading, error: addcartError } = useSelector((state) => state?.cart)

//   // Extract items from cartItems safely
//   const items = cartItems?.cart?.items || [];
//   useEffect(() => {
//     if (addcartLoading === true) {
//       dispatch(fetchCartByUserId());
//     }
//   }, [addcartLoading]);
//   useEffect(() => {
//     dispatch(fetchCartByUserId());
//   }, [])



//   const cartHasItems = items.length > 0;

//   // Calculate subtotal from cart items
//   const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const shipping = 50;
//   const total = subtotal + shipping;

//   console.log(items,meDetails,"gjjt")
//   const handleOrderSubmit=(e)=>{
//     e.preventDefault();
//     const formData=new formData()
//     formData.append("userId",getMeDetails?.id);
//     formData.append()

//   }
//   return (
//     <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Payment Summary</h2>

//       {/* Cart Items Summary (Top Section) */}
//       {items.map((item, idx) => (
//         <div key={idx} className="flex items-center gap-4 border-b pb-4 mb-4">
//           <img
//             src={item?.image || "https://via.placeholder.com/80"}
//             alt={item?.productName || "Product"}
//             className="w-20 h-20 object-cover rounded"
//           />

//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-800">{item?.productName}</h3>
//             <p className="text-sm text-gray-500">
//               {item?.category || 'Category'} / {item?.flavor}
//             </p>
//             <p className="text-red-600 font-bold mt-1">₹{item?.price}</p>

//             {/* Quantity Controls */}
//             {/* Quantity Controls */}
//             <div className="flex items-center gap-2 mt-2">
//               <button
//                 onClick={() =>
//                   dispatch(
//                     addItemToCart({
//                       productId: item.productId,
//                       size: item.size,
//                       price: item.price,
//                       color: item.color,
//                       quantity: -1, // decrease by 1
//                       flavor: item.flavor,
//                       category: item.category,
//                       discount: item.discount,
//                       productName: item.productName,
//                     })
//                   )
//                 }
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 disabled={item.quantity <= 1}
//               >
//                 -
//               </button>

//               <span className="px-2">{item.quantity}</span>

//               <button
//                 onClick={() =>
//                   dispatch(
//                     addItemToCart({
//                       productId: item.productId,
//                       size: item.size,
//                       price: item.price,
//                       color: item.color,
//                       quantity: 1, // increase by 1
//                       flavor: item.flavor,
//                       category: item.category,
//                       discount: item.discount,
//                       productName: item.productName,
//                     })
//                   )
//                 }
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 +
//               </button>
//             </div>


//             {/* Remove Button */}
//             {/* Remove Button */}
//             <button
//               onClick={() => {
//                 dispatch(addItemToCart({
//                   productId: item.productId,
//                   size: item.size,
//                   price: item.price,
//                   color: item.color,
//                   quantity: -item.quantity,  // Negative quantity to remove
//                   flavor: item.flavor,
//                   category: item.category,
//                   discount: item.discount,
//                   productName: item.productName,
//                 }));

//                 toast.success('Item successfully removed from your cart.');
//               }}
//             >
//               <span className="mt-2 text-sm text-red-500 hover:underline font-bold">
//                 {addcartLoading === false && "Remove"}
//               </span>
//             </button>


//           </div>
//         </div>
//       ))}


//       {/* Price Breakdown */}
//       <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-700">
//         <div className="flex justify-between text-gray-800">
//           <span>Subtotal</span>
//           <span>₹{subtotal}</span>
//         </div>
//         <div className="flex justify-between text-gray-800">
//           <span>Shipping</span>
//           <span>₹{shipping}</span>
//         </div>
//         <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
//           <span>Total</span>
//           <span>₹{total}</span>
//         </div>
//       </div>

//       {/* Payment Method Selection */}
//       <div className="border-t border-gray-200 pt-4">
//         <h3 className="font-semibold mb-2 text-gray-800">Choose Payment Method</h3>
//         <div className="space-y-2 text-gray-800">
//           {['cod', 'upi', 'card'].map((method) => (
//             <label key={method} className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value={method}
//                 checked={paymentMethod === method}
//                 onChange={() => setPaymentMethod(method)}
//               />
//               <span className="capitalize">
//                 {method === 'cod' ? 'Cash on Delivery' : method === 'upi' ? 'UPI' : 'Credit/Debit Card'}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Proceed Button */}
//       <button
//         className={`w-full py-3 rounded font-semibold transition text-white ${cartHasItems ? 'bg-red-600 hover:bg-red-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         disabled={!cartHasItems}
//       >
//         Proceed to Pay ₹{total}
//       </button>

//       {/* Detailed Cart Items (Bottom Section) */}

//     </div>
//   );
// }

// export default ProductDetailPayment;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartByUserId, addItemToCart } from '../../store/slice/cartSlice';
import { createOrder } from '../../store/slice/orderSlice';
import { toast } from 'react-toastify';

function ProductDetailPayment() {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { meDetails } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const items = cartItems?.cart?.items || [];
  const cartHasItems = items.length > 0;
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  useEffect(() => {
    dispatch(fetchCartByUserId());
  }, [dispatch]);

  // ✅ Mock online payment function (simulate success)
  const handleOnlinePayment = async () => {
    toast.info("Redirecting to payment...");
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success("Payment successful!");
        resolve("MOCK_PAYMENT_ID_123456");
      }, 4000); // Simulate 2 seconds delay
    });
  };

  // ✅ Submit order to backend
const handleOrderSubmit = async (paymentId = null) => {
  if (!meDetails?.id || !Array.isArray(meDetails.address) || meDetails.address.length === 0) {
    toast.error("Delivery address is missing.");
    return;
  }

  const formattedItems = items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    size: item.size,
    price: item.price,
    color: item.color,
    flavor: item.flavor,
    discount: item.discount || 0
  }));

  const orderPayload = {
    userId: meDetails.id,
    items: formattedItems,
    totalPrice: total,
    orderStatus: 'Pending',
    paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Online',
    paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
    paymentId: paymentMethod === 'cod' ? null : paymentId,
    deliveryAddress: meDetails.address[0],
  };

  try {
    const response = await dispatch(createOrder(orderPayload));

    if (response.type !== 'order/createOrder/fulfilled') {
      throw new Error('Order failed');
    }

    toast.success('Order placed successfully!');

    // ✅ Clear all relevant fields/state after success
                     // Clear cart items
     // If you're using address selection
    // ... reset other state as needed

    // Optional: Navigate to success page
    // navigate('/order-success');

  } catch (error) {
    console.error(error);
    toast.error("Failed to place order.");
  }
};


  // ✅ Handle full flow on button click
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cartHasItems) {
      toast.error("Cart is empty.");
      return;
    }

    if (paymentMethod === 'cod') {
      handleOrderSubmit(); // COD → directly submit
    } else {
      const paymentId = await handleOnlinePayment(); // Simulate payment
      if (paymentId) {
        handleOrderSubmit(paymentId); // Place order after payment
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Payment Summary</h2>

      {/* Cart Items */}
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 border-b pb-4 mb-4">
          <img
            src={item?.image || "https://via.placeholder.com/80"}
            alt={item?.productName || "Product"}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{item?.productName}</h3>
            <p className="text-sm text-gray-500">{item?.category || 'Category'} / {item?.flavor}</p>
            <p className="text-red-600 font-bold mt-1">₹{item?.price}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => dispatch(addItemToCart({ ...item, quantity: -1 }))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={item.quantity <= 1}
              >-</button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => dispatch(addItemToCart({ ...item, quantity: 1 }))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >+</button>
            </div>
            <button
              onClick={() => {
                dispatch(addItemToCart({ ...item, quantity: -item.quantity }));
                toast.success('Item removed from cart.');
              }}
              className="mt-2 text-sm text-red-500 hover:underline font-bold"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between text-gray-800">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold mb-2 text-gray-800">Choose Payment Method</h3>
        <div className="space-y-2 text-gray-800">
          {['cod', 'upi', 'card'].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              <span className="capitalize">
                {method === 'cod' ? 'Cash on Delivery' : method === 'upi' ? 'UPI' : 'Credit/Debit Card'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handleCheckout}
        className={`w-full py-3 rounded font-semibold transition text-white ${cartHasItems ? 'bg-red-600 hover:bg-red-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
          }`}
        disabled={!cartHasItems}
      >
        {paymentMethod === 'cod' ? `Place Order (COD) ₹${total}` : `Pay & Place Order ₹${total}`}
      </button>
    </div>
  );
}

export default ProductDetailPayment;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCartByUserId, addItemToCart } from '../../store/slice/cartSlice';
// import { createOrder } from '../../store/slice/orderSlice';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// function ProductDetailPayment({ onAddToCart }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const { meDetails } = useSelector((state) => state.user);
//   const { cartItems } = useSelector((state) => state.cart);

//   const items = cartItems?.cart?.items || [];
//   const cartHasItems = items.length > 0;

//   const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const shipping = 50;
//   const total = subtotal + shipping;

//   //  Fetch cart on mount and after order
//   useEffect(() => {
//     dispatch(fetchCartByUserId());
//   }, [dispatch]);
//   useEffect(() => {
//     dispatch(fetchCartByUserId());
//   }, [onAddToCart === true]);
//   //  Mock payment simulation
//   const handleOnlinePayment = () => {
//     toast.info("Redirecting to payment...");
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         toast.success("Payment successful!");
//         resolve("MOCK_PAYMENT_ID_123456");
//       }, 4000);
//     });
//   };

//   //  Submit order
//   const handleOrderSubmit = async (paymentId = null) => {
//     if (!meDetails?._id || !Array.isArray(meDetails?.address) || meDetails.address.length === 0) {
//       toast.error("Delivery address is missing.");
//       return;
//     }

//     const formattedItems = items.map(item => ({
//       productId: item.productId,
//       quantity: item.quantity,
//       size: item.size,
//       price: item.price,
//       color: item.color,
//       flavor: item.flavor,
//       discount: item.discount || 0,
//     }));

//     const orderPayload = {
//       userId: meDetails._id,
//       items: formattedItems,
//       totalPrice: total,
//       orderStatus: 'Pending',
//       paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Online',
//       paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
//       paymentId: paymentMethod === 'cod' ? null : paymentId,
//       deliveryAddress: meDetails.address[0],
//     };

//     try {
//       const response = await dispatch(createOrder(orderPayload));

//       if (response.type !== 'order/createOrder/fulfilled') {
//         throw new Error('Order failed');
//       }

//       toast.success('Order placed successfully!');

//       // ✅ Clear cart items
//       for (const item of items) {
//         await dispatch(addItemToCart({ ...item, quantity: -item.quantity }));
//       }

//       // ✅ Refresh cart after clearing
//       dispatch(fetchCartByUserId());
//       // items null
//       // items=null
//       navigate('/user/order')
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to place order.");
//     }
//   };

//   //  Full checkout handler
//   const handleCheckout = async (e) => {
//     e.preventDefault();

//     if (!cartHasItems) {
//       toast.error("Cart is empty.");
//       return;
//     }

//     if (paymentMethod === 'cod') {
//       await handleOrderSubmit();
//     } else {
//       const paymentId = await handleOnlinePayment();
//       if (paymentId) {
//         await handleOrderSubmit(paymentId);
//       }
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Payment Summary</h2>

//       {/*  Cart Items */}
//       {items.map((item, idx) => (
//         <div key={idx} className="flex items-center gap-4 border-b pb-4 mb-4">
//           <img
//             src={item.productImages || "https://via.placeholder.com/80"}
//             alt={item.productName || "Product"}
//             className="w-20 h-20 object-cover rounded"
//           />
//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-800">{item.productName}</h3>
//             <p className="text-sm text-gray-500">{item.category || 'Category'} / {item.flavor}</p>
//             <p className="text-red-600 font-bold mt-1">₹{item.price}</p>

//             {/* Quantity Controls */}
//             <div className="flex items-center gap-2 mt-2">
//               <button
//                 onClick={async () => {
//                   await dispatch(addItemToCart({ ...item, quantity: -1 }));
//                   dispatch(fetchCartByUserId());
//                 }}
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 disabled={item.quantity <= 1}
//               >-</button>
//               <span className="px-2">{item.quantity}</span>
//               <button
//                 onClick={async () => {
//                   await dispatch(addItemToCart({ ...item, quantity: 1 }));
//                   dispatch(fetchCartByUserId());
//                 }}
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 +
//               </button>

//             </div>

//             {/* Remove Item */}
//             <button
//               onClick={() => {
//                 dispatch(addItemToCart({ ...item, quantity: -item.quantity }));
//                 toast.success('Item removed from cart.');
//               }}
//               className="mt-2 text-sm text-red-500 hover:underline font-bold"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* 💰 Price & Address */}
//       <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-700">

//         {/* Address */}
//         <div className="flex justify-between items-start text-gray-800">
//           <span className="font-medium">Address</span>
//           <div className="text-right space-y-1">
//             {meDetails?.address?.[0] ? (
//               <div>
//                 <p>{meDetails.address[0].name}</p>
//                 <p>{meDetails.address[0].phone}</p>
//                 <p>{meDetails.address[0].address_line1}</p>
//                 {meDetails.address[0].address_line2 && <p>{meDetails.address[0].address_line2}</p>}
//                 <p>
//                   {meDetails.address[0].city}, {meDetails.address[0].state} - {meDetails.address[0].pincode}
//                 </p>
//                 <p>{meDetails.address[0].country}</p>
//                 <p>Type: {meDetails.address[0].address_type}</p>
//               </div>
//             ) : (
//               <p>No address provided</p>
//             )}

//             <Link to="/user/address" className="text-blue-600 hover:underline text-sm">
//               {meDetails?.address[0] ? 'Change' : 'Add New Address'}
//             </Link>
//           </div>
//         </div>

//         {/* Pricing */}
//         {cartHasItems && (
//           <div className="space-y-2 pt-4 border-t border-gray-200">

//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal}</span>
//             </div>


//             <div className="flex justify-between" >
//               <span>Shipping</span>
//               <span>₹{shipping}</span>
//             </div>


//             <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-base text-gray-900">
//               <span>Total</span>
//               <span>₹{total}</span>
//             </div>

//           </div>
//         )}
//       </div>

//       {/* 💳 Payment Method */}
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

//       {/* 🧾 Checkout Button */}
//       <button
//         onClick={handleCheckout}
//         className={`w-full py-3 rounded font-semibold transition text-white ${cartHasItems ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
//         disabled={!cartHasItems}
//       >
//         {paymentMethod === 'cod' ? `Place Order (COD) ₹${total}` : `Pay & Place Order ₹${total}`}
//       </button>
//     </div>
//   );
// }

// export default ProductDetailPayment;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartByUserId, addItemToCart } from '../../store/slice/cartSlice';
import { createOrder } from '../../store/slice/orderSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCoupon,updateCoupon} from '../../store/slice/orderSlice';
function ProductDetailPayment({ onAddToCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { meDetails } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const {availableCoupon}=useSelector((state)=>state.order)

  const [orderbtn, setOrderbtn] = useState(true)

  const[isUserCoupon,setIsUserCoupon]=useState(false)

 const [selectedCoupon, setSelectedCoupon] = useState(null);
const [discountAmount, setDiscountAmount] = useState(0);


  const items = cartItems?.cart?.items || [];
  const cartHasItems = items.length > 0;

// console.log(availableCoupon,meDetails,"co")
  const subtotal = Math.floor(
    items.reduce((acc, item) =>
      acc + (item.price * (100 - item?.discount) / 100) * item.quantity,
      0)
  );

  const shipping = 50;
  const total = subtotal + shipping;

  //  Fetch cart on mount and after order
  useEffect(() => {
    dispatch(fetchCartByUserId());
    dispatch(getCoupon())
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCartByUserId());
  }, [onAddToCart === true]);

  // check coupon
const [matchedCoupons, setMatchedCoupons] = useState([]);


useEffect(() => {
  if (!availableCoupon || !meDetails?._id) return;

  const userId = meDetails._id;
  const matched = [];

  availableCoupon.forEach((coupon, index) => {
    // console.log("yt");
    if (coupon.allowedUsers.includes(userId)) {
      // console.log("yt2");
      matched.push({ index, coupon });
    }
  });

  setMatchedCoupons(matched);         // ✅ Store matched coupons in state
  setIsUserCoupon(matched.length > 0); // ✅ Update flag based on result

}, [availableCoupon, meDetails]);
const applyCoupon = (coupon) => {
  setSelectedCoupon(coupon);


  if (coupon.discountType === "percentage") {
    const discount = (subtotal * coupon.discountValue) / 100;
    setDiscountAmount(discount);
  } else if (coupon.discountType === "fixed") {
    setDiscountAmount(coupon.discountValue);
  }
};


 // check coupon end





  //  Mock payment simulation
  const handleOnlinePayment = () => {
    toast.info("Redirecting to payment...");
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success("Payment successful!");
        resolve("MOCK_PAYMENT_ID_123456");
      }, 4000);
    });
  };

  //  Submit order
  const handleOrderSubmit = async (paymentId = null) => {
    if (!meDetails?._id || !Array.isArray(meDetails?.address) || meDetails.address.length === 0) {
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
      discount: item.discount || 0,
    }));

    const orderPayload = {
      userId: meDetails._id,
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

      // ✅ Clear cart items
      for (const item of items) {
        await dispatch(addItemToCart({ ...item, quantity: -item.quantity }));
      }
      setOrderbtn(true)
      dispatch(updateCoupon(selectedCoupon?._id))
      // ✅ Refresh cart after clearing
      dispatch(fetchCartByUserId());
      // items null
      // items=null
      navigate('/user/order')
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  //  Full checkout handler
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cartHasItems) {
      toast.error("Cart is empty.");
      return;
    }
    setOrderbtn(false)
    if (paymentMethod === 'cod') {
      await handleOrderSubmit();
    } else {
      const paymentId = await handleOnlinePayment();
      if (paymentId) {
        await handleOrderSubmit(paymentId);
      }
    }
  };


  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Payment Summary</h2>

      {/*  Cart Items */}
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 border-b pb-4 mb-4">
          <img
            src={item?.productId?.productImages?.[0]?.url}
            alt={item.productName || "Product"}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{item.productName}</h3>
            <p className="text-sm text-gray-500">{item.category || 'Category'} / {item.flavor}</p>
            <p className="text-red-600 font-bold mt-1">₹{item.price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={async () => {
                  await dispatch(addItemToCart({ ...item, quantity: -1 }));
                  dispatch(fetchCartByUserId());
                }}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={item.quantity <= 1}
              >-</button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={async () => {
                  await dispatch(addItemToCart({ ...item, quantity: 1 }));
                  dispatch(fetchCartByUserId());
                }}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>

            </div>

            {/* Remove Item */}
            <button
              onClick={async () => {
                await dispatch(addItemToCart({ ...item, quantity: -item.quantity }));
                await dispatch(fetchCartByUserId());
                toast.success('Item removed from cart.');
              }}
              className="mt-2 text-sm text-red-500 hover:underline font-bold"
            >
              Remove
            </button>

          </div>
        </div>
      ))}


      {/* 💰 Price & Address */}
      <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-700">

        {/* Address */}
        <div className="flex justify-between items-start text-gray-800">
          <span className="font-medium">Address</span>
          <div className="text-right space-y-1">
            {meDetails?.address?.[0] ? (
              <div>
                <p>{meDetails.address[0].name}</p>
                <p>{meDetails.address[0].phone}</p>
                <p>{meDetails.address[0].address_line1}</p>
                {meDetails.address[0].address_line2 && <p>{meDetails.address[0].address_line2}</p>}
                <p>
                  {meDetails.address[0].city}, {meDetails.address[0].state} - {meDetails.address[0].pincode}
                </p>
                <p>{meDetails.address[0].country}</p>
                <p>Type: {meDetails.address[0].address_type}</p>
              </div>
            ) : (
              <p>No address provided</p>
            )}

            <Link to="/user/address" className="text-blue-600 hover:underline text-sm">
              {meDetails?.address[0] ? 'Change' : 'Add New Address'}
            </Link>
          </div>
        </div>

  {/* coupo */}
{/* Coupons */}
{matchedCoupons.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Apply Coupon:</h3>

    {matchedCoupons.map(({ coupon }, index) => (
      <div
        key={coupon._id}
        className="flex items-center mb-2 justify-between border px-3 py-2 rounded"
      >
        <div className="text-sm">
          <p className="font-medium">{coupon.code}</p>
          <p className="text-xs text-gray-500">
            {coupon.discountType === "percentage"
              ? `${coupon.discountValue}% off`
              : `₹${coupon.discountValue} off`}
          </p>
        </div>

        {selectedCoupon?._id === coupon._id ? (
          <button
            className="bg-green-500 text-white text-sm px-3 py-1 rounded cursor-default"
            disabled
          >
            Applied
          </button>
        ) : (
          <button
            onClick={() => applyCoupon(coupon)}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          >
            Save Extra
          </button>
        )}
      </div>
    ))}
  </div>
)}


        {/* Pricing */}
        {cartHasItems && (
          <div className="space-y-2 pt-4 border-t border-gray-200">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>


            <div className="flex justify-between" >
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>


            <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-base text-gray-900">
              <span>Total</span>
                 <span>₹{(subtotal - discountAmount + shipping).toFixed(2)}</span>
            </div>

          </div>
        )}
      </div>

      {/* 💳 Payment Method */}
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

      {/*  Checkout Button */}
      <button
        onClick={handleCheckout}
        className={`w-full py-3 rounded font-semibold transition text-white ${cartHasItems ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
        disabled={!cartHasItems}
      >
        {orderbtn === false
          ? "Processing..."
          : (paymentMethod === 'cod'
            ? `Place Order (COD) ₹${subtotal - discountAmount + shipping}`
            : `Pay & Place Order ₹${subtotal - discountAmount + shipping}`
          )
        }
      </button>
    </div>
  );
}

export default ProductDetailPayment;
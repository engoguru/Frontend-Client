import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartByUserId } from '../../store/slice/cartSlice';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../store/slice/cartSlice';

function ProductDetailPayment() {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const { loading, error, cartItems } = useSelector((state) => state?.cart);

  useEffect(() => {
    dispatch(fetchCartByUserId());
  }, [dispatch]);

  // Extract items from cartItems safely
  const items = cartItems?.cart?.items || [];

  const cartHasItems = items.length > 0;

  // Calculate subtotal from cart items
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Payment Summary</h2>

      {/* Cart Items Summary (Top Section) */}
    {items.map((item, idx) => (
  <div key={idx} className="flex items-center gap-4 border-b pb-4 mb-4">
    <img
      src={item?.image || "https://via.placeholder.com/80"}
      alt={item?.productName || "Product"}
      className="w-20 h-20 object-cover rounded"
    />

    <div className="flex-1">
      <h3 className="font-semibold text-gray-800">{item?.productName}</h3>
      <p className="text-sm text-gray-500">
        {item?.category || 'Category'} / {item?.flavor}
      </p>
      <p className="text-red-600 font-bold mt-1">₹{item?.price}</p>

      {/* Quantity Controls */}
   {/* Quantity Controls */}
<div className="flex items-center gap-2 mt-2">
  <button
    onClick={() =>
      dispatch(
        addItemToCart({
          productId: item.productId,
          size: item.size,
          price: item.price,
          color: item.color,
          quantity: -1, // decrease by 1
          flavor: item.flavor,
          category: item.category,
          discount: item.discount,
          productName: item.productName,
        })
      )
    }
    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
    disabled={item.quantity <= 1}
  >
    -
  </button>

  <span className="px-2">{item.quantity}</span>

  <button
    onClick={() =>
      dispatch(
        addItemToCart({
          productId: item.productId,
          size: item.size,
          price: item.price,
          color: item.color,
          quantity: 1, // increase by 1
          flavor: item.flavor,
          category: item.category,
          discount: item.discount,
          productName: item.productName,
        })
      )
    }
    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
  >
    +
  </button>
</div>


      {/* Remove Button */}
  {/* Remove Button */}
<button
  onClick={() => 
    dispatch(addItemToCart({
      productId: item.productId,
      size: item.size,
      price: item.price,
      color: item.color,
      quantity: -item.quantity,  // Negative quantity to remove
      flavor: item.flavor,
      category: item.category,
      discount: item.discount,
      productName: item.productName,
    }))
  }
  className="mt-2 text-sm text-red-500 hover:underline"
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
        className={`w-full py-3 rounded font-semibold transition text-white ${
          cartHasItems ? 'bg-red-600 hover:bg-red-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!cartHasItems}
      >
        Proceed to Pay ₹{total}
      </button>

      {/* Detailed Cart Items (Bottom Section) */}
 
    </div>
  );
}

export default ProductDetailPayment;

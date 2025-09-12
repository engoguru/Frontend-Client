import React, { useState } from 'react';

function ProductDetailPayment() {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const productPrice = 1499;
  const shipping = 50;
  const total = productPrice * quantity + shipping;

  return (
    <div className="max-w-xl mx-auto  bg-white shadow-lg rounded-lg p-6 space-y-6 leading-[83px]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h2>

      {/* Product Summary */}
      <div className="flex items-center gap-4">
        <img
          src="https://www.100acress.com/amenities_image/basketball.webp"
          alt="Product"
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-800">Product Name</h3>
          <p className="text-sm text-gray-500">Category / Short description</p>
          <p className="text-red-600 font-bold mt-1">₹{productPrice}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="font-medium text-gray-700">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-2 py-1 border rounded text-gray-800 hover:bg-gray-100"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-2 py-1 border  text-gray-800 rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between text-gray-800">
          <span>Subtotal</span>
          <span>₹{productPrice * quantity}</span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t text-gray-800">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2 text-gray-800">Choose Payment Method</h3>
        <div className="space-y-2 text-gray-800">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-2 text-gray-800">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
            />
            <span>UPI</span>
          </label>
          <label className="flex items-center gap-2 text-gray-800">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <span>Credit/Debit Card</span>
          </label>
        </div>
      </div>

      {/* Proceed Button */}
      <button className="w-full bg-red-600 
      
      

      
      
      
      
      py-3 rounded hover:bg-red-700 font-semibold transition text-gray-800">
        Proceed to Pay ₹{total}
      </button>
    </div>
  );
}

export default ProductDetailPayment;

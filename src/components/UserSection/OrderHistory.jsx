import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderGetByUser } from '../../store/slice/orderSlice';
import { getMeDetails } from '../../store/slice/userSlice';

function OrderHistory() {
  const dispatch = useDispatch();

  const { meDetails, loading: userLoading } = useSelector((state) => state.user);
  const {
    orderUserSpecific,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order);


  // Fetch orders when user ID is available
  useEffect(() => {
    if (meDetails?.id) {

      dispatch(orderGetByUser(meDetails.id));
    }
  }, [ meDetails]);

  console.log(orderUserSpecific,"dghjghrodhvvo9irtj")
  return (
   <div className="w-full min-h-screen bg-gray-50 p-6">
  <div className="mx-auto max-w-4xl">
    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your Order History</h2>

    {orderLoading ? (
      <p>Loading orders...</p>
    ) : orderError ? (
      <p className="text-red-500">Error: {orderError}</p>
    ) : orderUserSpecific?.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      <div className="space-y-6">
        {orderUserSpecific.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </h3>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Delivery Address:</strong> {order.deliveryAddress}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Payment Method:</strong> {order.paymentMethod} |{' '}
                <strong>Status:</strong>{' '}
                <span
                  className={`font-medium ${
                    order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total Paid:</strong> ${order.totalPrice.toFixed(2)}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Items:</h4>
              <ul className="divide-y divide-gray-200">
                {order.items?.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.productDetails?.productName || 'Unknown Product'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} | Price: ${item.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        Brand: {item.productDetails?.productBrand} | Category:{' '}
                        {item.productDetails?.productCategory}
                      </p>
                    </div>
                    {item.productDetails?.productImages?.[0]?.url && (
                      <img
                        src={item.productDetails.productImages[0].url}
                        alt={item.productDetails.productName}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}

export default OrderHistory;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMeDetails } from '../../store/slice/userSlice';
import { Link } from 'react-router-dom';
import { fetchCartByUserId } from '../../store/slice/cartSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { meDetails, loading: userLoading, error: userError } = useSelector((state) => state.user);
  const { cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);

  // Fetch user details on component mount
  useEffect(() => {
    if (!meDetails) {
      dispatch(getMeDetails());
    }
  }, [dispatch, meDetails]);

  useEffect(() => {
    if (meDetails?._id) {
      dispatch(fetchCartByUserId());
    }
  }, [dispatch, meDetails]);

  const formatAddress = (addressArray) => {
    if (!Array.isArray(addressArray) || addressArray.length === 0) {
      return 'No address provided';
    }
    const addr = addressArray[0]; // Display the default (first) address
    if (typeof addr !== 'object' || addr === null) return 'Invalid address format';
    const addressParts = [addr.address_line1, addr.address_line2, addr.city, addr.state, addr.pincode, addr.country];
    return addressParts.filter(Boolean).join(', ');
  };

  if (userLoading) {
    return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  }

  if (userError) {
    return <div className="p-8 text-center text-lg text-red-500">Error: {userError}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-10">
      {/* User Profile Display */}
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">My Profile</h2>
        {meDetails && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
              <p className="text-gray-500 font-medium">Name:</p>
              <p className="md:col-span-2">{meDetails.name || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
              <p className="text-gray-500 font-medium">Email:</p>
              <p className="md:col-span-2">{meDetails.email || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
              <p className="text-gray-500 font-medium">WhatsApp Number:</p>
              <p className="md:col-span-2">{meDetails.whatsApp_Number || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
              <p className="text-gray-500 font-medium">Contact Number:</p>
              <p className="md:col-span-2">{meDetails.contactNumber || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
              <p className="text-gray-500 font-medium">Address:</p>
              <p className="md:col-span-2">{formatAddress(meDetails.address)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Cart Items Table */}
      <div className="w-full max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Items in Cart</h2>
        <div className="overflow-x-auto">
          {cartLoading && <p>Loading cart...</p>}
          {cartError && <p className="text-red-500">{cartError}</p>}
          {cartItems?.cart?.items?.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cartItems.cart.items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3">
                      <Link to={`/productDetail/${item.productId?._id}`} className="flex items-start gap-3 cursor-pointer group">
                        <img src={item.productId?.productImages?.[0]?.url || 'https://via.placeholder.com/50'} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <div className="font-semibold group-hover:text-blue-600 transition-colors">{item.productName}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.size && <span className="mr-2">Size: {item.size}</span>}
                            {item.flavor && <span className="mr-2">Flavor: {item.flavor}</span>}
                            {item.color && Array.isArray(item.color) && item.color.length > 0 && <span>Color: {item.color.join(', ')}</span>}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">{item.productBrand || 'N/A'}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">₹{item.price?.toFixed(2) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !cartLoading && <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

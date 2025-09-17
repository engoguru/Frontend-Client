import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers,getMeDetails } from '../../store/slice/userSlice';
import { fetchCartByUserId } from '../../store/slice/cartSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { meDetails, loading, error } = useSelector((state) => state.user);
  const { cartItems,loading:cartLoading,error:cartError } = useSelector((state) => state.cart);

  // Fetch user details on component mount
  useEffect(() => {
    if(meDetails?.id){
      dispatch(fetchCartByUserId(meDetails.id));
    }
  }, [dispatch,meDetails]);

  // useEffect(() => {
  //   if(meDetails){
  //     dispatch(getMeDetails());
  //   }
  // }, []);
console.log(cartItems,"jh")
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-10">
      <div className="flex justify-center items-center h-64 bg-white shadow rounded">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {meDetails && (
          <ul className="space-y-2 text-lg font-medium text-gray-700">
            <li>Name: {meDetails.name}</li>
            <li>Phone: {meDetails.contactNumber}</li>
            <li>Email: {meDetails.email}</li>
          </ul>
        )}
      </div>

      {/* Recent Activity Table */}
    <div className="w-full bg-white shadow rounded p-4">
  <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
      <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
        <tr>
          <th className="px-4 py-2">Product ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Brand</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Size</th>
          <th className="px-4 py-2">Color</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Discount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {cartItems?.cart.map((item) => (
          <tr key={item._id}>
            <td className="px-4 py-2">{item.productId}</td>
            <td className="px-4 py-2">{item.productDetails.productName}</td>
            <td className="px-4 py-2">{item.productDetails.productBrand}</td>
            <td className="px-4 py-2">{item.quantity}</td>
            <td className="px-4 py-2">{item.size}</td>
            <td className="px-4 py-2">
              {/* Assuming color is an index referring to productVarient */}
              {(() => {
                const colorIndex = item.color;
                const variant = item.productDetails.productVarient[colorIndex];
                return variant?.color?.[0] || 'N/A';
              })()}
            </td>
            <td className="px-4 py-2">${item.price.toFixed(2)}</td>
            <td className="px-4 py-2">{item.productDetails.productDiscount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress } from '../../store/slice/userSlice';
import { Navigate } from 'react-router-dom';
// import { getMeDetails } from './store/slice/userSlice'
import { useNavigate } from 'react-router-dom';
import { getMeDetails } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

function Address() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { meDetails } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(location, "fkpotrjyh")
  }, [])
  // Handle new address input
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    address_type: 'home'
  });

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Submit new address


const handleSubmitAddress = async () => {
  const { address_line1, city, state, pincode } = newAddress;
  if (!address_line1 || !city || !state || !pincode) return;

  try {
    // Dispatch updateAddress and get the result directly
    const resultAction = await dispatch(updateAddress({ newAddress }));
    const result = unwrapResult(resultAction); // safely unwrap the payload

    // Optionally check result.status if your API returns it
    if (result?.status === 200 || result?.success) {
      toast.success("Address updated");

      // Clear form fields
      setNewAddress({
        name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
        address_type: 'home'
      });

      setSuccess(true);
      await dispatch(getMeDetails());

      // Navigate back
      if (location?.pathname === '/user') {
        navigate();
      } else {
        navigate(-1);
      }

    } else {
      toast.warning("Try Again");
    }

  } catch (err) {
    console.error('Error adding address:', err);
    toast.error("Something went wrong");
  }
};


  // Set selected address as current
const handleSetCurrent = async () => {
  if (selectedIndex === null) return;

  try {
    // Wait for updateAddress to complete and get the response
    const resultAction = await dispatch(updateAddress({ from: selectedIndex, to: 0 }));

    // Unwrap the response if you're using createAsyncThunk
    const result = await unwrapResult(resultAction);

    // Optionally check result.status if needed
    if (result?.status === 200) {
      toast.success("Address Updated");
      setSelectedIndex(null);

      // Refetch user details
      await dispatch(getMeDetails());

      if (location?.pathname === '/user') {
        navigate(); // adjust route as needed
      } else {
        navigate(-1);
      }
    } else {
      toast.warning("Try Again");
    }

  } catch (err) {
    console.error('Error setting current address:', err);
    toast.error("Something went wrong");
  }
};

  const { updateAddress_Store, loading, error } = useSelector((state) => state.user);
  // console.log(updateAddress_Store,"h")
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Addresses</h2>

        {/* Address Input */}
        <form onSubmit={handleSubmitAddress} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Address</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              {/* <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label> */}
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>

              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">

              <input
                type="text"
                name="address_line1"
                id="address_line1"
                placeholder="Address Line 1"
                value={newAddress.address_line1}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">

              <input
                type="text"
                name="address_line2"
                id="address_line2"
                placeholder="Address Line 2"
                value={newAddress.address_line2}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>

              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>

              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">

              <input
                type="text"
                name="pincode"
                id="pincode"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">

              <select
                name="address_type"
                id="address_type"
                value={newAddress.address_type}
                onChange={handleAddressChange}
                className=" w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {success && (
            <p className="text-green-600 text-sm mb-4">Address added successfully!</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Save New Address
            </button>
          </div>
        </form>


        {/* List of Saved Addresses */}
        <div className="space-y-4 mb-6">
          {Array.isArray(meDetails?.address) && meDetails.address.length > 0 ? (
            meDetails.address.map((addr, index) => (
              <div
                key={index}
                className={`flex items-center justify-between border rounded p-3 ${index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
              >
                <div>
                <div className="text-sm text-gray-800 space-y-1">
  <h3 className="font-medium">{addr.name}</h3>
  <p> {addr.phone}</p>
  <p>{addr.address_line1}</p>
  {addr.address_line2 && <p>{addr.address_line2}</p>}
  <p>
    {addr.city}, {addr.state} - {addr.pincode}
  </p>
  <p>{addr.country}</p>
  <p className="italic text-gray-500">Type: {addr.address_type}</p>
</div>
                  {index === 0 && (
                    <p className="text-green-600 text-sm font-medium">Current Address</p>
                  )}
                </div>

                {/* Show radio button only for non-current addresses */}
                {index !== 0 && (
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedIndex === index}
                    onChange={() => setSelectedIndex(index)}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No addresses saved.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            onClick={handleSubmitAddress}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
          >
            Save New Address
          </button>

          <button
            onClick={handleSetCurrent}
            disabled={selectedIndex === null}
            className={`${selectedIndex === null
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
              } text-white px-4 py-2 rounded transition duration-200 w-full sm:w-auto`}
          >
            Set as Current Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;

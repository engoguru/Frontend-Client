import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress } from '../../store/slice/userSlice';
import { Navigate } from 'react-router-dom';
// import { getMeDetails } from './store/slice/userSlice'
import { useNavigate } from 'react-router-dom';
import { getMeDetails } from '../../store/slice/userSlice';
function Address() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { meDetails } = useSelector((state) => state.user);
const { updateAddress_Store,loading,error } = useSelector((state) => state.user);
   
  // Handle new address input
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  // Submit new address
  const handleSubmitAddress = async () => {
    if (!address.trim()) return;

    try {
      await dispatch(updateAddress({ newAddress: address }));
        await  dispatch(getMeDetails());
      setAddress('');
      setSuccess(true);
       setTimeout(() => {
        setSuccess(false);
        navigate(-1); // ✅ go back to the previous page
      }, 1000);
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  // Set selected address as current
  const handleSetCurrent = async () => {
    if (selectedIndex === null) return;

    try {
      await dispatch(updateAddress({ from: selectedIndex, to: 0 }));
     await  dispatch(getMeDetails());
      setSelectedIndex(null);
       navigate(-1);
    } catch (err) {
      console.error('Error setting current address:', err);
    }
  };
console.log(updateAddress_Store,"h")
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Addresses</h2>

        {/* Address Input */}
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-600 mb-1">
            Add New Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleChangeAddress}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your new address"
          />
          {success && (
            <p className="text-green-600 text-sm mt-2">Address added successfully!</p>
          )}
        </div>

        {/* List of Saved Addresses */}
        <div className="space-y-4 mb-6">
          {Array.isArray(meDetails?.address) && meDetails.address.length > 0 ? (
            meDetails.address.map((addr, index) => (
              <div
                key={index}
                className={`flex items-center justify-between border rounded p-3 ${
                  index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{addr}</h3>
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
            className={`${
              selectedIndex === null
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

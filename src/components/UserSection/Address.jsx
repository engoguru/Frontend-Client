import React,{useState,useEffect} from 'react';
// import { FaCheckCircle } from 'react-icons/fa'; // For green tick icon
import { useSelector,useDispatch } from 'react-redux';
function Address() {
  // Sample address data (replace with API data if needed)
  const dispatch=useDispatch();
  const{meDetails, loading, error}=useSelector((state)=>state.user)

  const addresses = [
    {
      id: 1,
      name: 'Home',
      details: '123 Main Street, New York, NY 10001',
      isCurrent: true,
    },
    {
      id: 2,
      name: 'Office',
      details: '456 Park Avenue, New York, NY 10022',
      isCurrent: false,
    },
    {
      id: 3,
      name: 'Parents',
      details: '789 Broadway, Brooklyn, NY 11221',
      isCurrent: false,
    },
  ];

  return (
    <div className=" w-full min-h-screen bg-gray-50 p-2">
      <div className=" bg-white p-2 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Saved Addresses</h2>

        <div className="space-y-4">
          {meDetails?.address?.map((address) => (
            <div
              key={address.id}
              className={`flex items-start justify-between border rounded p-2 ${
                address.isCurrent ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{address.name}</h3>
                <p className="text-gray-600">{address.details}</p>
              </div>
              {address.isCurrent && (
                <div className="flex items-center text-green-600">
                  {/* <FaCheckCircle className="w-5 h-5 mr-1" /> */}
                  <span className="text-sm font-medium">Current</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Address;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

function EditUser() {
  const { meDetails: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    gender: 'NA',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        contactNumber: currentUser.contactNumber || '',
        gender: currentUser.gender || 'NA',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    if (formData.contactNumber && !/^\+?[0-9]{7,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Phone number is invalid.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const { name, gender, contactNumber } = formData;
        const resultAction = await dispatch(updateUserProfile({ name, gender, contactNumber }));
        const result = unwrapResult(resultAction);
        
        if (result.success) {
          toast.success(result.message || 'Profile updated successfully!');
        }
      } catch (err) {
        toast.error(err.message || 'Failed to update profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    // Add a wrapper to control margin on smaller screens
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="name" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full md:w-3/4 border rounded px-4 py-2 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1 md:ml-[25%] md:px-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="email" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                readOnly
                className="w-full md:w-3/4 border rounded px-4 py-2 bg-gray-100 cursor-not-allowed text-gray-500"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="contactNumber" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Contact Number</label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="Enter phone number"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full md:w-3/4 border rounded px-4 py-2 focus:outline-none focus:ring-2 ${errors.contactNumber ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              />
            </div>
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1 md:ml-[25%] md:px-1">{errors.contactNumber}</p>}
          </div>

          {/* Gender Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="gender" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NA">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
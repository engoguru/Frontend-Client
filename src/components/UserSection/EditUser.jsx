import React, { useState } from 'react';

function EditUser() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Submitted:', formData);
      // TODO: Add logic to save data to the backend
      alert('Profile updated successfully!');
    }
  };

  return (
    // Add a wrapper to control margin on smaller screens
    <div className="px-4 md:px-0">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="fullName" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full md:w-3/4 border rounded px-4 py-2 focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1 md:ml-[25%] md:px-1">{errors.fullName}</p>}
          </div>

          {/* Email Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="email" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full md:w-3/4 border rounded px-4 py-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1 md:ml-[25%] md:px-1">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label htmlFor="phone" className="w-full md:w-1/4 text-gray-600 font-medium mb-1 md:mb-0">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full md:w-3/4 border rounded px-4 py-2 focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1 md:ml-[25%] md:px-1">{errors.phone}</p>}
          </div>

          {/* Address Field */}
          <div>
            <div className="flex flex-col md:flex-row md:items-start md:gap-4">
              <label htmlFor="address" className="w-full md:w-1/4 text-gray-600 font-medium mt-2 mb-1 md:mb-0">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;

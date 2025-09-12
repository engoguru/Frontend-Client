import React from 'react';

function EditUser() {
  return (
    <div className=" w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Profile</h2>
        <form className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <label className="w-full md:w-1/4 text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <label className="w-full md:w-1/4 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <label className="w-full md:w-1/4 text-gray-600 font-medium">Phone</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address Field */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-4">
            <label className="w-full md:w-1/4 text-gray-600 font-medium mt-2">Address</label>
            <textarea
              placeholder="Enter address"
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
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

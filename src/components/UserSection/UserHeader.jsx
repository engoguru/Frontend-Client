import React from 'react';
import { FaTachometerAlt, FaUserEdit, FaHistory, FaMapMarkedAlt } from 'react-icons/fa';

function UserHeader({ currentPage, setCurrentPage }) {
  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Edit Profile', icon: <FaUserEdit /> },
    { name: 'Order History', icon: <FaHistory /> },
    { name: 'Address', icon: <FaMapMarkedAlt /> },
  ];

  return (
    <div className="w-full bg-gray-200 p-4 pt-10 flex justify-center items-center">
      {/* Desktop View */}
      <div className="hidden md:block">
        <ul className="flex flex-col gap-7">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setCurrentPage(item.name)}
              className={`cursor-pointer font-semibold hover:text-blue-600 flex items-center gap-2 ${
                currentPage === item.name ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <ul className="flex flex-row flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setCurrentPage(item.name)}
              className={`cursor-pointer font-semibold hover:text-blue-600 whitespace-nowrap flex items-center gap-1 ${
                currentPage === item.name ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserHeader;
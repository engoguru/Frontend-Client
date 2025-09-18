import React from 'react';

function UserHeader({ currentPage, setCurrentPage }) {
  const navItems = ['Dashboard', 'Edit Profile', 'Order History', 'Address'];

  return (
    <div className="w-full bg-gray-200 p-4 pt-6">
      {/* Desktop View */}
      <div className="hidden md:block">
        <ul className="flex flex-col gap-5">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`cursor-pointer hover:text-blue-600 ${
                currentPage === item ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <ul className="flex flex-row flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`cursor-pointer hover:text-blue-600 whitespace-nowrap ${
                currentPage === item ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserHeader;

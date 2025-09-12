import React from 'react';

function UserHeader({ currentPage, setCurrentPage }) {
  const navItems = ['Dashboard', 'Edit Profile', 'Order History', 'Address'];

  return (
    <div className="w-full bg-gray-200  py-4">
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
      <div className="flex flex-row gap-5 w-full justify-center items-center block md:hidden">
        <ul className="flex flex-row gap-5 overflow-x-auto">
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

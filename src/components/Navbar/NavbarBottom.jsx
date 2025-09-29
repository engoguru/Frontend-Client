import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';

const NavbarBottom = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  // Effect to handle clicks outside the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the nav container, close the menu
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: "Apparel", subItems: ["Shirts", "Shorts", "Shoes"] },
    { label: "Equipment", subItems: ["Balls", "Bats", "Gloves"] },
    { label: "Nutrition", subItems: ["Protein", "Vitamins", "Snacks"] },
    {
      label: "Pages", subItems: [
        { name: "About-US", path: "/about" },
        { name: "Contact-US", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Term-Conditions", path: "/TermCondition" }
      ]
    },
    { label: "Account", subItems: ["Dashboard", "Profile", "Privacy", "Track"] },
  ];

  return (
    <div
      ref={navRef}
      onMouseLeave={() => setOpenMenu(null)} // Close menu when mouse leaves the navbar area
      className="text-center hidden md:flex w-full bg-white shadow-md fixed top-14 left-0 right-0 z-10 md:px-6 lg:px-10"
    >
      <div className="flex w-4/5 mx-auto py-4 space-x-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setOpenMenu(item.label)}
          >
            <p
              onClick={() => toggleMenu(item.label)}
              className={`text-black font-semibold hover:text-red-700 transition cursor-pointer ${openMenu === item.label ? 'border-b-1 border-red-500' : ''
                }`}
            >
              {item.label}
            </p>

            {openMenu === item.label && (
              <div className="absolute top-full -left-10 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-20">
                <ul>
                  {item.label === "Pages"
                    ? item.subItems.map((subItem, idx) => (
                      <li key={idx}>
                        <Link
                          to={subItem.path}
                          className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-200"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))
                    : item.subItems.map((subItem, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-200"
                      >
                        <Link   to={`/productViewAll?category=${encodeURIComponent(subItem)}`} >
                        {subItem}
                        </Link>
                        
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 py-4">
        <a
          href="tel:1122334455"
          className='flex items-center space-x-2 text-red-700 font-bold whitespace-nowrap transition-transform duration-300 ease-in-out animate-pulse hover:scale-110 hover:animate-none'
        >
          <FiPhone />
          <span> +91 - 1122334455</span>
        </a>
      </div>
    </div>
  );
};

export default NavbarBottom;

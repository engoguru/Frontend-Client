import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavbarTop() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    const toggleSubMenu = (menuName) => {
        setOpenSubMenu(openSubMenu === menuName ? null : menuName);
    };

    const menuItems = [
        { label: "Menu", subItems: [] },
        { label: "Apparel", subItems: ["Shirts", "Shorts", "Shoes"] },
        { label: "Equipment", subItems: ["Balls", "Bats", "Gloves"] },
        { label: "Nutrition", subItems: ["Protein", "Vitamins", "Snacks"] },
        { label: "Pages", subItems: ["About-US", "Contact-US", "Privacy Policy", "Term-Conditions"] },
        { label: "Account", subItems: ["Dashboard", "Profile", "Privacy", "Track"] },
    ];

    return (
        <nav className="w-full py-2 bg-white fixed top-0 left-0 right-0 z-10 border-b border-red-700">
            <div className="flex justify-between items-center px-4 md:px-8">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 text-black font-bold text-base md:text-lg lg:text-xl no-underline transition-all duration-300" onClick={() => window.scrollTo(0, 0)}>
                    <span className="text-black">SPORT</span>
                    <span className="text-red-700">DUNIYA</span>
                </Link>

                {/* Mobile Search + Hamburger */}
                <div className="md:hidden flex items-center space-x-2 ml-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-1 bg-[#d5baba3b] rounded-md border border-white placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </div>

                    {/* Hamburger Button */}
                    <p onClick={() => setMenuOpen(!menuOpen)} className="ml-2 text-black focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </p>
                </div>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 items-center justify-center px-6">
                    <div className="flex items-center w-full max-w-xl space-x-2">
                        <select className="bg-[#ffd226] text-black font-semibold text-sm px-1 py-2 rounded-md focus:outline-none">
                            <option value="all">All</option>
                            <option value="sports">Sports</option>
                            <option value="news">News</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Enter Your Search Keywords"
                                className="w-full px-4 py-2 bg-[#d5baba3b] rounded-md border border-white placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Desktop Profile */}
                <div className="hidden md:flex flex-shrink-0 items-center justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                        <path d="M16 18C9.4 18 4 23.4 4 30H2c0-6.2 4-11.5 9.6-13.3C9.4 15.3 8 12.8 8 10c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.5 5.3-3.6 6.7C26 18.5 30 23.8 30 30h-2c0-6.6-5.4-12-12-12zm6-8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6z"></path>
                    </svg>
                    <p className="ml-2 text-black text-sm">sportDuniya...</p>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {menuOpen && (
                <div className="fixed inset-0 z-30  bg-opacity-50 md:hidden">
                    <div className="fixed top-0 left-0 w-3/5 max-w-xs h-full bg-white shadow-lg p-6 overflow-y-auto">
                        {/* Close Button */}
                        <p
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-4 right-4 text-black font-bold text-xl cursor-pointer"
                        >
                            ✕
                        </p>

                        <div className="space-y-4">
                            {/* Top: "Menu" item with dropdown */}
                            {menuItems[0] && (
                                <div>
                                    <div
                                        onClick={() => toggleSubMenu(menuItems[0].label)}
                                        className="flex justify-between items-center text-black font-semibold hover:text-red-700 transition cursor-pointer"
                                    >
                                        <span>{menuItems[0].label}</span>

                                        {/* Only show arrow if subItems exist */}
                                        {menuItems[0].subItems.length > 0 && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Dropdown if open */}
                                    {openSubMenu === menuItems[0].label && menuItems[0].subItems.length > 0 && (
                                        <ul className="pl-2 mt-2 space-y-2">
                                            {menuItems[0].subItems.map((subItem, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm text-gray-700 hover:text-red-600 cursor-pointer"
                                                >
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            {/* Other menu items */}
                            {menuItems.slice(1).map((item, index) => (
                                <div key={index}>
                                    <div
                                        onClick={() => toggleSubMenu(item.label)}
                                        className="flex justify-between items-center text-black font-semibold hover:text-red-700 transition cursor-pointer"
                                    >
                                        <span>{item.label}</span>

                                        {/* Only show arrow if subItems exist */}
                                        {item.subItems?.length > 0 && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </div>

                                    {openSubMenu === item.label && item.subItems?.length > 0 && (
                                        <ul className="pl-2 mt-2 space-y-2">
                                            {item.subItems.map((subItem, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm text-gray-700 hover:text-red-600 cursor-pointer"
                                                >
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>


                        {/* Contact Section */}
                        <div className="mt-10 border-t pt-4">
                            <p className="text-black font-semibold">Call Us - 1122334455</p>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

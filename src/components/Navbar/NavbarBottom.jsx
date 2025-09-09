

import React, { useState } from 'react';

const NavbarBottom = () => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    const menuItems = [
        { label: "Apparel", subItems: ["Shirts", "Shorts", "Shoes"] },
        { label: "Equipment", subItems: ["Balls", "Bats", "Gloves"] },
        { label: "Nutrition", subItems: ["Protein", "Vitamins", "Snacks"] },
        { label: "Pages", subItems: ["About-US", "Contact-US", "Privacy Policy","Term-Conditions"] },
         { label: "Account", subItems: ["Dashboard", "Profile", "Privacy","Track"] },
    ];

    return (
        <div className="w-full bg-white shadow-md bg-white flex fixed top-14 left-0 right-0 z-10  md:px-6 lg:px-10">
            <div className="flex w-4/5 mx-auto py-4 space-x-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="relative">
                        {/* Main Menu Item */}
                        <p
                            onClick={() => toggleMenu(item.label)}
                            className="text-black font-semibold hover:text-red-700 transition"
                        >
                            {item.label}
                        </p>

                        {/* Dropdown Menu */}
                        {openMenu === item.label && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-20">
                                <ul>
                                    {item.subItems.map((subItem, idx) => (
                                        <li
                                            key={idx}
                                            className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer text-sm"
                                        >
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="w-1/5 py-4">
            <p className='text-black semibold '>Call US-1122334455</p></div>
        </div>
    );
};

export default NavbarBottom;

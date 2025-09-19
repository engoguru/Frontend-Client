import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../UserSection/Login';
import Register from '../UserSection/Register';
import ForgetPassword from '../UserSection/ForgetPassword';

export default function NavbarTop() {
    const desktopSearchRef = useRef();
    const mobileSearchRef = useRef();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");

    const [isAccount, setIsAcount] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        const category = encodeURIComponent(selectedCategory);
        const search = encodeURIComponent(searchQuery.trim());
        if (searchQuery.trim()) {
            navigate(`/productViewAll?category=${category}&search=${search}`);
        } else {
            navigate(`/productViewAll?category=${category}`);
        }
    };

    const handleFocus = () => {
        if (searchQuery.length > 0) {
            setShowSuggestions(true);
        }
    };

    const AccountDropdown = () => {
        setIsAcount(prev => !prev);
    };

    const toggleSubMenu = (menuName) => {
        setOpenSubMenu(openSubMenu === menuName ? null : menuName);
    };

    const menuItems = [
        {
            label: "Apparel",
            subItems: [
                { name: "Shirts", path: "/productViewAll?category=shirts" },
                { name: "Shorts", path: "/productViewAll?category=shorts" },
                { name: "Shoes", path: "/productViewAll?category=shoes" },
            ]
        },
        {
            label: "Equipment",
            subItems: [
                { name: "Balls", path: "/productViewAll?category=balls" },
                { name: "Bats", path: "/productViewAll?category=bats" },
                { name: "Gloves", path: "/productViewAll?category=gloves" },
            ]
        },
        {
            label: "Nutrition", subItems: [
                { name: "Protein", path: "/productViewAll?category=protein" },
                { name: "Vitamins", path: "/productViewAll?category=vitamins" },
                { name: "Snacks", path: "/productViewAll?category=snacks" },
            ]
        },
        {
            label: "Pages", subItems: [
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/TermCondition" }
            ]
        },
        {
            label: "Account", subItems: [
                { name: "Dashboard", path: "/user" },
                { name: "Profile", path: "/user" },
                { name: "Track Order", path: "/user" }
            ]
        },
    ];

    return (
        <nav className="w-full py-2 bg-white fixed top-0 left-0 right-0 z-20 border-b border-red-700">
            <div className="flex justify-between items-center px-4 md:px-8">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 text-black font-bold text-base md:text-lg lg:text-xl no-underline transition-all duration-300" onClick={() => window.scrollTo(0, 0)}>
                    <span className="text-black">SPORT</span>
                    <span className="text-red-700">DUNIYA</span>
                </Link>

                {/* Mobile Search + Hamburger */}
                <div className="md:hidden flex items-center space-x-2 ml-4">
                    <div ref={mobileSearchRef} className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`w-full px-3 py-1 bg-[#d5baba3b] border border-transparent placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none pr-8 transition-all rounded-md`}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleSearchSubmit}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </button>
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="ml-2 text-black focus:outline-none" aria-label="Open menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 items-center justify-center px-6">
                    <div ref={desktopSearchRef} className="flex items-center w-full max-w-xl space-x-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-[#ffd226] text-black font-semibold text-sm px-1 py-2 rounded-md focus:outline-none"
                        >
                            <option value="">All</option>
                            <option value="Apparel">Apparel</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Nutrition">Nutrition</option>
                        </select>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Enter Your Search Keywords"
                                className={`w-full px-4 py-2 bg-[#d5baba3b] border border-transparent placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none pr-10 transition-all rounded-md`}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                            />
                            <button
                                onClick={handleSearchSubmit}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Profile */}
                <div className="hidden md:flex items-center w-1/4 justify-end">
                    <div onClick={AccountDropdown} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                            <path d="M16 18C9.4 18 4 23.4 4 30H2c0-6.2 4-11.5 9.6-13.3C9.4 15.3 8 12.8 8 10c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.5 5.3-3.6 6.7C26 18.5 30 23.8 30 30h-2c0-6.6-5.4-12-12-12zm6-8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6z"></path>
                        </svg>
                    </div>
                    <p className="ml-2 text-black text-sm">sportDuniya...</p>
                </div>
            </div>

            {/* Mobile menu + modals not shown again here to keep it short */}
            {/* You already have those in your component, no changes needed there */}

            {isAccount && (
                <ul className="absolute top-15 right-10 bg-white shadow-lg rounded-md w-40 z-100">
                    <Link to="/user">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">Profile</li>
                    </Link>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200" onClick={() => setActiveModal('login')}>Login</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200" onClick={() => setActiveModal('register')}>Register</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">Cart</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200" onClick={() => setActiveModal('forgetPasswword')}>Forget Password</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">Logout</li>
                </ul>
            )}
            {activeModal === 'login' && <LoginModal isOpen={true} setIsOpen={() => setActiveModal(null)} />}
            {activeModal === 'register' && <Register isOpen={true} setIsOpen={() => setActiveModal(null)} />}
            {activeModal === 'forgetPasswword' && <ForgetPassword isOpen={true} setIsOpen={() => setActiveModal(null)} />}
        </nav>
    );
}

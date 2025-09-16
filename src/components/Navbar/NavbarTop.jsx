import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function NavbarTop() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const mobileSearchRef = useRef(null);
    const desktopSearchRef = useRef(null);

    // Static list of all possible suggestions for filtering
    const allPossibleSuggestions = ['Protein Powder', 'Running Shoes', 'Yoga Mat', 'Dumbbells', 'T-shirts', 'Track Pants', 'Vitamins', 'Gym Gloves', 'Shaker Bottle'];
    // State for recent searches, which can be modified
    const [recentSearches, setRecentSearches] = useState(['Running Shoes', 'Yoga Mat', 'Dumbbells']);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const filteredSuggestions = allPossibleSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            // If input is cleared, show recent searches
            setSuggestions(recentSearches);
        }
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    const handleFocus = () => {
        // On focus, show recent searches if the input is empty
        if (searchQuery.length === 0) {
            setSuggestions(recentSearches);
        }
        setShowSuggestions(true);
    };

    const handleRemoveSuggestion = (e, suggestionToRemove) => {
        e.stopPropagation(); // Prevent suggestion from being selected
        const updatedRecent = recentSearches.filter(s => s !== suggestionToRemove);
        setRecentSearches(updatedRecent);

        // If the search query is empty, update the visible suggestions list as well
        if (searchQuery.length === 0) {
            setSuggestions(updatedRecent);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target) && desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
        { label: "Account", subItems: [{ name: "Dashboard", path: "/user" }, { name: "Profile", path: "/user" }, { name: "Track Order", path: "/user" }] },
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
                            className={`w-full px-3 py-1 bg-[#d5baba3b] border border-transparent placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none pr-8 transition-all ${showSuggestions ? 'rounded-b-none bg-gray-50 shadow-lg' : 'rounded-md'}`}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                        />
                        {showSuggestions && (
                            <ul className="absolute top-full left-0 w-full bg-gray-50 border border-gray-200 rounded-b-md shadow-lg z-20 max-h-60 overflow-y-auto">
                                {suggestions.length > 0 ? (
                                    suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="group px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{suggestion}</span>
                                            </div>
                                            {recentSearches.includes(suggestion) && (
                                                <button
                                                    onClick={(e) => handleRemoveSuggestion(e, suggestion)}
                                                    className="text-gray-400 hover:text-gray-700 p-1"
                                                    title="Remove"
                                                >
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-sm text-gray-500 italic">No results found</li>
                                )}
                            </ul>
                        )}
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
                    <button onClick={() => setMenuOpen(!menuOpen)} className="ml-2 text-black focus:outline-none" aria-label="Open menu">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 items-center justify-center px-6">
                    <div ref={desktopSearchRef} className="flex items-center w-full max-w-xl space-x-2">
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
                                className={`w-full px-4 py-2 bg-[#d5baba3b] border border-transparent placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none pr-10 transition-all ${showSuggestions ? 'rounded-b-none bg-gray-50 shadow-lg' : 'rounded-md'}`}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={handleFocus}
                            />
                            {showSuggestions && (
                                <ul className="absolute top-full left-0 w-full bg-gray-50 border border-gray-200 rounded-b-md shadow-lg z-20 max-h-60 overflow-y-auto">
                                    {suggestions.length > 0 ? (
                                        suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                className="group px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                                onClick={() => handleSuggestionClick(suggestion)}
                                            >
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{suggestion}</span>
                                                </div>
                                                {recentSearches.includes(suggestion) && (
                                                    <button
                                                        onClick={(e) => handleRemoveSuggestion(e, suggestion)}
                                                        className="hidden group-hover:block text-gray-400 hover:text-gray-700 p-1"
                                                        title="Remove"
                                                    >
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-sm text-gray-500 italic">No results found</li>
                                    )}
                                </ul>
                            )}
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
            <div
                className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ease-in-out ${menuOpen ? 'bg-gray-900/50' : 'bg-transparent pointer-events-none'
                    }`}
                onClick={() => setMenuOpen(false)}
            >
                <div
                    className={`fixed top-0 left-0 w-2/3 max-w-[280px] h-full bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out flex flex-col ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        {/* Header with Logo and Close Button */}
                        <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4 -mx-6 px-6">
                            <Link to="/" className="text-black font-bold text-lg" onClick={() => setMenuOpen(false)}>
                                <span className="text-black">SPORT</span>
                                <span className="text-red-700">DUNIYA</span>
                            </Link>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-500 hover:text-black"
                                aria-label="Close menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-2">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    <div
                                        onClick={() => toggleSubMenu(item.label)}
                                        className="flex justify-between items-center py-2 text-black font-semibold hover:text-red-700 transition cursor-pointer"
                                    >
                                        <span>{item.label}</span>
                                        {item.subItems?.length > 0 && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${openSubMenu === item.label ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </div>

                                    {item.subItems?.length > 0 && (
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubMenu === item.label ? 'max-h-96' : 'max-h-0'
                                                }`}
                                        >
                                            <ul className="pl-4 mt-1 space-y-1">
                                                {item.subItems.map((subItem, idx) => (
                                                    <li key={idx}>
                                                        <Link
                                                            to={subItem.path}
                                                            onClick={() => setMenuOpen(false)}
                                                            className="block text-sm text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-md py-1.5 px-2"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Login/Logout Section */}
                        <div className="mt-8 border-t border-gray-300 pt-4 -mx-6 px-6">
                            <Link
                                to="/login" // Assuming a login route
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center py-2 text-black font-semibold hover:text-red-700 transition cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-auto pt-6 border-t border-gray-300 -mx-6 px-6">
                        <a
                            href="tel:1122334455"
                            className='text-red-700 font-bold whitespace-nowrap transition-transform duration-300 ease-in-out animate-pulse hover:scale-110 hover:animate-none'
                        >
                            Call Us - 1122334455
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

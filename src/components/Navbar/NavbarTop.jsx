import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../UserSection/Login";
import Register from "../UserSection/Register";
import ForgetPassword from "../UserSection/ForgetPassword";
import {
  FiLogIn,
  FiUserPlus,
  FiShoppingCart,
  FiKey,
  FiLogOut,
  FiChevronDown,
  FiShoppingBag,
  FiPhone,
} from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";
import { logoutUser } from "../../store/slice/userSlice";

export default function NavbarTop() {
  const desktopSearchRef = useRef();
  const mobileSearchRef = useRef();
  const navbarRef = useRef(null);
  const profileRef = useRef(null); // 👈 profile wrapper ref
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meDetails } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAccount, setIsAcount] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const items = cartItems?.cart?.items || [];
  const cartHasItems = items.length > 0;

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
    if (searchQuery.length === 0) {
      setSuggestions(recentSearches);
    }
    setShowSuggestions(true);
  };

  const handleRemoveSuggestion = (e, suggestionToRemove) => {
    e.stopPropagation();
    const updatedRecent = recentSearches.filter(
      (s) => s !== suggestionToRemove
    );
    setRecentSearches(updatedRecent);
    if (searchQuery.length === 0) {
      setSuggestions(updatedRecent);
    }
  };

  const AccountDropdown = () => {
    setIsAcount((prev) => !prev);
  };

  const toggleSubMenu = (menuName) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  // 👇 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsAcount(false);
      }
    };

    const handleScroll = () => {
      setIsAcount(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamically set navbar height for content padding
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  const menuItems = [
    {
      label: "Apparel",
      subItems: [
        { name: "Shirts", path: "/productViewAll?category=shirts" },
        { name: "Shorts", path: "/productViewAll?category=shorts" },
        { name: "Shoes", path: "/productViewAll?category=shoes" },
      ],
    },
    {
      label: "Equipment",
      subItems: [
        { name: "Balls", path: "/productViewAll?category=balls" },
        { name: "Bats", path: "/productViewAll?category=bats" },
        { name: "Gloves", path: "/productViewAll?category=gloves" },
      ],
    },
    {
      label: "Nutrition",
      subItems: [
        { name: "Protein", path: "/productViewAll?category=protein" },
        { name: "Vitamins", path: "/productViewAll?category=vitamins" },
        { name: "Snacks", path: "/productViewAll?category=snacks" },
      ],
    },
    {
      label: "Pages",
      subItems: [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/TermCondition" },
      ],
    },
    {
      label: "Account",
      subItems: [
        { name: "My Profile", path: { pathname: "/user", state: { section: "dashboard" } } },
        { name: "Cart", path: "/cart" },
        { name: "Orders", path: { pathname: "/user", state: { section: "orders" } } },
      ],
    },
  ];

  return (
    <nav ref={navbarRef} className="w-full py-2 bg-white fixed top-0 left-0 right-0 z-20 border-b border-red-700">
      <div className="flex flex-wrap xsm:flex-nowrap justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 text-black font-bold text-lg sm:text-xl no-underline transition-all duration-300"
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className="text-black">SPORT</span>
          <span className="text-red-700">EXPRESS</span>
        </Link>

        {/* Mobile Search (moves below on <425px screens) */}
        <div className="w-full xsm:w-auto xsm:flex-1 order-3 xsm:order-2 mt-2 xsm:mt-0 flex justify-center px-2 md:hidden">
          <div ref={mobileSearchRef} className="relative w-full max-w-sm bg-[#d5baba3b] rounded-full border border-transparent focus-within:border-red-500 transition-colors duration-300">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 bg-transparent border-none placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none pr-8"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full text-gray-700 hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </button>
          </div>

        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center order-2 xsm:order-3 gap-4">
          {/* Mobile Cart Icon */}
          {/* <div
            className="cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart size={25} className="text-gray-700" />
          </div> */}

          <div className="relative group">
            {!meDetails && (
              <div className="absolute mt-5 -top-6 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                Please log in
              </div>
            )}

            <Link
              to="/product/cart"
              className="cursor-pointer flex items-center space-x-2 transition-all duration-300 ease-in-out relative"
            >
              <FiShoppingCart size={25} className="text-gray-700" />

              {items?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-100 text-red-700 text-xs font-bold rounded-full px-1.5 py-0.5">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black focus:outline-none relative z-30"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 items-center justify-center px-6">
          <div
            ref={desktopSearchRef}
            className="flex items-center w-full max-w-xl bg-[#d5baba3b] rounded-full border border-transparent focus-within:border-red-500 transition-colors duration-300"
          >
            <div className="relative flex items-center">
              <select
                value={selectedCategory}
                onFocus={() => setIsCategoryDropdownOpen(true)}
                onBlur={() => setIsCategoryDropdownOpen(false)}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setIsCategoryDropdownOpen(false); // Rotate icon back on selection
                }}
                className="bg-[#ffd226] text-black font-semibold text-sm pl-4 pr-8 py-2 rounded-l-full focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">All</option>
                <option value="Apparel">Apparel</option>
                <option value="Equipment">Equipment</option>
                <option value="Nutrition">Nutrition</option>
              </select>
              <FiChevronDown
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-black pointer-events-none transition-transform duration-300 ${isCategoryDropdownOpen ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Your Search Keywords"
                className="w-full px-4 py-2 bg-transparent border-none placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none pr-10"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full text-gray-700 hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Profile + Cart */}
        <div
          ref={profileRef}
          className="hidden md:flex items-center justify-end relative space-x-6 pr-4"
        >
          {/* Profile (icon + name + arrow) */}
          <div
            onMouseEnter={() => {
              setIsAcount(true);
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setIsAcount(false);
              setIsHovering(false);
            }}
            className={`relative pb-2 flex items-center transition-all duration-300 ease-in-out rounded-md px-2 py-1 ${isHovering
              ? meDetails
                ? "bg-gray-100 border border-gray-300"
                : "bg-blue-600 border border-blue-600"
              : "bg-transparent border border-transparent"
              }`}
          >
            <div
              onClick={() => {
                if (!meDetails) setActiveModal("login");
                else AccountDropdown();
              }}
              className="cursor-pointer flex items-center space-x-2 transition-all duration-300 ease-in-out"
            >
              <PiUserCircle
                size={25}
                className={`transition-colors duration-300 ${isHovering && !meDetails ? "text-white" : "text-gray-700"
                  }`}
              />
              <p
                className={`text-base transition-colors duration-300 ${isHovering && !meDetails ? "text-white" : "text-black"
                  }`}
              >
                {meDetails?.name ? meDetails.name.split(" ")[0] : "Login"}
              </p>

              <FiChevronDown
                size={15}
                className={`transition-transform duration-300 transform ${isHovering ? "rotate-180" : "rotate-0"
                  } ${isHovering && !meDetails ? "text-white" : "text-gray-700"
                  }`}
              />
            </div>

            {/* Account Dropdown */}
            <ul
              className={`absolute top-full left-0 bg-white shadow-lg rounded-md w-48 z-50 border border-gray-200 transform transition-all duration-300 ease-in-out ${isAccount
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
                }`}
            >
              {/* My Profile always visible */}
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                onClick={() => navigate("/user", { state: { section: "dashboard" } })}
              >
                <PiUserCircle size={18} /> My Profile
              </li>

              {/* If logged in */}
              {meDetails ? (
                <>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => navigate("/product/cart")}
                  >
                    <FiShoppingCart size={18} /> Cart
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => navigate("/user", { state: { section: "orders" } })}
                  >
                    <FiShoppingBag size={18} /> Orders
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200" onClick={logoutHandler}>
                    <FiLogOut size={18} /> Logout
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => setActiveModal("login")}
                  >
                    <FiLogIn size={18} /> Login
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => setActiveModal("register")}
                  >
                    <FiUserPlus size={18} /> Register
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => navigate("/cart")}
                  >
                    <FiShoppingCart size={18} /> Cart
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => navigate("/user", { state: { section: "orders" } })}
                  >
                    <FiShoppingBag size={18} /> Orders
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-colors duration-200"
                    onClick={() => setActiveModal("forgetPasswword")}
                  >
                    <FiKey size={18} /> Forget Password
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Cart Icon + Text */}
          <div className="relative group">
            {!meDetails && (
              <div className="absolute mt-5 -top-6 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                Please log in
              </div>
            )}

            <Link
              to="/product/cart"
              className="cursor-pointer flex items-center space-x-2 transition-all duration-300 ease-in-out relative"
            >
              <FiShoppingCart size={25} className="text-gray-700" />

              {items?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-100 text-red-700 text-xs font-bold rounded-full px-1.5 py-0.5">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "login" && (
        <LoginModal isOpen={true} setIsOpen={() => setActiveModal(null)} />
      )}
      {activeModal === "register" && (
        <Register isOpen={true} setIsOpen={() => setActiveModal(null)} />
      )}
      {activeModal === "forgetPasswword" && (
        <ForgetPassword isOpen={true} setIsOpen={() => setActiveModal(null)} />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-xl flex flex-col z-50 transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Sidebar Content */}
        <>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
            <h2 className="text-xl font-bold text-red-700">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow overflow-y-auto">
            <ul className="py-4">
              {menuItems.map((item, index) => ( // Changed border-b to border-b border-gray-200
                <li key={index} className="border-b border-gray-200">
                  <div
                    className="px-4 py-3 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSubMenu(item.label)}
                  >
                    <span className="font-semibold">{item.label}</span>
                    <FiChevronDown
                      className={`transition-transform duration-200 ${openSubMenu === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                  {openSubMenu === item.label && (
                    <ul className="pl-8 bg-gray-50">
                      {item.subItems.map((subItem, subIndex) => ( // Changed border-t to border-t border-gray-200
                        <li key={subIndex} className="border-t border-gray-200">
                          <Link
                            to={typeof subItem.path === "string" ? subItem.path : subItem.path.pathname}
                            state={typeof subItem.path === "object" ? subItem.path.state : undefined}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {meDetails ? (
              <div className="px-4 py-3 cursor-pointer text-gray-800 font-semibold hover:bg-gray-100"
                onClick={logoutHandler}>
                Logout
              </div>
            ) : (
              <>
                <div
                  className="px-4 py-3 cursor-pointer text-gray-800 hover:text-red-700 font-semibold hover:bg-gray-100"
                  onClick={() => { setActiveModal("login"); setMenuOpen(false); }}
                >
                  Login
                </div>
                <div
                  className="px-4 py-3 cursor-pointer text-gray-800 hover:text-red-700 font-semibold hover:bg-gray-100"
                  onClick={() => { setActiveModal("register"); setMenuOpen(false); }}
                >
                  Register
                </div>
                <div
                  className="px-4 py-3 cursor-pointer text-gray-800 hover:text-red-700 font-semibold hover:bg-gray-100"
                  onClick={() => { setActiveModal("forgetPasswword"); setMenuOpen(false); }}
                >
                  Forget Password
                </div>
              </>
            )}
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Call Us Section */}
          <a
            href="tel:+1234567890"
            className="p-4 border-t border-gray-200 bg-gray-100 flex items-center justify-center space-x-2 transition-colors duration-200 "
          >
            <FiPhone className="text-red-700" />
            <span className="font-semibold text-gray-800 hover:text-red-700">Call Us: +123-456-7890</span>
          </a>
        </>
      </div>
      {/* Backdrop for Mobile Sidebar */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

// import React from 'react'

// function NavbarTop() {
//     return (
//         <>
//             <nav className="w-full py-2 bg-[#181818] bg-white fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-1 md:px-4  border-b border-red-700">

//                 <div className="w-1/4 text-white font-semibold">
//                     <p className='' >
//                         <span className='text-black'>SPORT</span><span className='text-red-700'>DUNIYA</span>
//                     </p>
//                 </div>



//                 <div className="w-1/2 flex justify-center items-center space-x-2 relative">
//                     <select className="bg-[#ffd226] text-black font-semibold text-sm px-3 py-2 rounded-md focus:outline-none">
//                         <option className="bg-white text-black font-semibold " value="all">All</option>
//                         <option className="bg-white text-black font-semibold" value="sports">Sports</option>
//                         <option className="bg-white text-black font-semibold" value="news">News</option>
//                         <option className="bg-white text-black font-semibold" value="entertainment">Entertainment</option>
//                     </select>

//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ">
//                         {/* Down arrow SVG */}
//                         <svg
//                             className="fill-white h-4 w-4"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                         >
//                             <path d="M7 7l3 3 3-3" />
//                         </svg>
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Enter Your Search Keywords"
//                         className="w-full px-4 py-2 bg-[#d5baba3b] rounded-md border border-white placeholder:text-black placeholder:opacity-50 placeholder:bold placeholder:text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 pointer-events-none"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
//                         />
//                     </svg>
//                 </div>



//                 <div className="w-1/4 flex ">
//                     <div className="pt-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 18C9.4 18 4 23.4 4 30H2c0-6.2 4-11.5 9.6-13.3C9.4 15.3 8 12.8 8 10c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.5 5.3-3.6 6.7C26 18.5 30 23.8 30 30h-2c0-6.6-5.4-12-12-12zm6-8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6z"></path></svg>
//                     </div>
//                     <p className="flex flex-col text-black px-1 py-1 rounded-md border border-white hover:bg-gray-700 transition">
//                         <span className="text-sm semibold">
//                             {"sportDuniya@gmail.com".slice(0, 10) + "..."}
//                         </span>
//                         <span className='text-sm semibold'> {"sportDu".slice(0, 10) + ""}</span>
//                     </p>

//                 </div>
//             </nav>


//         </>
//     )
// }

// export default NavbarTop


import React, { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full py-2 bg-white fixed top-0 left-0 right-0 z-10 border-b border-red-700">
            <div className="flex justify-between items-center px-4 md:px-8">
                {/* Logo */}
                <div className="text-black font-bold text-lg w-1/4">
                    <span className="text-black">SPORT</span>
                    <span className="text-red-700">DUNIYA</span>
                </div>

                {/* Hamburger Menu - Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-black focus:outline-none"
                    >
                        {/* Hamburger icon */}
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

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-4 w-full justify-center">
                    {/* Dropdown and Search */}
                    <div className="flex items-center space-x-2 relative w-2/3">
                        <select className="bg-[#ffd226] text-black font-semibold text-sm px-1 py-2 rounded-md focus:outline-none">
                            <option value="all">All</option>
                            <option value="sports">Sports</option>
                            <option value="news">News</option>
                            <option value="entertainment">Entertainment</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Enter Your Search Keywords"
                            className="w-full px-4 py-2 bg-[#d5baba3b] rounded-md border border-white placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 pointer-events-none"
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
                </div>

                {/* Profile - Always visible */}
                <div className="hidden md:flex items-center w-1/4 justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 18C9.4 18 4 23.4 4 30H2c0-6.2 4-11.5 9.6-13.3C9.4 15.3 8 12.8 8 10c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.5 5.3-3.6 6.7C26 18.5 30 23.8 30 30h-2c0-6.6-5.4-12-12-12zm6-8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6z"></path></svg>
                    <p className="ml-2 text-black text-sm">
                        sportDuniya...
                    </p>
                </div>
            </div>

            {/* Mobile Menu - Toggle */}
            {menuOpen && (
                <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow">
                    {/* Same Dropdown and Search as above */}
                    <select className="w-full bg-[#ffd226] text-black font-semibold text-sm px-3 py-2 rounded-md focus:outline-none">
                        <option value="all">All</option>
                        <option value="sports">Sports</option>
                        <option value="news">News</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Enter Your Search Keywords"
                        className="w-full px-4 py-2 bg-[#d5baba3b] rounded-md border border-white placeholder:text-black placeholder:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Optionally: Add profile or email display */}
                    <div className="flex items-center pt-2 border-t">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M16 18C9.4 18 4 23.4 4 30H2c0-6.2 4-11.5 9.6-13.3C9.4 15.3 8 12.8 8 10c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.5 5.3-3.6 6.7C26 18.5 30 23.8 30 30h-2c0-6.6-5.4-12-12-12zm6-8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6z"></path></svg>
                        <span className="ml-2 text-black text-sm">sportDuniya...</span>
                    </div>
                </div>
            )}
        </nav>
    );
}

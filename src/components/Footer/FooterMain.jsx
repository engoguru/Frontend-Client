import React from 'react';
import { Link } from 'react-router-dom';

function FooterMain() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center pt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {/* 1. Contact Us */}
        <div>
          <h3 className="text-lg text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 Fitness St, Gym City, USA</p>
          <p className="text-sm mt-2">Email: support@example.com</p>
         <p className="text-sm mt-2">
  Phone: <a href="tel:+919251150085" className="text-blue-500 hover:underline">+91-9251150085</a>
</p>

        </div>

        {/* 2. Information */}
        <div>
          <h3 className="text-lg text-white font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Home</Link></li>
            <li><Link to="/productViewAll" onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Shop</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">About Us</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Contact</Link></li>
          </ul>
        </div>

        {/* 3. Account */}
        <div>
          <h3 className="text-lg text-white  font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/user" state={{ section: 'dashboard' }} onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Profile</Link></li>
            <li><Link to="/user" state={{ section: 'orders' }} onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Order History</Link></li>
            <li><Link to="/product/cart" onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Cart</Link></li>
            <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-0.5">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 4. Description + Social Media */}
        <div>
          <h3 className="text-lg text-white  font-semibold mb-4">About Us</h3>
          <p className="text-sm mb-4">
            We provide high-quality fitness products and services to help you reach your goals. Stay strong, live long!
          </p>
          <div className="flex justify-center space-x-4 ">
            {/* Facebook */}
            <a href="#" className="hover:text-red-500" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.95v-7.04H8v-2.91h2.5V9.41c0-2.47 1.47-3.84 3.73-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87H17l-.4 2.91h-2.36v7.04A10 10 0 0022 12z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:text-red-500" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c13 8 27-3 27-16a10.48 10.48 0 00-.08-1.7A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-red-500" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5C19.1 2 21 3.9 21 6.25v8.5C21 17.1 19.1 19 16.25 19h-8.5C4.9 19 3 17.1 3 14.75v-8.5C3 3.9 4.9 2 7.75 2zm0 2C6.8 4 6 4.8 6 5.75v8.5c0 .95.8 1.75 1.75 1.75h8.5c.95 0 1.75-.8 1.75-1.75v-8.5C18 4.8 17.2 4 16.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800">
        <div className="px-6 py-6 text-center text-sm">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} SPORTDUNIYA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterMain;

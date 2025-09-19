import React from 'react';
import { Link } from 'react-router-dom';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';

function NotFound() {
  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white min-h-[70vh]">
        <h1 className="text-8xl font-extrabold text-red-700 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          The page you are looking for doesn’t exist or has been moved. Please check the URL or go back to the homepage.
        </p>
        <Link to="/" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-medium transition duration-300">
          Go to Homepage
        </Link>
      </div>

      <FooterMain />
    </>
  );
}

export default NotFound;

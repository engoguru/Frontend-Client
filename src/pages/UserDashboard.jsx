// import React, { useState } from 'react';
// import UserHeader from '../components/UserSection/UserHeader';
// import Address from '../components/UserSection/Address';
// import EditUser from '../components/UserSection/EditUser';
// import Dashboard from '../components/UserSection/Dashboard';
// import OrderHistory from '../components/UserSection/OrderHistory';

// function UserDashboard() {
//   const [currentPage, setCurrentPage] = useState('Dashboard');

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'Dashboard':
//         return <Dashboard />;
//       case 'Address':
//         return <Address />;
//       case 'Edit Profile':
//         return <EditUser />;
//       case 'Order History':
//         return <OrderHistory />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex flex-col md:flex-row">
//       {/* Sidebar/Header */}
//       <div className="w-full md:w-1/4 bg-gray-200">
//         <UserHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
//       </div>

//       {/* Page content */}
//       <div className="w-full md:w-3/4 p-4">
//         {renderPage()}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from '../components/UserSection/UserHeader';
import Address from '../components/UserSection/Address';
import EditUser from '../components/UserSection/EditUser';
import Dashboard from '../components/UserSection/Dashboard';
import OrderHistory from '../components/UserSection/OrderHistory';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';

function UserDashboard() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.section;
    if (section === 'orders') {
      setCurrentPage('Order History');
    } else {
      setCurrentPage('Dashboard');
    }
  }, [location]);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Address':
        return <Address />;
      case 'Edit Profile':
        return <EditUser />;
      case 'Order History':
        return <OrderHistory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <div className="w-full min-h-screen bg-white pt-22 sm:pt-16 md:pt-28">
      {/* Flex Layout: Column on mobile, Row on desktop */}
      <div className="flex flex-col md:flex-row w-full h-full">
        
        {/* Sidebar / Header */}
        <div className="w-full md:w-1/4 bg-gray-200">
          <UserHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 p-2">
          {renderPage()}
        </div>

      </div>
    </div>
    <FooterMain/>
    </>
  );
}

export default UserDashboard;

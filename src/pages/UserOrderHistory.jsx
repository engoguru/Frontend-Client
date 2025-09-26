import React, {useState} from 'react'
import UserHeader from '../components/UserSection/UserHeader';
import Address from '../components/UserSection/Address';
import EditUser from '../components/UserSection/EditUser';
import Dashboard from '../components/UserSection/Dashboard';
import OrderHistory from '../components/UserSection/OrderHistory';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';


function UserOrderHistory() {
 const [currentPage, setCurrentPage] = useState('Address');

  return (
 <>
 
  <NavbarTop/>
    <NavbarBottom/>
    <div className="w-full min-h-screen bg-white pt-16 md:pt-28">
      {/* Flex Layout: Column on mobile, Row on desktop */}
      <div className="flex flex-col md:flex-row w-full h-full">
        
        {/* Sidebar / Header */}
        <div className="w-full md:w-1/4 bg-gray-200">
          <UserHeader  />
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 p-2">
    {<OrderHistory/>}
        </div>

      </div>
    </div>
    <FooterMain/>
 </>
  )
}

export default UserOrderHistory
import React from 'react'
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import HomeBanner from '../components/HomeSections/HomeBanner';
import HomeFeature from '../components/HomeSections/HomeFeature';
import HomePopular from '../components/HomeSections/HomePopular';
import HomeFeature2 from '../components/HomeSections/HomeFeature2';
import HomeFeature3 from '../components/HomeSections/HomeFeature3';
import HomeSupport from '../components/HomeSections/HomeSupport';
import FooterMain from '../components/Footer/FooterMain';
function Home() {

  return (
    <div >
      <NavbarTop />
      <NavbarBottom />
      
      {/* Main content wrapper with horizontal padding */}
      <div className="home-container px-6 ">
        <div className="space-y-6 md:space-y-10">
          <HomeBanner />
          <HomePopular />
          <HomeFeature />
          <HomeFeature2 />
          <HomeFeature3 />
          <HomeSupport />
        </div>
      </div>
      <FooterMain />
    </div>
  )
}

export default Home
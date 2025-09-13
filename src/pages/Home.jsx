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
    <div className="pt-28"> {/* Added padding-top to account for fixed navbars */}
        <NavbarTop/>
        <NavbarBottom/>
        <HomeBanner/>
        {/* Main content wrapper with horizontal padding */}
        <div className="px-6">
          <HomePopular/>
          <HomeFeature/>
          <HomeFeature2/>
          <HomeFeature3/>
          <HomeSupport/>
        </div>
        <FooterMain/>
        </div>
  )
}

export default Home
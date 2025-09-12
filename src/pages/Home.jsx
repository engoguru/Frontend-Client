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
    <div>
        <NavbarTop/>
        <NavbarBottom/>
        <HomeBanner/>
        <HomePopular/>
        <HomeFeature/>
        <HomeFeature2/>
        <HomeFeature3/>
        <HomeSupport/>
        <FooterMain/>
        </div>
  )
}

export default Home
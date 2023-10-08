import React, { useState } from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import './Main.css';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Main = ({ isLoggedIn, toggleSidebar }) => {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        toggleSidebar={toggleSidebar}
      />
      <Promo />
      <NavTab />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Footer />
    </>
  );
};

export default Main;

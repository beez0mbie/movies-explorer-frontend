import React, { useState } from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import './Main.css';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';

const Main = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        onClick={() => setIsOpen(true)}
      />
      <div>
        <Promo />
        <NavTab />
        <AboutProject />
        <Tech />
        <AboutMe />
        <Portfolio />
      </div>
      <Footer />
      <SideBar isOpen={isOpen} />
    </div>
  );
};

export default Main;

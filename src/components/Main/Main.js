import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import './Main.css';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Main = ({ isLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <section>
        <h2>Main</h2>
        <Promo />
        <NavTab />
        <AboutProject />
        <Tech />
        <AboutMe />
        <Portfolio />
      </section>
      <Footer />
    </div>
  );
};

export default Main;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.svg';

const Header = ({ isLoggedIn, toggleSidebar }) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header${isMainPage ? ' header_pink' : ''}`}>
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className="header__logo"
        />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isMainPage={isMainPage}
        toggleSidebar={toggleSidebar}
      />
    </header>
  );
};

export default Header;

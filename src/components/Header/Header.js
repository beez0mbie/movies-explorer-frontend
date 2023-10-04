import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.svg';

const Header = ({ isLoggedIn }) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <div className={`header${isMainPage ? ' header_pink' : ''}`}>
      <Link to="/">
        <img
          src={logo}
          alt="Логотип 'Место'"
          className="header__logo"
        />
      </Link>
      <Navigation isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Header;

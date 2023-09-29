import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({ isLoggedIn }) => {
  return (
    <section>
      <h5>Header</h5>
      <Link to="/">Logo</Link>
      <Navigation isLoggedIn={isLoggedIn} />
    </section>
  );
};

export default Header;

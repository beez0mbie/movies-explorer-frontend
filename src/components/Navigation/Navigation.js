import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isLoggedIn }) => {
  return (
    <div>
      <h6>Navigation</h6>
      {isLoggedIn ? (
        <>
          <Link to="/movies">Movies</Link>
          <Link to="/saved-movies">Saved Movies</Link>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Register</Link>
          <Link to="/signin">Login</Link>
        </>
      )}
    </div>
  );
};

export default Navigation;

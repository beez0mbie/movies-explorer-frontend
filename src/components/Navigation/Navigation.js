import React from 'react';
import { Link } from 'react-router-dom';
import Account from '../Account/Account';
import './Navigation.css';

const Navigation = ({ isLoggedIn }) => {
  return (
    <div className="navigation">
      {isLoggedIn ? (
        <>
          <Link
            className="navigation__link"
            to="/movies">
            Фильмы
          </Link>
          <Link
            className="navigation__link"
            to="/saved-movies">
            Сохраненные фильмы
          </Link>
          <Link
            className="navigation__link"
            to="/profile">
            <Account isPink />
          </Link>
        </>
      ) : (
        <>
          <Link
            className="navigation__link"
            to="/signup">
            Регистрация
          </Link>
          <Link
            className="navigation__link"
            to="/signin">
            Войти
          </Link>
        </>
      )}
    </div>
  );
};

export default Navigation;

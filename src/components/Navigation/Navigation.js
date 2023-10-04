import React from 'react';
import { Link } from 'react-router-dom';
import Account from '../Account/Account';
import './Navigation.css';

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <div className="navigation__container">
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
            <Account isPink />
          </div>
          <button className="navigation__hamburger"></button>
        </>
      ) : (
        <>
          <Link
            className="navigation__link navigation__link_f-medium"
            to="/signup">
            Регистрация
          </Link>
          <Link
            className="navigation__link navigation__link_black navigation__link_f-medium"
            to="/signin">
            Войти
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;

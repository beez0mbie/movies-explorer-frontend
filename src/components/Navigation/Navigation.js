import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../Account/Account';
import './Navigation.css';

const Navigation = ({ isLoggedIn, isMainPage, toggleSidebar }) => {
  const location = useLocation();
  const isMovies = location.pathname === '/movies';
  const isSavedMovies = location.pathname === '/saved-movies';
  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <div className="navigation__container">
            <ul className="navigation__list">
              <li>
                <Link
                  className={`navigation__link ${isMovies && 'navigation__link_f-bold'}`}
                  to="/movies">
                  Фильмы
                </Link>
              </li>
              <li>
                <Link
                  className={`navigation__link ${isSavedMovies && 'navigation__link_f-bold'}`}
                  to="/saved-movies">
                  Сохраненные фильмы
                </Link>
              </li>
            </ul>
            <Account isPink={isMainPage} />
          </div>
          <button
            type="button"
            className="navigation__hamburger"
            onClick={toggleSidebar}></button>
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

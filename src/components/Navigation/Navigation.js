import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../Account/Account';
import './Navigation.css';
import { pathNames } from '../../utils/constants';

const Navigation = ({ isLoggedIn, isMainPage, toggleSidebar }) => {
  const location = useLocation();
  const isMovies = location.pathname === pathNames.movies;
  const isSavedMovies = location.pathname === pathNames.savedMovies;
  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <div className="navigation__container">
            <ul className="navigation__list">
              <li>
                <Link
                  className={`navigation__link ${isMovies && 'navigation__link_f-bold'}`}
                  to={pathNames.movies}>
                  Фильмы
                </Link>
              </li>
              <li>
                <Link
                  className={`navigation__link ${isSavedMovies && 'navigation__link_f-bold'}`}
                  to={pathNames.savedMovies}>
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
            to={pathNames.signUp}>
            Регистрация
          </Link>
          <Link
            className="navigation__link navigation__link_black navigation__link_f-medium"
            to={pathNames.signIn}>
            Войти
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;

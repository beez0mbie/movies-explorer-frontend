import React from 'react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import Account from '../Account/Account';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const handleMouseDown = (evt) => {
    if (evt.target.classList.contains('sidebar_opened')) {
      toggleSidebar();
    }
  };
  const location = useLocation();
  const isMain = location.pathname === '/';
  const isMovies = location.pathname === '/movies';
  const isSavedMovies = location.pathname === '/saved-movies';
  return (
    <div
      className={`sidebar ${isOpen ? 'sidebar_opened' : ''}`}
      onMouseDown={handleMouseDown}>
      <div className="sidebar__container">
        <button
          aria-label="Закрыть сайдбар"
          type="button"
          className="sidebar__close-button"
          onClick={toggleSidebar}
        />
        <div className="sidebar__nav">
          <ul className="sidebar__list">
            <li>
              <Link
                className={`sidebar__link ${isMain && 'sidebar__link_active'}`}
                to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link
                className={`sidebar__link ${isMovies && 'sidebar__link_active'}`}
                to="/movies">
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                className={`sidebar__link ${isSavedMovies && 'sidebar__link_active'}`}
                to="/saved-movies">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Account />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

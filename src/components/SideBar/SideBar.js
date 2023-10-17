import React from 'react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import Account from '../Account/Account';
import { PATH_NAMES } from '../../utils/constants';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const handleMouseDown = (evt) => {
    if (evt.target.classList.contains('sidebar_opened')) {
      toggleSidebar();
    }
  };
  const location = useLocation();
  const isMain = location.pathname === PATH_NAMES.root;
  const isMovies = location.pathname === PATH_NAMES.movies;
  const isSavedMovies = location.pathname === PATH_NAMES.savedMovies;
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
                onClick={toggleSidebar}
                className={`sidebar__link ${isMain && 'sidebar__link_active'}`}
                to={PATH_NAMES.root}>
                Главная
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleSidebar}
                className={`sidebar__link ${isMovies && 'sidebar__link_active'}`}
                to={PATH_NAMES.movies}>
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleSidebar}
                className={`sidebar__link ${isSavedMovies && 'sidebar__link_active'}`}
                to={PATH_NAMES.savedMovies}>
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Account handleClick={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

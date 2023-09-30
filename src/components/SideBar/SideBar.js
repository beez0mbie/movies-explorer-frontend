import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import Account from '../Account/Account';

const SideBar = ({ isOpen }) => {
  const handleMouseDown = () => console.log('handleMouseDown');
  const onClose = () => console.log('onClose');
  return (
    <div
      className={`sidebar ${isOpen ? 'sidebar_opened' : ''}`}
      onMouseDown={handleMouseDown}>
      <div className="sidebar__container">
        <button
          aria-label="Закрыть сайдбар"
          type="button"
          className="sidebar__close-button"
          onClick={onClose}
        />
        <div className="sidebar__nav">
          <ul className="sidebar__list">
            <li>
              <Link
                className="sidebar__list-link"
                to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link
                className="sidebar__list-link"
                to="/movies">
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                className="sidebar__list-link"
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

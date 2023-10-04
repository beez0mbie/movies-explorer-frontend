import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <section>
      <ul className="nav-tab">
        <li className="nav-tab__item">
          <a
            className="nav-tab__link"
            href="#about-project">
            О проекте
          </a>
        </li>
        <li className="nav-tab__item">
          <a
            className="nav-tab__link"
            href="#tech">
            Технологии
          </a>
        </li>
        <li className="nav-tab__item">
          <a
            className="nav-tab__link"
            href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
};

export default NavTab;

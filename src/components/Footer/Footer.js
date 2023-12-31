import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <nav>
          <ul className="footer__nav-list">
            <li className="footer__nav-list-item">
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer__link">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__nav-list-item">
              <a
                href="https://github.com/beez0mbie"
                target="_blank"
                rel="noreferrer"
                className="footer__link">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

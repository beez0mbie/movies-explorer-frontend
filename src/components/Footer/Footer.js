import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="footer__container"> */}
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <nav className="footer__nav">
          <a
            href="https://practicum.yandex.ru/"
            target="blank"
            className="footer__link">
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/beez0mbie"
            target="blank"
            className="footer__link">
            Github
          </a>
        </nav>
      </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;

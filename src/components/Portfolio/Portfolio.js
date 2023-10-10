import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://beez0mbie.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://beez0mbie.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://mesto.ashmelkov.nomoredomainsicu.ru/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;

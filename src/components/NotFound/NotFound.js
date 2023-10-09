import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found">
      <section className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__desc">Страница не найдена</p>
        <Link
          className="not-found__link"
          to={'..'}>
          Назад
        </Link>
      </section>
    </main>
  );
};

export default NotFound;

import React, { useState } from 'react';
import './MoviesCard.css';
import MovieImage from '../../images/movie-temp.png';
import { Link } from 'react-router-dom';

const MoviesCard = ({ shouldRemowe, name }) => {
  const [like, setLike] = useState(false);
  const defaultUrl = 'https://www.kinopoisk.ru/film/1302273/';

  return (
    <li className="movie-card">
      <Link
        className="movie-card__link"
        to={defaultUrl}
        target="_blank">
        {shouldRemowe ? (
          <div className="movie-card__remove"></div>
        ) : (
          <div
            onClick={(e) => {
              e.preventDefault();
              setLike((prev) => !prev);
            }}
            className={`movie-card__like ${like && 'movie-card__like_active'}`}>
            {!like && <p className="movie-card__like-paragraph">Сохранить</p>}
          </div>
        )}
        <figure className="movie-card__image-container">
          <img
            src={MovieImage}
            alt={name}
            className="movie-card__image"
          />
          <figcaption className="movie-card__desc">
            <h2 className="movie-card__name">{name}</h2>
            <p className="movie-card__duration">1ч 17м</p>
          </figcaption>
        </figure>
      </Link>
    </li>
  );
};

export default MoviesCard;

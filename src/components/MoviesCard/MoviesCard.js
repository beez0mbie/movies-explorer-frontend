import React, { useState } from 'react';
import './MoviesCard.css';
import { Link } from 'react-router-dom';
import { BEAT_FILM_URL } from '../../env';

const MoviesCard = ({ nameRU, duration, trailerLink, image, shouldRemowe }) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const [like, setLike] = useState(false);

  return (
    <li className="movie-card">
      <Link
        className="movie-card__link"
        to={trailerLink}
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
            src={`${BEAT_FILM_URL}${image.formats.thumbnail.url}`}
            alt={image.name}
            className="movie-card__image"
          />
          <figcaption className="movie-card__desc">
            <h2 className="movie-card__name">{nameRU}</h2>
            <p className="movie-card__duration">{`${hours}ч ${minutes}м`}</p>
          </figcaption>
        </figure>
      </Link>
    </li>
  );
};

export default MoviesCard;

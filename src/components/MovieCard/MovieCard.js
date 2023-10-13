import React, { useState } from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { BEAT_FILM_URL } from '../../env';
import { mainApi } from '../../utils/MainApi';

const MovieCard = ({ movie, shouldRemowe }) => {
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const [like, setLike] = useState(false);

  const handleLikeCard = (e) => {
    e.preventDefault();
    try {
      if (!like) {
        mainApi.addMovie(movie);
      } else {
        mainApi.deleteMovie(movie.id);
      }
    } catch (error) {
      console.error('MovieCard handleLikeCard', error);
    }
    setLike((prev) => !prev);
  };

  const handleRemoveCard = (e) => {
    e.preventDefault();
    try {
      mainApi.deleteMovie(movie.id);
    } catch (error) {
      console.error('MovieCard handleRemoveCard', error);
    }
  };

  return (
    <li className="movie-card">
      <Link
        className="movie-card__link"
        to={movie.trailerLink}
        target="_blank">
        {shouldRemowe ? (
          <button
            className="movie-card__remove"
            onClick={handleRemoveCard}></button>
        ) : (
          <button
            onClick={handleLikeCard}
            className={`movie-card__like ${like && 'movie-card__like_active'}`}>
            {!like && <p className="movie-card__like-paragraph">Сохранить</p>}
          </button>
        )}
        <figure className="movie-card__image-container">
          <img
            src={`${BEAT_FILM_URL}${movie.image.formats.thumbnail.url}`}
            alt={movie.image.name}
            className="movie-card__image"
          />
          <figcaption className="movie-card__desc">
            <h2 className="movie-card__name">{movie.nameRU}</h2>
            <p className="movie-card__duration">{`${hours}ч ${minutes}м`}</p>
          </figcaption>
        </figure>
      </Link>
    </li>
  );
};

export default MovieCard;

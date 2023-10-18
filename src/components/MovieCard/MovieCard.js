import React, { useState, useContext, useEffect } from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts';

const MovieCard = ({ movie, shouldRemove }) => {
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const [like, setLike] = useState(false);
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);

  const foundSavedCardIndex = savedMovies.all.findIndex(
    (element) => element.movieId === movie.movieId,
  );

  useEffect(() => {
    if (foundSavedCardIndex >= 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [savedMovies.all, foundSavedCardIndex]);

  const handleLikeCard = (e) => {
    e.preventDefault();
    try {
      if (foundSavedCardIndex === -1) {
        mainApi
          .addMovie(movie)
          .then((data) => {
            setLike(true);
            setSavedMovies((oldState) => {
              return { all: [data, ...oldState.all], toRender: [data, ...oldState.toRender] };
            });
          })
          .catch((err) => console.error(`MovieCard mainApi.addMovie():\n ${err}`));
      } else {
        deleteMovieCard(movie.movieId);
        setLike(false);
      }
    } catch (error) {
      console.error('MovieCard handleLikeCard', error);
    }
  };

  const deleteMovieCard = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((oldState) => {
          return {
            all: oldState.all.filter((movie) => movie.movieId !== movieId),
            toRender: oldState.toRender.filter((movie) => movie.movieId !== movieId),
          };
        });
        setLike(false);
      })
      .catch((err) => console.error(`MovieCard mainApi.deleteMovie():\n ${err}`));
  };

  const handleRemoveCard = (e) => {
    e.preventDefault();
    deleteMovieCard(movie.movieId);
  };

  return (
    <li className="movie-card">
      <Link
        className="movie-card__link"
        to={movie.trailerLink}
        target="_blank">
        {shouldRemove ? (
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
            src={movie.thumbnail}
            alt={`thumbnail of ${movie.nameRU}`}
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

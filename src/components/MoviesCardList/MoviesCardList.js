import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

const MoviesCardList = ({
  movies,
  shouldRemove,
  showError,
  moviesListRef,
  handleDeleteMovie,
  moviesToRender,
}) => {
  return (
    <section className="movies-cards">
      {movies && movies.length > 0 && (
        <ul
          ref={moviesListRef}
          className="movies-cards__list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.movieId}
              movie={movie}
              shouldRemove={shouldRemove}
              handleDeleteMovie={handleDeleteMovie}
              moviesToRender={moviesToRender}
            />
          ))}
        </ul>
      )}
      {showError && (
        <p className="movies-cards__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз
        </p>
      )}
    </section>
  );
};

export default MoviesCardList;

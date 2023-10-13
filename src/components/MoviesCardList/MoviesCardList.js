import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

const MoviesCardList = ({ movies, shouldRemove, showError, moviesListRef }) => {
  return (
    <section className="movies-cards">
      {movies && movies.length > 0 && (
        <ul
          ref={moviesListRef}
          className="movies-cards__list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              nameRU={movie.nameRU}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              image={movie.image}
              movie={movie}
              shouldRemove={shouldRemove}
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

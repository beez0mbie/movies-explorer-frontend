import React, { useEffect, useState, useRef } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const MoviesCardList = ({ movies, shouldRemove, showError, moviesListRef, moviesToRender }) => {
  // const desktopCardsToShow = 12;
  // const tabletCardsToShow = 8;
  // const mobileCardsToShow = 5;
  // const desktopMinWidth = 1052;
  // const mobileMaxWidth = 657;
  // const windowWidth = useWindowWidth();
  // const [moviesToRender, setMoviesToRender] = useState([]);
  // const [maxPossibleCards, setMaxPossibleCards] = useState(mobileCardsToShow);
  // const [chunk, setChunk] = useState(2);
  // const [moviesListLength, setMoviesListLength] = useState(0);
  // useEffect(() => {
  //   console.log('MoviesCardList windowWidth', windowWidth);
  //   if (windowWidth >= desktopMinWidth) {
  //     console.log('Desktop');
  //     if (moviesListLength < desktopCardsToShow) {
  //       console.log('Set cards for Desktop');
  //       setMaxPossibleCards(desktopCardsToShow);
  //     }
  //     setChunk(3);
  //   } else if (windowWidth < desktopMinWidth && windowWidth > mobileMaxWidth) {
  //     console.log('Tablet');
  //     if (moviesListLength < tabletCardsToShow) {
  //       console.log('moviesListLength', moviesListLength);
  //       console.log('Set cards for Tablet');
  //       setMaxPossibleCards(tabletCardsToShow);
  //     }
  //     setChunk(2);
  //   } else {
  //     console.log('Mobile');
  //     if (moviesListLength === 0) {
  //       console.log('Set cards for Mobile');
  //       setMaxPossibleCards(mobileCardsToShow);
  //     }
  //     setChunk(2);
  //   }
  //   setMoviesToRender(movies.slice(0, maxPossibleCards));
  // }, [windowWidth, movies, setMoviesToRender, maxPossibleCards, chunk]);

  // const moviesList = useRef(null);
  // useEffect(() => {
  //   if (moviesList.current && moviesList.current.childNodes) {
  //     const moviesListChildsCount = moviesList.current.childNodes.length;
  //     setMoviesListLength(moviesListChildsCount);
  //     console.log('moviesListChildsCount', moviesListChildsCount);
  //   }
  // }, [moviesToRender, moviesList]);

  // const handleMoreClick = () => {
  //   console.log(maxPossibleCards);
  //   setMaxPossibleCards((prev) => prev + chunk);
  //   console.log(maxPossibleCards);
  // };
  // const handleShouldAdd = () => {};
  return (
    <section className="movies-cards">
      {movies && movies.length > 0 && (
        <ul
          ref={moviesListRef}
          className="movies-cards__list">
          {moviesToRender.map((movie) => (
            <MoviesCard
              key={movie.id}
              nameRU={movie.nameRU}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              image={movie.image}
              shouldRemove={shouldRemove}
            />
          ))}
        </ul>
      )}
      {showError && (
        <p>
          «Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
          недоступен. Подождите немного и попробуйте ещё раз»
        </p>
      )}
      {/* <button onClick={handleMoreClick}>MORE</button> */}
    </section>
  );
};

export default MoviesCardList;

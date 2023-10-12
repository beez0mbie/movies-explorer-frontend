import React, { useState, useEffect, useRef } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldAddMovies, setShouldAddMovies] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [wasSubmit, setWasSubmit] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSubmit = async () => {
    setWasSubmit(false);
    setIsLoading(true);
    setShowError(false);
    try {
      const items = await moviesApi.getMovies();
      setMovies(items);
    } catch (error) {
      console.log('Movies -> handleSubmit', error);
      setShowError(true);
    }
    setWasSubmit(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (wasSubmit && movies && movies.length === 0) {
      setShowMessage(true);
    }
    return () => {
      setShowMessage(false);
    };
  }, [movies, wasSubmit, showMessage]);

  const desktopCardsToShow = 12;
  const tabletCardsToShow = 8;
  const mobileCardsToShow = 5;
  const desktopMinWidth = 1052;
  const mobileMaxWidth = 657;
  const windowWidth = useWindowWidth();
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [maxPossibleCards, setMaxPossibleCards] = useState(mobileCardsToShow);
  const [chunk, setChunk] = useState(2);
  const [moviesListLength, setMoviesListLength] = useState(0);
  useEffect(() => {
    console.log('MoviesCardList windowWidth', windowWidth);
    if (windowWidth >= desktopMinWidth) {
      console.log('Desktop');
      if (moviesListLength < desktopCardsToShow) {
        console.log('Set cards for Desktop');
        setMaxPossibleCards(desktopCardsToShow);
      }
      setChunk(3);
    } else if (windowWidth < desktopMinWidth && windowWidth > mobileMaxWidth) {
      console.log('Tablet');
      if (moviesListLength < tabletCardsToShow) {
        console.log('moviesListLength', moviesListLength);
        console.log('Set cards for Tablet');
        setMaxPossibleCards(tabletCardsToShow);
      }
      setChunk(2);
    } else {
      console.log('Mobile');
      if (moviesListLength === 0) {
        console.log('Set cards for Mobile');
        setMaxPossibleCards(mobileCardsToShow);
      }
      setChunk(2);
    }
    setMoviesToRender(movies.slice(0, maxPossibleCards));
  }, [windowWidth, movies, setMoviesToRender, maxPossibleCards, chunk, moviesListLength]);

  const moviesList = useRef(null);
  useEffect(() => {
    if (moviesList.current && moviesList.current.childNodes) {
      const moviesListChildsCount = moviesList.current.childNodes.length;
      setMoviesListLength(moviesListChildsCount);
      console.log('moviesListChildsCount', moviesListChildsCount);
    }
  }, [moviesToRender, moviesList]);

  const handleMoreClick = () => {
    console.log(maxPossibleCards);
    setMaxPossibleCards((prev) => prev + chunk);
    console.log(maxPossibleCards);
  };

  useEffect(() => {
    if (moviesListLength > 0 && moviesListLength < movies.length) {
      setShouldAddMovies(true);
    } else {
      setShouldAddMovies(false);
    }
  }, [moviesListLength, movies]);

  return (
    <main className="movies">
      <SearchForm handleSubmit={handleSubmit} />
      <MoviesCardList
        movies={movies}
        showError={showError}
        moviesListRef={moviesList}
        moviesToRender={moviesToRender}
      />
      <Preloader
        showMessage={showMessage}
        shouldAdd={shouldAddMovies}
        isLoading={isLoading}
        handleMoreClick={handleMoreClick}
      />
    </main>
  );
};

export default Movies;

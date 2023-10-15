import React, { useState, useEffect, useRef, useContext } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { processMovies } from '../../utils/processMovie';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts';

const Movies = () => {
  const desktopMinWidth = 1052;
  const mobileMaxWidth = 657;
  const desktopCardsToShow = 12;
  const tabletCardsToShow = 8;
  const mobileCardsToShow = 5;
  const minChunk = 2;
  const maxChunk = 3;

  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [shouldAddMovies, setShouldAddMovies] = useState(false);
  const [wasSubmit, setWasSubmit] = useState(false);
  const [movies, setMovies] = useState(() => JSON.parse(localStorage.getItem('movies')) || []);
  const [moviesToRender, setMoviesToRender] = useState(
    () => JSON.parse(localStorage.getItem('moviesToRender')) || [],
  );
  const [maxPossibleCards, setMaxPossibleCards] = useState(
    () => JSON.parse(localStorage.getItem('maxPossibleCards')) || mobileCardsToShow,
  );
  const [chunk, setChunk] = useState(minChunk);
  const [moviesListLength, setMoviesListLength] = useState(
    () => JSON.parse(localStorage.getItem('moviesListLength')) || 0,
  );

  const windowWidth = useWindowWidth();

  const moviesList = useRef(null);

  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        if (data) {
          setSavedMovies(data);
        }
      })
      .catch((err) => console.error(`Error mainApi.getMovies():\n ${err}`));
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('moviesToRender', JSON.stringify(moviesToRender));
    localStorage.setItem('maxPossibleCards', JSON.stringify(maxPossibleCards));
    localStorage.setItem('moviesListLength', JSON.stringify(moviesListLength));
  }, [movies, moviesToRender, maxPossibleCards, moviesListLength]);

  useEffect(() => {
    if (windowWidth >= desktopMinWidth) {
      if (moviesListLength < desktopCardsToShow) {
        setMaxPossibleCards(desktopCardsToShow);
      }
      setChunk(maxChunk);
    } else if (windowWidth < desktopMinWidth && windowWidth > mobileMaxWidth) {
      if (moviesListLength < tabletCardsToShow) {
        setMaxPossibleCards(tabletCardsToShow);
      }
      setChunk(minChunk);
    } else {
      if (moviesListLength === 0) {
        setMaxPossibleCards(mobileCardsToShow);
      }
      setChunk(minChunk);
    }
    const moviesToRenderLocal = movies.slice(0, maxPossibleCards);
    setMoviesToRender(moviesToRenderLocal);
  }, [windowWidth, movies, setMoviesToRender, maxPossibleCards, chunk, moviesListLength]);

  useEffect(() => {
    if (moviesList.current && moviesList.current.childNodes) {
      const moviesListChildsCount = moviesList.current.childNodes.length;
      setMoviesListLength(moviesListChildsCount);
    }
  }, [moviesToRender, moviesList]);

  useEffect(() => {
    if (moviesListLength > 0 && moviesListLength < movies.length) {
      setShouldAddMovies(true);
    } else {
      setShouldAddMovies(false);
    }
    return () => {
      setShouldAddMovies(false);
    };
  }, [moviesListLength, movies]);

  useEffect(() => {
    if (wasSubmit && movies && movies.length === 0) {
      setShowMessage(true);
    }
    return () => {
      setShowMessage(false);
    };
  }, [movies, wasSubmit, showMessage]);

  const handleSubmit = async () => {
    setWasSubmit(false);
    setIsLoading(true);
    setShowError(false);
    try {
      const items = await moviesApi.getMovies();
      const processedMovies = processMovies(items);
      setMovies(processedMovies);
    } catch (error) {
      console.error('Movies handleSubmit', error);
      setShowError(true);
    }
    setWasSubmit(true);
    setIsLoading(false);
  };

  const handleMoreClick = () => {
    setMaxPossibleCards((prev) => prev + chunk);
  };

  return (
    <main className="movies">
      <SearchForm handleSubmit={handleSubmit} />
      <MoviesCardList
        movies={moviesToRender}
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

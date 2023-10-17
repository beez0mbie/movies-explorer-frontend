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
import { useShowMessageAfterSubmit } from '../../hooks/useShowMessageAfterSubmit';
import {
  desktopMinWidth,
  mobileMaxWidth,
  desktopCardsToShow,
  tabletCardsToShow,
  mobileCardsToShow,
  minChunk,
  maxChunk,
  moviesStore,
} from '../../utils/constants';
import { getLocalStore, setLocalStore } from '../../utils/localStorage';
import { getMaxPossibleCards } from '../../utils/getMaxPossibleCards';

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [shouldAddMovies, setShouldAddMovies] = useState(false);
  const [wasSubmit, setWasSubmit] = useState(false);
  const [movies, setMovies] = useState(getLocalStore(moviesStore.movies) || []);
  const [allMovies, setAllMovies] = useState(getLocalStore(moviesStore.all) || []);
  const [moviesToRender, setMoviesToRender] = useState(
    getLocalStore(moviesStore.moviesToRender) || [],
  );
  const [maxPossibleCards, setMaxPossibleCards] = useState(
    getLocalStore(moviesStore.maxPossibleCards) || mobileCardsToShow,
  );
  const [moviesListLength, setMoviesListLength] = useState(
    getLocalStore(moviesStore.moviesListLength) || 0,
  );

  const [chunk, setChunk] = useState(minChunk);

  const windowWidth = useWindowWidth();

  const moviesList = useRef(null);

  const showMessage = useShowMessageAfterSubmit(movies, wasSubmit);
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);

  useEffect(() => {
    if (savedMovies.length === 0) {
      mainApi
        .getMovies()
        .then((data) => {
          if (data) {
            setSavedMovies(data);
          }
        })
        .catch((err) => console.error(`Error mainApi.getMovies():\n ${err}`));
    }
  }, []);

  useEffect(() => {
    setLocalStore(moviesStore.movies, movies);
    setLocalStore(moviesStore.all, allMovies);
    setLocalStore(moviesStore.moviesToRender, moviesToRender);
    setLocalStore(moviesStore.maxPossibleCards, maxPossibleCards);
    setLocalStore(moviesStore.moviesListLength, moviesListLength);
  }, [movies, moviesToRender, maxPossibleCards, moviesListLength, allMovies]);

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

  const handleSubmit = async (searchText, checkbox) => {
    const maxCards = getMaxPossibleCards(windowWidth);
    console.log(maxCards);
    setMaxPossibleCards(maxCards);
    setWasSubmit(false);
    setIsLoading(true);
    setShowError(false);
    try {
      const items = await moviesApi.getMovies();
      setAllMovies(items);
      const processedMovies = processMovies(items, searchText, checkbox);
      setMovies(processedMovies);
    } catch (error) {
      console.error('Movies handleSubmit', error);
      setShowError(true);
    }
    setWasSubmit(true);
    setIsLoading(false);
  };

  const handleProcess = async (searchText, checkbox) => {
    setIsLoading(true);
    const processedMovies = processMovies(allMovies, searchText, checkbox);
    setMovies(processedMovies);
    setIsLoading(false);
  };

  const handleMoreClick = () => {
    setMaxPossibleCards((prev) => prev + chunk);
  };

  return (
    <main className="movies">
      <SearchForm
        handleSubmit={handleSubmit}
        handleProcess={handleProcess}
      />
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

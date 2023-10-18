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
  DESKTOP_MIN_WIDTH,
  MOBILE_MAX_WIDTH,
  DESKTOP_CARDS_TO_SHOW,
  TABLET_CARDS_TO_SHOW,
  MOBILE_CARDS_TO_SHOW,
  MIN_CHUNKS,
  MAX_CHUNKS,
  MOVIES_STORE,
} from '../../utils/constants';
import { getLocalStore, setLocalStore } from '../../utils/localStorage';
import { getMaxPossibleCards } from '../../utils/getMaxPossibleCards';

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [shouldAddMovies, setShouldAddMovies] = useState(false);
  const [wasSubmit, setWasSubmit] = useState(false);
  const [movies, setMovies] = useState(getLocalStore(MOVIES_STORE.movies) || []);
  const [allMovies, setAllMovies] = useState(getLocalStore(MOVIES_STORE.all) || []);
  const [moviesToRender, setMoviesToRender] = useState(
    getLocalStore(MOVIES_STORE.moviesToRender) || [],
  );
  const [maxPossibleCards, setMaxPossibleCards] = useState(
    getLocalStore(MOVIES_STORE.maxPossibleCards) || MOBILE_CARDS_TO_SHOW,
  );
  const [moviesListLength, setMoviesListLength] = useState(
    getLocalStore(MOVIES_STORE.moviesListLength) || 0,
  );

  const [chunk, setChunk] = useState(MIN_CHUNKS);

  const windowWidth = useWindowWidth();

  const moviesList = useRef(null);

  const showMessage = useShowMessageAfterSubmit(movies, wasSubmit);
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);

  useEffect(() => {
    if (savedMovies.all.length === 0) {
      mainApi
        .getMovies()
        .then((data) => {
          if (data) {
            setSavedMovies({ all: data, toRender: data });
          }
        })
        .catch((err) => console.error(`Error mainApi.getMovies():\n ${err}`));
    }
  }, []);

  useEffect(() => {
    setLocalStore(MOVIES_STORE.movies, movies);
    setLocalStore(MOVIES_STORE.all, allMovies);
    setLocalStore(MOVIES_STORE.moviesToRender, moviesToRender);
    setLocalStore(MOVIES_STORE.maxPossibleCards, maxPossibleCards);
    setLocalStore(MOVIES_STORE.moviesListLength, moviesListLength);
  }, [movies, moviesToRender, maxPossibleCards, moviesListLength, allMovies]);

  useEffect(() => {
    if (windowWidth >= DESKTOP_MIN_WIDTH) {
      if (moviesListLength < DESKTOP_CARDS_TO_SHOW) {
        setMaxPossibleCards(DESKTOP_CARDS_TO_SHOW);
      }
      setChunk(MAX_CHUNKS);
    } else if (windowWidth < DESKTOP_MIN_WIDTH && windowWidth > MOBILE_MAX_WIDTH) {
      if (moviesListLength < TABLET_CARDS_TO_SHOW) {
        setMaxPossibleCards(TABLET_CARDS_TO_SHOW);
      }
      setChunk(MIN_CHUNKS);
    } else {
      if (moviesListLength === 0) {
        setMaxPossibleCards(MOBILE_CARDS_TO_SHOW);
      }
      setChunk(MIN_CHUNKS);
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
        isLoading={isLoading}
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

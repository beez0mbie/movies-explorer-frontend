import React, { useEffect, useContext, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts';
import { processMovies } from '../../utils/processMovie';

const SavedMovies = () => {
  const savedMoviesStateLocalStorageName = 'saved-movies-search-state';
  const [wasSubmit, setWasSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // SAVED LOGIC
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
  const [movies, setMovies] = useState(savedMovies || []);

  useEffect(() => {
    setMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (wasSubmit && movies && movies.length === 0) {
      setShowMessage(true);
    }
    return () => {
      setShowMessage(false);
    };
  }, [movies, wasSubmit, showMessage]);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        if (data) {
          setSavedMovies(data);
          const searchLocalStorageState = JSON.parse(
            localStorage.getItem(savedMoviesStateLocalStorageName),
          );
          if (searchLocalStorageState.input || searchLocalStorageState.checkbox) {
            const processedMovies = processMovies(
              savedMovies,
              searchLocalStorageState.input,
              searchLocalStorageState.checkbox,
            );
            setMovies(processedMovies);
          } else {
            setMovies(data);
          }
        }
      })
      .catch((err) => console.error(`Error mainApi.getMovies():\n ${err}`));
  }, []);

  const handleSubmit = async (searchText, checkbox) => {
    setWasSubmit(false);
    setIsLoading(true);
    setShowError(false);
    try {
      const processedMovies = processMovies(savedMovies, searchText, checkbox);
      setMovies(processedMovies);
    } catch (error) {
      console.error('Saved Movies handleSubmit', error);
      setShowError(true);
    }
    setWasSubmit(true);
    setIsLoading(false);
  };

  const handleProcess = async (searchText, checkbox) => {
    setIsLoading(true);
    const processedMovies = processMovies(savedMovies, searchText, checkbox);
    setMovies(processedMovies);
    setIsLoading(false);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        handleSubmit={handleSubmit}
        handleProcess={handleProcess}
      />
      <MoviesCardList
        movies={movies}
        shouldRemove={true}
        showError={showError}
      />
      <Preloader
        showMessage={showMessage}
        shouldAdd={false}
        isLoading={isLoading}
      />
    </main>
  );
};

export default SavedMovies;

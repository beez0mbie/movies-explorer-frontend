import React, { useEffect, useContext, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts';
import { processMovies } from '../../utils/processMovie';
import { useShowMessageAfterSubmit } from '../../hooks/useShowMessageAfterSubmit';
import { savedMoviesSearchLocalStore } from '../../utils/constants';
import { getLocalStore } from '../../utils/localStorage';

const SavedMovies = () => {
  const [wasSubmit, setWasSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
  const [movies, setMovies] = useState(savedMovies || []);

  const showMessage = useShowMessageAfterSubmit(movies, wasSubmit);

  useEffect(() => {
    setMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        if (data) {
          setSavedMovies(data);
          const searchLocalStoreState = getLocalStore(savedMoviesSearchLocalStore);
          if (searchLocalStoreState.input || searchLocalStoreState.checkbox) {
            const processedMovies = processMovies(
              savedMovies,
              searchLocalStoreState.input,
              searchLocalStoreState.checkbox,
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

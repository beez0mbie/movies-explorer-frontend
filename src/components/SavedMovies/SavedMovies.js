import React, { useEffect, useContext, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts';
import { processMovies } from '../../utils/processMovie';
import { useShowMessageAfterSubmit } from '../../hooks/useShowMessageAfterSubmit';

const SavedMovies = () => {
  const [wasSubmit, setWasSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);

  const showMessage = useShowMessageAfterSubmit(savedMovies.toRender, wasSubmit);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        if (data) {
          setSavedMovies({ all: data, toRender: data });
        }
      })
      .catch((err) => console.error(`Error mainApi.getMovies():\n ${err}`));
  }, []);

  const handleSubmit = async (searchText, checkbox) => {
    setWasSubmit(false);
    setIsLoading(true);
    setShowError(false);
    try {
      const processedMovies = processMovies(savedMovies.all, searchText, checkbox);
      setSavedMovies((oldState) => {
        return { all: oldState.all, toRender: processedMovies };
      });
    } catch (error) {
      console.error('Saved Movies handleSubmit', error);
      setShowError(true);
    }
    setWasSubmit(true);
    setIsLoading(false);
  };

  const handleProcess = async (searchText, checkbox) => {
    setIsLoading(true);
    const processedMovies = processMovies(savedMovies.all, searchText, checkbox);
    setSavedMovies((oldState) => {
      return { all: oldState.all, toRender: processedMovies };
    });
    setIsLoading(false);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        handleSubmit={handleSubmit}
        handleProcess={handleProcess}
      />
      <MoviesCardList
        movies={savedMovies.toRender}
        shouldRemove={true}
        showError={showError}
      />
      <Preloader
        showMessage={showMessage || savedMovies.toRender.length === 0}
        shouldAdd={false}
        isLoading={isLoading}
      />
    </main>
  );
};

export default SavedMovies;

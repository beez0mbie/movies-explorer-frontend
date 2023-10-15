import React, { useEffect, useContext } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts';

const SavedMovies = () => {
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

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        movies={savedMovies}
        shouldRemove={true}
      />
      <Preloader isHideButton />
    </main>
  );
};

export default SavedMovies;

import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList shouldRemowe />
      <Preloader isHideButton />
    </main>
  );
};

export default SavedMovies;

import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  return (
    <section>
      <h2>SavedMovies</h2>
      <MoviesCardList />
    </section>
  );
};

export default SavedMovies;

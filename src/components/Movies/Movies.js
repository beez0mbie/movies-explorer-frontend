import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  return (
    <section>
      <h2>Movies</h2>
      <SearchForm />
      <FilterCheckbox />
      <Preloader />
      <MoviesCardList />
    </section>
  );
};

export default Movies;

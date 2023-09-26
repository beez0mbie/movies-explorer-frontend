import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = () => {
  return (
    <div>
      <Header />
      <section>
        <h2>Movies</h2>
        <SearchForm />
        <FilterCheckbox />
        <Preloader />
        <MoviesCardList />
      </section>
      <Footer />
    </div>
  );
};

export default Movies;

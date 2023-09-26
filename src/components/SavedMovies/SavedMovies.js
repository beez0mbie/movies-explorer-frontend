import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
  return (
    <div>
      <Header />
      <section>
        <h2>SavedMovies</h2>
        <MoviesCardList />
      </section>
      <Footer />
    </div>
  );
};

export default SavedMovies;

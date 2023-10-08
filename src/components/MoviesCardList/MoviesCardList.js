import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ shouldRemowe }) => {
  return (
    <section className="movies-cards">
      <MoviesCard shouldRemowe={shouldRemowe} />
      <MoviesCard shouldRemowe={shouldRemowe} />
      <MoviesCard shouldRemowe={shouldRemowe} />
    </section>
  );
};

export default MoviesCardList;

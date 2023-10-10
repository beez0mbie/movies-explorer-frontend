import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ shouldRemowe }) => {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        <MoviesCard
          shouldRemowe={shouldRemowe}
          name="33 слова о дизайне"
        />
        <MoviesCard
          shouldRemowe={shouldRemowe}
          name="33 слова о дизайне"
        />
        <MoviesCard
          shouldRemowe={shouldRemowe}
          name="33 слова о дизайне"
        />
      </ul>
    </section>
  );
};

export default MoviesCardList;

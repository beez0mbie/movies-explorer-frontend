import React, { useState } from 'react';
import './MoviesCard.css';
import MovieImage from '../../images/movie-temp.png';

const MoviesCard = ({ shouldRemowe }) => {
  const [like, setLike] = useState(false);

  return (
    <button
      className="movie-card"
      onClick={() => {
        setLike((prev) => !prev);
      }}>
      {shouldRemowe ? (
        <div className="movie-card__remove"></div>
      ) : (
        <div className={`movie-card__like ${like && 'movie-card__like_active'}`}>
          {!like && <p className="movie-card__like-paragraph">Сохранить</p>}
        </div>
      )}
      <figure className="movie-card__image-container">
        <img
          src={MovieImage}
          alt="33 слова о дизайне"
          className="movie-card__image"
        />
      </figure>
      <figcaption className="movie-card__desc">
        <p className="movie-card__name">33 слова о дизайне</p>
        <p className="movie-card__duration">1ч 17м</p>
      </figcaption>
    </button>
  );
};

export default MoviesCard;

import React from 'react';
import './Preloader.css';

const Preloader = ({ showMessage, shouldAdd, isLoading, handleMoreClick }) => {
  return (
    <section className={`preloader ${shouldAdd && 'preloader_min-height'}`}>
      {isLoading && <div className="preloader__loader"></div>}
      {showMessage && <p>Ничего не найдено</p>}
      {!showMessage && shouldAdd && (
        <button
          type="button"
          onClick={handleMoreClick}
          className="preloader__button">
          Ещё
        </button>
      )}
    </section>
  );
};

export default Preloader;

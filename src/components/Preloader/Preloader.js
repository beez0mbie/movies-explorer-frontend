import React from 'react';
import './Preloader.css';

const Preloader = ({ isHideButton, isLoading }) => {
  return (
    <section className={`preloader ${isHideButton && 'preloader_min-height'}`}>
      {!isLoading && <div className="preloader__loader"></div>}
      {!isHideButton && (
        <button
          type="button"
          className="preloader__button">
          Ещё
        </button>
      )}
    </section>
  );
};

export default Preloader;

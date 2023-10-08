import React from 'react';
import './Preloader.css';

const Preloader = ({ isHideButton }) => {
  return (
    <section className={`preloader ${isHideButton && 'preloader_min-height'}`}>
      {!isHideButton && <button className="preloader__button">Ещё</button>}
    </section>
  );
};

export default Preloader;

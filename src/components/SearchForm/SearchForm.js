import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon_search.svg';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__container">
        <div className="search__input-container">
          <img
            className="search__logo"
            src={searchIcon}
            alt="Иконка поиска"
          />
          <input
            className="search__input"
            type="text"
            name=""
            id=""
            placeholder="Фильм"
          />
          <button className="search__button">Найти</button>
        </div>
        <FilterCheckbox />
      </div>
      <div className="search__break-line"></div>
    </section>
  );
};

export default SearchForm;

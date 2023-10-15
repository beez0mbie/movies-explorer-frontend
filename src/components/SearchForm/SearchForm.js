import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon_search.svg';
import './SearchForm.css';
import { FormValidator } from '../../utils/FormValidator';
import { validatorSearchConfig } from '../../utils/validatotConfig';
import { useLocation } from 'react-router-dom';

const SearchForm = ({ handleSubmit }) => {
  const location = useLocation();
  const moviesLocalStorageName = 'movies-search-input';
  const savedMoviesLocalStorageName = 'saved-movies-search-input';
  const moviesCheckboxLocalStorageName = 'movies-filter-checkbox';
  const savedMoviesCheckboxLocalStorageName = 'saved-movies-filter-checkbox';
  const moviesPath = '/movies';
  const searchMoviesPath = '/saved-movies';

  const [searchInput, setSearchInput] = useState(() => {
    if (location.pathname === moviesPath) {
      return JSON.parse(localStorage.getItem(moviesLocalStorageName)) || '';
    }
    if (location.pathname === searchMoviesPath) {
      return JSON.parse(localStorage.getItem(savedMoviesLocalStorageName)) || '';
    }
  });

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(() => {
    if (location.pathname === moviesPath) {
      return JSON.parse(localStorage.getItem(moviesCheckboxLocalStorageName)) || false;
    }
    if (location.pathname === searchMoviesPath) {
      return JSON.parse(localStorage.getItem(savedMoviesCheckboxLocalStorageName)) || false;
    }
  });

  const { formValues, handleChangeForm } = useForm({
    'search-input': searchInput || '',
  });

  // const [checkboxIsChecked, setCheckboxIsChecked] = useState(
  //   () => JSON.parse(localStorage.getItem('filterCheckboxChecked')) || false,
  // );

  const searchForm = useRef(null);

  // useEffect(() => {
  //   localStorage.setItem('filterCheckboxChecked', JSON.stringify(checkboxIsChecked));
  // }, [checkboxIsChecked]);

  useEffect(() => {
    const form = searchForm.current;
    const formValidator = new FormValidator(
      validatorSearchConfig,
      form,
      'Нужно ввести ключевое слово',
    );
    formValidator.enableValivation();
  }, []);

  useEffect(() => {
    console.log('isCheckboxChecked change');
    if (location.pathname === moviesPath) {
      localStorage.setItem(moviesLocalStorageName, JSON.stringify(formValues['search-input']));
      localStorage.setItem(moviesCheckboxLocalStorageName, JSON.stringify(isCheckboxChecked));
    }
    if (location.pathname === searchMoviesPath) {
      localStorage.setItem(savedMoviesLocalStorageName, JSON.stringify(formValues['search-input']));
      localStorage.setItem(savedMoviesCheckboxLocalStorageName, JSON.stringify(isCheckboxChecked));
    }
  }, [formValues['search-input'], isCheckboxChecked, location.pathname]);

  const handleCheckbox = () => {
    setIsCheckboxChecked((prev) => !prev);
    console.log('cahngeChakbox', isCheckboxChecked);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={handleSubmit}
          id="search-form"
          className="search-form"
          ref={searchForm}
          noValidate>
          <div className="search-form__input-container">
            <img
              className="search__logo"
              src={searchIcon}
              alt="Иконка поиска"
            />
            <input
              required
              id="search-input"
              name="search-input"
              className="search-form__input" // search-form__input_type_error
              type="text"
              placeholder="Фильм"
              value={formValues['search-input']}
              onChange={handleChangeForm}
            />
            <span className="search-form__input-error search-input-error"></span>
            <button
              type="submit"
              className="search-form__button">
              Найти
            </button>
          </div>
          <FilterCheckbox
            isChecked={isCheckboxChecked}
            handleCheckbox={handleCheckbox}
          />
        </form>
      </div>
    </section>
  );
};

export default SearchForm;

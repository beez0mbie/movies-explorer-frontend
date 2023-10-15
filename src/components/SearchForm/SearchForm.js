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
  const moviesPath = '/movies';
  const savedMoviesPath = '/saved-movies';

  const moviesStateLocalStorageName = 'movies-search-state';
  const savedMoviesStateLocalStorageName = 'saved-movies-search-state';

  let searchLocalStorageState = {
    input: '',
    checkbox: false,
  };
  const moviesLocalStorage = localStorage.getItem(moviesStateLocalStorageName);
  const savedMoviesLocalStorage = localStorage.getItem(savedMoviesStateLocalStorageName);

  if (location.pathname === moviesPath && moviesLocalStorage) {
    searchLocalStorageState = JSON.parse(localStorage.getItem(moviesStateLocalStorageName));
  }

  if (location.pathname === savedMoviesPath && savedMoviesLocalStorage) {
    searchLocalStorageState = JSON.parse(localStorage.getItem(savedMoviesStateLocalStorageName));
  }

  const { formValues, handleChangeForm } = useForm({
    'search-input': searchLocalStorageState.input,
  });

  const [checkboxIsChecked, setCheckboxIsChecked] = useState(searchLocalStorageState.checkbox);

  const searchForm = useRef(null);

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
    if (location.pathname === moviesPath) {
      localStorage.setItem(
        moviesStateLocalStorageName,
        JSON.stringify({
          input: formValues['search-input'],
          checkbox: checkboxIsChecked,
        }),
      );
    }
    if (location.pathname === savedMoviesPath) {
      localStorage.setItem(
        savedMoviesStateLocalStorageName,
        JSON.stringify({
          input: formValues['search-input'],
          checkbox: checkboxIsChecked,
        }),
      );
    }
  }, [formValues['search-input'], checkboxIsChecked, location.pathname]);

  const handleCheckboxState = () => {
    setCheckboxIsChecked((prev) => !prev);
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
            isChecked={checkboxIsChecked}
            handleCheckbox={handleCheckboxState}
          />
        </form>
      </div>
    </section>
  );
};

export default SearchForm;

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon_search.svg';
import './SearchForm.css';
import { FormValidator } from '../../utils/FormValidator';
import { validatorSearchConfig } from '../../utils/validatotConfig';
import { useLocation } from 'react-router-dom';
import { moviesSearchLocalStore, savedMoviesSearchLocalStore } from '../../utils/constants';
import { getLocalStore, setLocalStore } from '../../utils/localStorage';

import { pathNames } from '../../utils/constants';

const SearchForm = ({ handleSubmit, handleProcess }) => {
  const location = useLocation();

  let searchLocalStorageState = {
    input: '',
    checkbox: false,
  };

  const moviesLocalStorage = getLocalStore(moviesSearchLocalStore);
  const savedMoviesLocalStorage = getLocalStore(savedMoviesSearchLocalStore);

  if (location.pathname === pathNames.movies && moviesLocalStorage) {
    searchLocalStorageState = moviesLocalStorage;
  }

  if (location.pathname === pathNames.savedMovies && savedMoviesLocalStorage) {
    searchLocalStorageState = savedMoviesLocalStorage;
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
    if (location.pathname === pathNames.movies) {
      setLocalStore(moviesSearchLocalStore, {
        input: formValues['search-input'],
        checkbox: checkboxIsChecked,
      });
    }
    if (location.pathname === pathNames.savedMovies) {
      setLocalStore(savedMoviesSearchLocalStore, {
        input: formValues['search-input'],
        checkbox: checkboxIsChecked,
      });
    }
  }, [formValues['search-input'], checkboxIsChecked, location.pathname]);

  useEffect(() => {
    handleProcess(formValues['search-input'], checkboxIsChecked);
  }, [checkboxIsChecked]);

  const handleCheckboxState = () => {
    setCheckboxIsChecked((prev) => !prev);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={() => handleSubmit(formValues['search-input'], checkboxIsChecked)}
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

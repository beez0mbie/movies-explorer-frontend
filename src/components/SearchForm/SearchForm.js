import React, { useEffect, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon_search.svg';
import './SearchForm.css';
import { FormValidator } from '../../utils/FormValidator';
import { validatorConfig } from '../../utils/validatotConfig';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

const SearchForm = () => {
  const { formValues, handleChangeForm } = useForm({
    search: '',
  });
  const handleSubmit = () => {
    moviesApi.getFilms().then((films) => console.log(films));
    mainApi
      .signin('front@front.ru', '12345678')
      .then((res) => {
        console.log('mainAuthRes', res);
      })
      .catch((err) => {
        console.error('mainAuthErr', err);
      });
  };

  const searchForm = useRef(null);

  useEffect(() => {
    const form = searchForm.current;
    const formValidator = new FormValidator(validatorConfig, form, 'Нужно ввести ключевое слово');
    formValidator.enableValivation();
  }, []);

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
              value={formValues.formValues}
              onChange={handleChangeForm}
            />
            <span className="search-form__input-error search-input-error"></span>
            <button
              type="submit"
              className="search-form__button">
              Найти
            </button>
          </div>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
};

export default SearchForm;

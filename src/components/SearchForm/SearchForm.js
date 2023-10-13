import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon_search.svg';
import './SearchForm.css';
import { FormValidator } from '../../utils/FormValidator';
import { validatorConfig } from '../../utils/validatotConfig';

const SearchForm = ({ handleSubmit }) => {
  const [searchInput, setSearchInput] = useState(
    () => JSON.parse(localStorage.getItem('search-input')) || '',
  );
  const { formValues, handleChangeForm } = useForm({
    'search-input': searchInput || '',
  });

  const searchForm = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    const form = searchForm.current;
    const formValidator = new FormValidator(validatorConfig, form, 'Нужно ввести ключевое слово');
    formValidator.enableValivation();
  }, []);

  useEffect(() => {
    localStorage.setItem('search-input', JSON.stringify(formValues['search-input']));
  }, [formValues['search-input']]);

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
              ref={input}
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
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
};

export default SearchForm;

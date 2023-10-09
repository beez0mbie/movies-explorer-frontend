import React from 'react';
import { useForm } from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon_search.svg';
import './SearchForm.css';

const SearchForm = () => {
  const { formValues, handleChangeForm } = useForm({
    search: '',
  });
  const handleSubmit = () => {
    console.log('Search');
  };
  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={handleSubmit}
          id="search-form"
          className="search__form">
          <div className="search__input-container">
            <img
              className="search__logo"
              src={searchIcon}
              alt="Иконка поиска"
            />
            <input
              required
              id="search"
              name="search"
              className="search__input"
              type="text"
              placeholder="Фильм"
              value={formValues.formValues}
              onChange={handleChangeForm}
            />
            <button
              type="submit"
              className="search__button">
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

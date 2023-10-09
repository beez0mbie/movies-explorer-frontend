import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import './Register.css';
import logo from '../../images/logo.svg';

const Register = () => {
  const { formValues, handleChangeForm } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState(true);
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <main className="register">
      <section className="register__container">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="register__logo"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          onSubmit={handleSubmit}
          id="register-form"
          className="register__form">
          <label
            htmlFor="name"
            className="register__field">
            Имя
          </label>
          <input
            required
            id="name"
            name="name"
            minlength="2"
            maxLength="30"
            className="register__input"
            type="text"
            value={formValues.name}
            onChange={handleChangeForm}
            placeholder="Имя"
          />
          <label
            htmlFor="email"
            className="register__field">
            E-mail
          </label>
          <input
            required
            id="email"
            name="email"
            className="register__input"
            type="email"
            value={formValues.email}
            onChange={handleChangeForm}
            placeholder="E-mail"
          />
          <label
            htmlFor="password"
            className="register__field">
            Пароль
          </label>
          <input
            required
            id="password"
            name="password"
            minlength="8"
            maxLength="30"
            className={`register__input ${isError && 'register__input_red'}`}
            type="password"
            value={formValues.password}
            onChange={handleChangeForm}
            placeholder="Пароль"
          />
          {isError && (
            <span className="register__error register__error_red">Что-то пошло не так...</span>
          )}
          <button
            type="submit"
            className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__signin-desc">Уже зарегистрированы?</p>
          <Link
            to="/signin"
            className="register__signin-link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;

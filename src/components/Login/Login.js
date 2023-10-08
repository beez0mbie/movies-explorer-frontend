import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import './Login.css';
import logo from '../../images/logo.svg';

const Login = () => {
  const { formValues, handleChangeForm } = useForm({
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState(false);
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <section className="login">
      <div className="login__container">
        <img
          src={logo}
          alt="Логотип"
          className="login__logo"
        />
        <h1 className="login__title">Рады видеть!</h1>
        <form
          onSubmit={handleSubmit}
          id="login-form"
          className="login__form">
          <label
            htmlFor="email"
            className="login__field">
            E-mail
          </label>
          <input
            required
            id="email"
            name="email"
            className="login__input"
            type="email"
            value={formValues.email}
            onChange={handleChangeForm}
          />
          <label
            htmlFor="password"
            className="login__field">
            Пароль
          </label>
          <input
            required
            id="password"
            name="password"
            minlength="8"
            className={`login__input ${isError && 'login__error_red'}`}
            type="password"
            value={formValues.password}
            onChange={handleChangeForm}
          />
          {isError && <span className="login__error login__error_red">Что-то пошло не так...</span>}
          <button
            type="submit"
            className="login__button">
            Войти
          </button>
        </form>
        <div className="login__signin">
          <p className="login__signin-desc">Ещё не зарегистрированы?</p>
          <Link
            to="/signup"
            className="login__signin-link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;

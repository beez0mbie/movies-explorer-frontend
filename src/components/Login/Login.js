import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Login.css';
import logo from '../../images/logo.svg';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts';
import { pathNames } from '../../utils/constants';

const Login = ({ handleLogin }) => {
  const { formValues, handleChangeForm, formErrors, formIsValid } = useFormWithValidation({
    email: '',
    password: '',
  });
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    mainApi
      .signin(formValues.email, formValues.password)
      .then((data) => {
        if (data) {
          mainApi
            .getUser()
            .then((res) => {
              setCurrentUser({
                name: res.name,
                email: res.email,
                _id: res._id,
              });
            })
            .catch((e) => {
              setIsError(true);
              console.error('Login getUser error', e);
            });
          handleLogin();
          navigate(pathNames.movies, { replace: true });
        }
      })
      .catch((e) => {
        setIsError(true);
        console.error('Login handleSubmit error', e);
      });
  };
  return (
    <main className="login">
      <section className="login__container">
        <Link to={pathNames.root}>
          <img
            src={logo}
            alt="Логотип"
            className="login__logo"
          />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form
          onSubmit={handleSubmit}
          id="login-form"
          className="login-form">
          <label
            htmlFor="email"
            className="login-form__field">
            <span className="login-form__label">E-mail</span>
            <input
              required
              id="email"
              name="email"
              className={`login-form__input 
                ${isError && 'login-form__input_red'} 
                ${formErrors.email && 'login-form__input_type_error'}`}
              type="email"
              value={formValues.email}
              onChange={handleChangeForm}
              placeholder="E-mail"
              pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
            />
            <span
              className={`login-form__input-error ${
                formErrors.email && 'login-form__input-error_active'
              }`}>
              {formErrors.email}
            </span>
          </label>
          <label
            htmlFor="password"
            className="login-form__field">
            <span className="login-form__label">Пароль</span>
            <input
              required
              id="password"
              name="password"
              minLength="8"
              maxLength="30"
              className={`login-form__input 
              ${isError && 'login-form__input_red'} 
              ${formErrors.password && 'login-form__input_type_error'}`}
              type="password"
              value={formValues.password}
              onChange={handleChangeForm}
              placeholder="Пароль"
            />
            <span
              className={`login-form__input-error ${
                formErrors.password && 'login-form__input-error_active'
              }`}>
              {formErrors.password}
            </span>
          </label>
          {isError && <span className="login__error login__error_red">Что-то пошло не так...</span>}
          <button
            type="submit"
            className={`login-form__button ${!formIsValid && 'login-form__button_disabled'}`}>
            Войти
          </button>
        </form>
        <div className="login__signin">
          <p className="login__signin-desc">Ещё не зарегистрированы?</p>
          <Link
            to={pathNames.signUp}
            className="login__signin-link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;

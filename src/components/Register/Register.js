import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import './Register.css';
import logo from '../../images/logo.svg';
import { FormValidator } from '../../utils/FormValidator';
import { validatorConfigRegister } from '../../utils/validatotConfig';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts';
import { pathNames } from '../../utils/constants';

const Register = ({ handleLogin, isLoggedIn }) => {
  const { formValues, handleChangeForm } = useForm({
    'register-name': '',
    'register-email': '',
    'register-password': '',
  });
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const registerForm = useRef(null);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(pathNames.root);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const form = registerForm.current;
    const formValidator = new FormValidator(validatorConfigRegister, form);
    formValidator.enableValivation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mainApi
      .signup(
        formValues['register-email'],
        formValues['register-password'],
        formValues['register-name'],
      )
      .then((res) => {
        mainApi
          .signin(formValues['register-email'], formValues['register-password'])
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
                  console.error('RegisterError getUser error', e);
                });
              handleLogin();
              navigate(pathNames.movies, { replace: true });
            }
          })
          .catch((e) => console.error('Login', e));
      })
      .catch((e) => {
        setIsError(true);
        console.error('RegisterError handleSubmit error', e);
      });
  };

  return (
    <main className="register">
      <section className="register__container">
        <Link to={pathNames.root}>
          <img
            src={logo}
            alt="Логотип"
            className="register__logo"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          ref={registerForm}
          onSubmit={handleSubmit}
          id="register-form"
          className="register-form">
          <label
            htmlFor="name"
            className="register-form__field">
            <span className="register-form__label">Имя</span>
            <input
              required
              id="register-name"
              name="register-name"
              minLength="2"
              maxLength="30"
              className={`register-form__input ${isError && 'register-form__input_red'}`}
              type="text"
              value={formValues['register-name']}
              onChange={handleChangeForm}
              placeholder="Имя"
              pattern="^([A-zА-яёЁ \-]+)$"
            />
            <span className="register-form__input-error register-name-error"></span>
          </label>
          <label
            htmlFor="email"
            className="register-form__field">
            <span className="register-form__label">E-mail</span>
            <input
              required
              id="register-email"
              name="register-email"
              className={`register-form__input ${isError && 'register-form__input_red'}`}
              type="email"
              value={formValues['register-email']}
              onChange={handleChangeForm}
              placeholder="E-mail"
              pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
            />
            <span className="register-form__input-error register-email-error"></span>
          </label>
          <label
            htmlFor="password"
            className="register-form__field">
            <span className="register-form__label">Пароль</span>
            <input
              required
              id="register-password"
              name="register-password"
              minLength="8"
              maxLength="30"
              className={`register-form__input ${isError && 'register-form__input_red'}`}
              type="password"
              value={formValues['register-password']}
              onChange={handleChangeForm}
              placeholder="Пароль"
            />
            <span className="register-form__input-error register-password-error"></span>
          </label>
          {isError && (
            <span className="register__error register__error_red">Что-то пошло не так...</span>
          )}
          <button
            type="submit"
            className="register-form__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__signin-desc">Уже зарегистрированы?</p>
          <Link
            to={pathNames.signIn}
            className="register__signin-link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;

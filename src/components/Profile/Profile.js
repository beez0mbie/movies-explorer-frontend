import React, { useState, useContext, useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts';
import { pathNames } from '../../utils/constants';
import { SavedMoviesContext } from '../../contexts';

const Profile = ({ handleExit }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
  const userName = currentUser.name || '';
  const userEmail = currentUser.email || '';
  const { formValues, handleChangeForm, formErrors, formIsValid } = useFormWithValidation({
    name: userName,
    email: userEmail,
  });
  const naigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSameCredentials, setIsSameCredentials] = useState(false);

  useEffect(() => {
    if (formValues.name === userName && formValues.email === userEmail) {
      setIsSameCredentials(true);
    }
    return () => {
      setIsSameCredentials(false);
    };
  }, [formValues.email, formValues.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mainApi
      .updateUser(formValues.email, formValues.name)
      .then((data) => {
        if (data) {
          setCurrentUser({
            name: data.name,
            email: data.email,
          });
          setIsEdit(false);
          setIsError(false);
          setIsOk(true);
        }
      })
      .catch((e) => {
        setIsError(true);
        console.error('Profile updateUser error', e);
      });
  };
  const onExit = () => {
    mainApi
      .signout()
      .then((res) => {
        if (res) {
          handleExit();
          localStorage.clear();
          setSavedMovies([]);
          naigate(pathNames.root);
        }
      })
      .catch((err) => console.error(`Error Profile.handleExit():\n ${err}`));
  };
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {userName || ''}!</h1>
      <form
        onSubmit={handleSubmit}
        id="profile-form"
        className="profile-form">
        <label
          htmlFor="name"
          className="profile-form__field">
          <span className="profile-form__label">Имя</span>
          <input
            required
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            className={`profile-form__input 
            ${formErrors.name && 'profile-form__input_type_error'}`}
            type="text"
            value={formValues.name}
            onChange={handleChangeForm}
            readOnly={!isEdit}
            placeholder="Имя"
          />
          <span
            className={`profile-form__input-error ${
              formErrors.name && 'profile-form__input-error_active'
            }`}>
            {formErrors.name}
          </span>
        </label>
        <label
          htmlFor="email"
          className="profile-form__field">
          <span className="profile-form__label">E-mail</span>
          <input
            required
            id="email"
            name="email"
            className={`profile-form__input 
            ${formErrors.email && 'profile-form__input_type_error'}`}
            type="email"
            value={formValues.email}
            onChange={handleChangeForm}
            readOnly={!isEdit}
            placeholder="E-mail"
            pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
          />
          <span
            className={`profile-form__input-error ${
              formErrors.email && 'profile-form__input-error_active'
            }`}>
            {formErrors.email}
          </span>
        </label>
        <div className="profile-form__buttons">
          {isError && (
            <span className="profile-form__error">При обновлении профиля произошла ошибка.</span>
          )}
          {isOk && <span className="profile-form__ok">Профиль успешно обновлен.</span>}
          {isEdit ? (
            <button
              type="submit"
              className={`profile-form__submit-button ${
                (isSameCredentials || !formIsValid) && 'profile-form__button_disabled'
              }`}>
              Сохранить
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsOk(false);
                  setIsEdit(true);
                }}
                className="profile-form__button">
                Редактировать
              </button>
              <button
                type="button"
                onClick={onExit}
                className="profile-form__button profile-form__button_red">
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </form>
    </main>
  );
};

export default Profile;

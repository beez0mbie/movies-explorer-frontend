import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';

const Profile = ({ handleExit }) => {
  const { formValues, handleChangeForm } = useForm({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
  });
  const naigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleSubmit = () => {
    console.log('Submit');
  };
  const onExit = () => {
    mainApi
      .signout()
      .then((res) => {
        if (res) {
          handleExit(false);
          localStorage.clear();
          naigate('/');
        }
      })
      .catch((err) => console.error(`Error Profile.handleExit():\n ${err}`));
  };
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form
        onSubmit={handleSubmit}
        id="profile-form"
        className="profile__form">
        <div className="profile__cred-item">
          <label
            htmlFor="name"
            className="profile__field-label">
            Имя
          </label>
          <input
            required
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            className="profile__field-content"
            type="text"
            value={formValues.name}
            onChange={handleChangeForm}
            readOnly={!isEdit}
            placeholder="Имя"
          />
        </div>
        <div className="profile__cred-item">
          <label
            htmlFor="email"
            className="profile__field-label">
            E-mail
          </label>
          <input
            required
            id="email"
            name="email"
            className="profile__field-content"
            type="text"
            value={formValues.email}
            onChange={handleChangeForm}
            readOnly={!isEdit}
            placeholder="E-mail"
          />
        </div>
        <div className="profile__buttons">
          {isError && (
            <span className="profile__error">При обновлении профиля произошла ошибка.</span>
          )}
          {isEdit ? (
            <button
              type="submit"
              disabled={isError}
              className={`profile__submit-button ${isError && 'profile__submit-button_error'}`}>
              Сохранить
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="profile__button">
                Редактировать
              </button>
              <button
                type="button"
                onClick={onExit}
                className="profile__button profile__button_red">
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

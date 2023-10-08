import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import './Profile.css';

const Profile = () => {
  const { formValues, handleChangeForm } = useForm({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
  });
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
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
            className="profile__field-content"
            type="text"
            value={formValues.name}
            onChange={handleChangeForm}
            readOnly={!isEdit}
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
              <button className="profile__button">Редактировать</button>
              <button className="profile__button profile__button_red">Выйти из аккаунта</button>
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default Profile;

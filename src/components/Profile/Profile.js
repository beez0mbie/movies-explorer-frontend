import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <ul className="profile__creds">
        <li className="profile__cred-item">
          <p className="profile__field-label">Имя</p>
          <p className="profile__field-content">Виталий</p>
        </li>
        <li className="profile__cred-item">
          <p className="profile__field-label">E-mail</p>
          <p className="profile__field-content">pochta@yandex.ru</p>
        </li>
      </ul>
      <div className="profile__buttons">
        <button className="profile__button">Редактировать</button>
        <button className="profile__button profile__button_red">Выйти из аккаунта</button>
      </div>
    </section>
  );
};

export default Profile;

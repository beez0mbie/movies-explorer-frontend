import React from 'react';
import iconAccountPink from '../../images/icon_account-pink.svg';
import iconAccountBlack from '../../images/icon_account-black.svg';
import './Account.css';

const Account = ({ isPink }) => {
  return (
    <div className="account">
      <p className="account__desc">Аккаунт</p>
      <figcaption className={`account__logo-container ${isPink && 'account__logo-container_pink'}`}>
        {isPink ? (
          <img
            className="account__logo"
            src={iconAccountPink}
            alt="Лого аккаунта"
          />
        ) : (
          <img
            className="account__logo"
            src={iconAccountBlack}
            alt="Лого аккаунта"
          />
        )}
      </figcaption>
    </div>
  );
};

export default Account;

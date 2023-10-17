import React from 'react';
import iconAccountPink from '../../images/icon_account-pink.svg';
import iconAccountBlack from '../../images/icon_account-black.svg';
import './Account.css';
import { Link } from 'react-router-dom';
import { pathNames } from '../../utils/constants';

const Account = ({ isPink, handleClick }) => {
  return (
    <Link
      onClick={handleClick}
      to={pathNames.profile}
      className="account">
      <p className="account__desc">Аккаунт</p>
      <div className={`account__logo-container ${isPink && 'account__logo-container_pink'}`}>
        {isPink ? (
          <img
            className="account__logo"
            src={iconAccountPink}
            alt="Лого аккаунта розовое"
          />
        ) : (
          <img
            className="account__logo"
            src={iconAccountBlack}
            alt="Лого аккаунта"
          />
        )}
      </div>
    </Link>
  );
};

export default Account;

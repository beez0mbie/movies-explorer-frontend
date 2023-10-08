import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.isLoggedIn ? (
    <>
      <Header {...props} />
      <Component {...props} />
      {!props.isHideFooter && <Footer />}
    </>
  ) : (
    <Navigate
      to="/signin"
      replace
    />
  );
};

export default ProtectedRoute;

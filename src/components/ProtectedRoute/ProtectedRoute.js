import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { pathNames } from '../../utils/constants';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const location = useLocation();

  useEffect(() => {
    props.handleTokenCheck(location.pathname);
  }, []);

  return props.isLoggedIn ? (
    <>
      <Header {...props} />
      <Component {...props} />
      {!props.isHideFooter && <Footer />}
    </>
  ) : (
    <Navigate
      to={pathNames.root}
      replace
    />
  );
};

export default ProtectedRoute;

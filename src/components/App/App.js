import React, { useState, useMemo, useEffect } from 'react';
import Main from '../Main/Main.js';
import './App.css';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import SideBar from '../SideBar/SideBar';
import { CurrentUserContext, SavedMoviesContext } from '../../contexts';
import { mainApi } from '../../utils/MainApi.js';
import { pathNames } from '../../utils/constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });
  const currentUserValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  const [savedMovies, setSavedMovies] = useState({
    all: [],
    toRender: [],
  });
  const savedMoviesValue = useMemo(() => ({ savedMovies, setSavedMovies }), [savedMovies]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      handleTokenCheck(location.pathname);
    }
  }, [isLoggedIn]);

  const handleTokenCheck = (path) => {
    mainApi
      .getUser()
      .then((res) => {
        if (res) {
          const { email, name, _id } = res;
          setCurrentUser({
            _id,
            name,
            email,
          });
          setIsLoggedIn(true);
          navigate(path, { replace: true });
        }
      })
      .catch((err) => console.error(`Error apiAuth.checkToken():\n ${err}`));
  };

  const toggleSidebar = () => setIsOpenSideBar((prev) => !prev);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleExit = () => {
    setIsLoggedIn(false);
  };
  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      <SavedMoviesContext.Provider value={savedMoviesValue}>
        <div className="app">
          <div className="app__container">
            <Routes>
              <Route
                path={pathNames.root}
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                  />
                }
              />
              <Route
                path={pathNames.movies}
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                    handleTokenCheck={handleTokenCheck}
                  />
                }
              />
              <Route
                path={pathNames.savedMovies}
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                    handleTokenCheck={handleTokenCheck}
                  />
                }
              />
              <Route
                path={pathNames.profile}
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                    isHideFooter
                    handleExit={handleExit}
                    handleTokenCheck={handleTokenCheck}
                  />
                }
              />
              <Route
                path={pathNames.signIn}
                element={
                  <Login
                    handleLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path={pathNames.signUp}
                element={
                  <Register
                    handleLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </div>
          <SideBar
            isOpen={isOpenSideBar}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

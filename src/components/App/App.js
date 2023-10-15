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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });
  const currentUserValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  const [savedMovies, setSavedMovies] = useState([]);
  const savedMoviesValue = useMemo(() => ({ savedMovies, setSavedMovies }), [savedMovies]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      handleTokenCheck();
    }
  }, [isLoggedIn, location]);

  const handleTokenCheck = () => {
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
          navigate('/movies', { replace: true });
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
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    toggleSidebar={toggleSidebar}
                    isHideFooter
                    handleExit={handleExit}
                  />
                }
              />
              <Route
                path="/signin"
                element={<Login handleLogin={handleLogin} />}
              />
              <Route
                path="/signup"
                element={<Register handleLogin={handleLogin} />}
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

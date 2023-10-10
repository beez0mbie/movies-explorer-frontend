import React, { useState } from 'react';
import Main from '../Main/Main.js';
import './App.css';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSidebar = () => setIsOpenSideBar((prev) => !prev);
  return (
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
              />
            }
          />
          <Route
            path="/signin"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Register />}
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
  );
}

export default App;

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route
            path="/"
            element={<Main isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
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
    </div>
  );
}

export default App;

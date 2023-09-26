import React from 'react';
import Main from '../Main/Main.js';
import './App.css';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  return (
    <div className="App">
      <Main></Main>
      <p>---</p>
      <Movies />
      <p>---</p>
      <SavedMovies />
      <p>---</p>
      <Register />
      <p>---</p>
      <Login />
      <p>---</p>
      <Profile />
      <p>---</p>
      <NotFound />
    </div>
  );
}

export default App;

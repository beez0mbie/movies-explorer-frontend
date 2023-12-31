import { LOCAL_URL, IS_PRODUCTION, MAIN_URL } from '../env';
import { Api } from './Api';

class MainApi extends Api {
  /**
   * AUTH
   */

  signup = (email, password, name) =>
    this._request('signup', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password, name }),
    });

  signin = (email, password) =>
    this._request('signin', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });

  signout = () =>
    this._request('signout', {
      headers: this.headers,
    });

  /**
   * MOVIES
   */

  addMovie = (movie) => {
    return this._request(`movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  };

  deleteMovie = (movieId) =>
    this._request(`movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    });

  getMovies = () =>
    this._request('movies', {
      headers: this.headers,
    });

  /**
   * USER
   */

  getUser = () =>
    this._request('users/me', {
      headers: this.headers,
    });

  updateUser = (email, name) =>
    this._request(`users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        email,
        name,
      }),
    });

  getAppInfo() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }
}

export const mainApi = new MainApi({
  baseUrl: IS_PRODUCTION ? MAIN_URL : LOCAL_URL,
  headers: {
    'Content-Type': 'application/json',
    Origin: IS_PRODUCTION ? MAIN_URL : LOCAL_URL,
  },
  credentials: IS_PRODUCTION ? 'include' : undefined,
});

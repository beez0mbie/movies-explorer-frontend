import { BEAT_FILM_URL } from '../env';
import { Api } from './Api';

class MoviesApi extends Api {
  getFilms = () =>
    this._request('beatfilm-movies', {
      headers: this.headers,
    });
}

export const moviesApi = new MoviesApi({
  baseUrl: BEAT_FILM_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

import { BEAT_FILM_URL } from '../env';

export const processMovies = (movies, searchText, checkbox) => {
  let moviesToProcess = movies;

  if (checkbox) {
    moviesToProcess = moviesToProcess.filter((movie) => {
      const isShort = Math.floor(movie.duration / 40) < 1;
      return isShort;
    });
  }

  if (searchText) {
    const searchTextLower = searchText.toLowerCase();

    moviesToProcess = moviesToProcess.filter((movie) => {
      if (/[a-z]/.test(searchTextLower)) {
        return movie.nameEN.toLowerCase().includes(searchTextLower);
      }
      if (/[а-яё]/.test(searchTextLower)) {
        return movie.nameRU.toLowerCase().includes(searchTextLower);
      }
      return false;
    });
  }

  return moviesToProcess.map((movie) => {
    if (movie._id) {
      return movie;
    }
    if (movie.thumbnail && movie.movieId && movie.thumbnail && movie.image) {
      return movie;
    }
    const processedMovie = movie;
    processedMovie.movieId = movie.id;
    processedMovie.thumbnail = `${BEAT_FILM_URL}${movie.image.formats.thumbnail.url}`;
    processedMovie.image = `${BEAT_FILM_URL}${movie.image.url}`;
    return processedMovie;
  });
};

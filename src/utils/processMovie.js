import { BEAT_FILM_URL } from '../env';

export const processMovies = (movies, searchText) => {
  const searchTextLower = searchText.toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    if (/[a-z]/.test(searchTextLower)) {
      return movie.nameEN.toLowerCase().includes(searchTextLower);
    }
    if (/[а-яё]/.test(searchTextLower)) {
      return movie.nameRU.toLowerCase().includes(searchTextLower);
    }
    return false;
  });

  return filteredMovies.map((movie) => {
    if (movie._id) {
      return movie;
    }
    const processedMovie = movie;
    processedMovie.movieId = movie.id;
    processedMovie.thumbnail = `${BEAT_FILM_URL}${movie.image.formats.thumbnail.url}`;
    processedMovie.image = `${BEAT_FILM_URL}${movie.image.url}`;
    processedMovie.hasLike = false;
    return processedMovie;
  });
};

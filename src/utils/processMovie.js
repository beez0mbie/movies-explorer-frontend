import { BEAT_FILM_URL } from '../env';

export const processMovies = (movies) => {
  return movies.map((movie) => {
    const processedMovie = movie;
    processedMovie.movieId = movie.id;
    processedMovie.thumbnail = `${BEAT_FILM_URL}${movie.image.formats.thumbnail.url}`;
    processedMovie.image = `${BEAT_FILM_URL}${movie.image.url}`;
    processedMovie.hasLike = false;
    return processedMovie;
  });
};

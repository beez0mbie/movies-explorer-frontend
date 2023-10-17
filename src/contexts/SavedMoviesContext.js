import { createContext } from 'react';

export const SavedMoviesContext = createContext({
  savedMovies: {
    all: [],
    toRender: [],
  },
  setSavedMovies: () => {},
});

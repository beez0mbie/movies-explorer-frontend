import { createContext } from 'react';

export const CurrentUserContext = createContext({
  currentUser: {
    name: '',
    email: '',
    _id: '',
  },
  setCurrentUser: () => {},
});

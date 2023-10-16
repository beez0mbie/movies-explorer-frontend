export const getLocalStore = (name) => JSON.parse(localStorage.getItem(name));
export const setLocalStore = (name, item) => localStorage.setItem(name, JSON.stringify(item));

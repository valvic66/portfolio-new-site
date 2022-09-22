export const storeToLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

export const getFromLocalStorage = (name) => {
  return localStorage.getItem(name);
};

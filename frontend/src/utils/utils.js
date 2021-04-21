// Auth
export const BASE_URL = 'https://auth.nomoreparties.co';

export const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

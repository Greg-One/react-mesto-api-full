// Auth
export const BASE_URL = 'https://api.onemore.mesto.nomoredomains.club';

export const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

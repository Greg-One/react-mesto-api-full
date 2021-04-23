import { BASE_URL, getResponse } from './utils.js';

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then(getResponse);
}

export function authorisation(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then(getResponse);
}

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  }).then(getResponse);
}

import { getResponse } from './utils.js';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Получение информации польтзователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then(getResponse);
  }

  // Редактирование информации о пользователе
  setUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(user),
    }).then(getResponse);
  }

  // Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
    }).then(getResponse);
  }

  // Добавление своей карточки
  addCustomCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(getResponse);
  }

  // Удаление своей карточки
  removeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(getResponse);
  }

  // Посатвить лайк
  addCardLike(card) {
    return fetch(`${this._baseUrl}/cards/${card}/likes`, {
      method: 'PUT',
      credentials: 'include',
    }).then(getResponse);
  }

  // Убрать лайк
  removeCardLike(card) {
    return fetch(`${this._baseUrl}/cards/${card}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(getResponse);
  }

  changeCardLikeStatus(cardId, isLiked) {
    return isLiked ? this.removeCardLike(cardId) : this.addCardLike(cardId);
  }

  // Установить новый аватар
  setNewAvatar(user) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: user.avatar,
      }),
    }).then(getResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.onemore.mesto.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

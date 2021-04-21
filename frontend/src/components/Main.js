import { useContext } from 'react';
import Card from './Card.js';
import avatar from '../images/Cousteau.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__main">
          <button
            aria-label="Изменить аватар"
            className="profile__avatar-edit"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar ? currentUser.avatar : avatar}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__user">
              <h1 className="profile__name">
                {currentUser.name ? currentUser.name : 'Жак-Ив Кусто'}
              </h1>
              <p className="profile__occupation">
                {currentUser.about ? currentUser.about : 'Исследователь океана'}
              </p>
            </div>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить фотографию"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;

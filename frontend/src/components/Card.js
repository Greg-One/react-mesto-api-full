import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  // Кнопка удаления
  const cardRemoveButtonClassName = `card__remove-button ${
    isOwn ? 'card__remove-button_visible' : ''
  }`;

  // Кнопка лайка
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_active' : ''
  }`;

  // Попап с картинкой
  function handleClick() {
    props.onCardClick(props.card);
  }

  // Лайк
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // Удаление
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <button
        type="button"
        className={cardRemoveButtonClassName}
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__image-container">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="card__image"
          onClick={handleClick}
        />
      </div>
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            aria-label="Лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;

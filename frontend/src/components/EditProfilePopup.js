import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  //! Стейты и функции попапа редактирования профиля
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameInputChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionInputChange(event) {
    setDescription(event.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={props.onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset name="user" className="popup__info">
        <input
          type="text"
          placeholder="Имя"
          name="name"
          required=""
          minLength="2"
          maxLength="40"
          className="popup__input popup__input_type_name"
          id="profile-name-input"
          value={name}
          onChange={handleNameInputChange}
        />
        <span
          className="popup__input-error"
          id="profile-name-input-error"
        ></span>
        <input
          type="text"
          placeholder="Род занятий"
          name="job"
          required=""
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_type_occupation"
          id="profie-occupation-input"
          value={description}
          onChange={handleDescriptionInputChange}
        />
        <span
          className="popup__input-error"
          id="profie-occupation-input-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

import { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleInputChange(event) {
    setTitle(event.target.value);
  }

  function handleLinkInputChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({ title, link });

    setTimeout(() => {
      setTitle('');
      setLink('');
    }, 1500);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={props.onLoading ? 'Создание...' : 'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset name="card" className="popup__info">
        <input
          type="text"
          placeholder="Название"
          name="title"
          required=""
          minLength="2"
          maxLength="30"
          className="popup__input popup__input_type_title"
          id="card-title-input"
          value={title}
          onChange={handleTitleInputChange}
        />
        <span className="popup__input-error" id="card-title-input-error"></span>
        <input
          type="url"
          placeholder="Ссылка на изображение"
          name="link"
          required=""
          className="popup__input popup__input_type_url"
          id="card-url-input"
          value={link}
          onChange={handleLinkInputChange}
        />
        <span className="popup__input-error" id="card-url-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

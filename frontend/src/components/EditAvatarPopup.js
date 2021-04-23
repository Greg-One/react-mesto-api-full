import { useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  //! Реф и функции поапап обновления аватара
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    setTimeout(() => {
      avatarRef.current.value = '';
    }, 1500);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={props.onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset name="avatar" className="popup__info">
        <input
          type="url"
          placeholder="Ссылка на изображение"
          name="link"
          required=""
          className="popup__input popup__input_avatar popup__input_type_url"
          id="avatar-url-input"
          ref={avatarRef}
        />
        <span className="popup__input-error" id="avatar-url-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

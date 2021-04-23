function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}
    >
      <form
        name={props.name}
        className={`popup__container popup__container_${props.name}`}
        noValidate
        onSubmit={props.onSubmit}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>

        {props.children}

        <button aria-label="Сохранить" className="popup__submit-button">
          {props.buttonText}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;

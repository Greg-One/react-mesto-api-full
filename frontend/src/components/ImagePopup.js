function ImagePopup(props) {
  return (
    <section className={`popup popup_image ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button
          type="button"
          aria-label="Закрыть попап с фотографией"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__photo"
        />
        <h3 className="popup__card-title">{props.card.name}</h3>
      </div>
    </section>
  );
}

export default ImagePopup;

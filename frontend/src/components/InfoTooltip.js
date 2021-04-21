import success from '../images/success_icon.png';
import fail from '../images/fail_icon.png';

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_register ${props.isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <img
          className="popup__image"
          alt="Иконка события"
          src={props.data.isRegistered ? success : fail}
        />
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title popup__title_register">
          {props.data.text}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;

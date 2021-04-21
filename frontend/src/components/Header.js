import mestoLogo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img
        src={mestoLogo}
        alt="Логотип проекта 'Место'"
        className="header__logo"
      />
      <nav className="header__buttons-container">
        <Route exact path="/">
          <>
            <Link to="#" className="header__link">
              {props.email}
            </Link>
            <button
              type="button"
              className="header__button"
              onClick={props.onSignOut}
            >
              Выйти
            </button>
          </>
        </Route>

        <Route exact path="/signup">
          <Link to="signin" className="header__link">
            Войти
          </Link>
        </Route>

        <Route exact path="/signin">
          <Link to="signup" className="header__link">
            Регистрация
          </Link>
        </Route>
      </nav>
    </header>
  );
}

export default Header;

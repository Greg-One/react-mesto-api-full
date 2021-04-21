import { useState } from 'react';

function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handlePasswordInputChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailInputChange(event) {
    setEmail(event.target.value);
  }

  function resetForm() {
    setPassword('');
    setEmail('');
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    props.onLogin({ password, email });
    resetForm();
  }

  return (
    <section className="authorisation">
      <h2 className="authorisation__title">Вход</h2>
      <form
        className="authorisation__container"
        name="login"
        onSubmit={handleLoginSubmit}
      >
        <fieldset name="authorisation" className="authorisation__info">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required=""
            minLength="2"
            maxLength="40"
            className="authorisation__input authorisation__input_type_email"
            id="email-input"
            autoComplete="user-email"
            value={email}
            onChange={handleEmailInputChange}
          />
          <span
            className="authorisation__input-error"
            id="email-input-error"
          ></span>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            required=""
            minLength="8"
            maxLength="30"
            className="authorisation__input authorisation__input_type_password"
            id="password-input"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordInputChange}
          />
          <span
            className="authorisation__input-error"
            id="password-input-error"
          ></span>
        </fieldset>
        <button className="authorisation__submit-button">Войти</button>
      </form>
    </section>
  );
}

export default Login;

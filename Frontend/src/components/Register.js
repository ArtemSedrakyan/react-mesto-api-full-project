import React from "react";
import { Link } from "react-router-dom";

const Register = ({onRegister}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  };

  function handleChangePassword(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  };

  return(
    <>
      <form className="popup__form popup__form_type_register dark-theme user-form"
        name="form-type-register" onSubmit={handleSubmit}>
        <h2 className="popup__title dark-theme user-form">Регистрация</h2>
        <label className="popup__field">
          <input  type="email" name="email"
            placeholder="Email" className="popup__input popup__input_type_email dark-theme user-form" value={email}
            onChange={handleChangeEmail} required />
          <span className="popup__input-error email-input-error"></span>
        </label>
        <label className="popup__field">
          <input  type="password" name="password"
            placeholder="Пароль" className="popup__input popup__input_type_password dark-theme user-form" value={password}
            onChange={handleChangePassword} required />
          <span className="popup__input-error password-input-error"></span>
        </label>
        <button className="popup__submit-button dark-theme user-form" type="submit">
          Зарегистрироваться
        </button>
        <div className="popup__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="popup__text-link">
            Войти
          </Link>
        </div>

      </form>
    </>
  );
};

export default Register;

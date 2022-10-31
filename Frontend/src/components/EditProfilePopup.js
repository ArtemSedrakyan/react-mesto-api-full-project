import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDesciption] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeDescription(e) {
    setDesciption(e.target.value);
  };

  React.useEffect(() => {
    if (currentUser.name || currentUser.about !== undefined) {
      setName(currentUser.name);
      setDesciption(currentUser.about);
    };
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      >
        <label className="popup__field">
          <input  type="text" minLength="2" maxLength="40" id="name-input" name="name"
            placeholder="Имя" className="popup__input popup__input_type_name" value={name}
            onChange={handleChangeName} required />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__field">
          <input type="text" minLength="2" maxLength="200" id="about-input" name="about"
            placeholder="О себе" className="popup__input popup__input_type_about" value={description}
            onChange={handleChangeDescription} required/>
          <span className="popup__input-error about-input-error"></span>
        </label>
      </PopupWithForm>
  );
}

export default EditProfilePopup;

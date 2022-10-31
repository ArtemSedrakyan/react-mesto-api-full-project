import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // const [avatar, setAvatar] = React.useState('');

  const avatarLinkRef = React.useRef();

  function handleChangeAvatar(e) {
    // setAvatar(e.target.value);
    avatarLinkRef.current.value = e.target.value;
  };

  // React.useEffect(() => {
  //   setAvatar(currentUser.avatar);
  // }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  };

  React.useEffect(() => {
    avatarLinkRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Редактировать аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      >
          <label className="popup__field">
            <input
              type="url"
              id="avatar-input"
              name="avatar"
              placeholder="Ссылка на аватар"
              className="popup__input popup__input_type_avatar"
              ref={avatarLinkRef}
              onChange={handleChangeAvatar}
              // value={avatar}
              required
            />
            <span className="popup__input-error avatar-input-error"></span>
          </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

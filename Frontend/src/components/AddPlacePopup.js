import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  };

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink
    });
  };

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [props.isOpen]);

  return(
    <PopupWithForm
    name="add"
    title="Новое место"
    isOpen={props.isOpen}
    onClose={props.onClose}
    buttonText="Создать"
    onSubmit={handleSubmit}
    >
        <label className="popup__field">
          <input
            type="text"
            minLength="1"
            maxLength="30"
            id="place-name"
            name="name"
            placeholder="Название"
            className="popup__input popup__input_type_title"
            value={placeName}
            onChange={handleChangePlaceName}
            required
          />
          <span className="popup__input-error place-name-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            id="place-link"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            value={placeLink}
            onChange={handleChangePlaceLink}
            required
          />
          <span className="popup__input-error place-link-error"></span>
        </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;

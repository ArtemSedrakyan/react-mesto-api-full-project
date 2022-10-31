import React from "react";

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={`popup popup_type_view ${this.props.card.link && 'popup_opened'} `}>
        <figure className="popup__figure">
          <img className="popup__image" src={`${this.props.card.link}`} alt={`${this.props.card.name}`} />
          <figcaption className="popup__description">{`${this.props.card.name}`}</figcaption>
          <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={this.props.onClose} />
        </figure>
      </div>
    );
  };
}

export default ImagePopup;

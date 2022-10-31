import React from "react";

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`popup popup_type_${this.props.name} ${this.props.isOpen && 'popup_opened'} `}>
        <form className={`popup__form popup__form_type_${this.props.name}`} name={`form-type-${this.props.name}`}
          onSubmit={this.props.onSubmit}>
          <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={this.props.onClose} />
          <h2 className="popup__title">{`${this.props.title}`}</h2>
          {this.props.children}
          <button className="popup__submit-button" type="submit">{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default PopupWithForm;

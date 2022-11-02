import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Card extends React.Component {
  static contextType = CurrentUserContext;

  handleImgClick = () => {
    this.props.onCardClick(this.props.card);
  };

  isOwn() {
    return this.props.card.owner === this.context._id;
  };

  isLiked() {
    return this.props.card.likes.some(like => like === this.context._id);
  };

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  };

  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  };

  render() {
    return (
      <li className="element">
        <img className="element__image" src={this.props.card.link} alt={this.props.card.name} onClick={this.handleImgClick} />
        <h2 className="element__place-name">{this.props.card.name}</h2>
        <button className={`element__like-button ${this.isLiked() ? 'element__like-button_active' : ' '}`}
          type="button" aria-label="Лайк" onClick={this.handleLikeClick}>
          <p className="element__like-counter">{this.props.card.likes.length}</p>
        </button>
        <button className={`element__delete-button ${this.isOwn() ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`}
          type="button" aria-label="Удалить карточку" onClick={this.handleDeleteClick}/>
      </li>
    );
  };
}

export default Card;

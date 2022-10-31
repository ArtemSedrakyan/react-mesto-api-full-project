import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

class Main extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <main className="page__element content">
        <section className="profile">
          <button className="profile__avatar-button" type="button" aria-label="Редактировать аватар"
            onClick={this.props.onEditAvatar}>
            <img className="profile__avatar" id="avatar" src={this.context.avatar} alt="Ваш аватар"/>
          </button>
          <div className="profile__info">
            <h1 className="profile__name" id="name">{this.context.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать"
              onClick={this.props.onEditProfile}></button>
            <p className="profile__about" id="about">{this.context.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить"
            onClick={this.props.onAddPlace}></button>
        </section>
        <section className="page__element">
          <ul className="elements">
            {this.props.cards.map((element) => {
              return (
                <Card key = {element._id} card = {element} onCardClick = {this.props.onCardView}
                  onCardLike = {this.props.onCardLike} onCardDelete={this.props.onCardDelete}/>
              );
            })}
          </ul>
        </section>
      </main>
    );
  };
}

export default Main;

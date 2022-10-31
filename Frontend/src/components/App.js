import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatatPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import * as mestoAuth from '../utils/mestoAuth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfileOpen: false,
      isAddPlacePopupOpen: false,
      isInfoToolTipPopupOpen: false,
      selectedCard: { name: "", link: "" },
      currentUser: { },
      cards: [ ],
      loggedIn: false,
      regStatus: false,
      checkImage: "",
      checkMessage: "",
      userEmailOnHeader: ""
    };
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfileOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleCardClick = (cardElement) => {
    this.setState({ selectedCard: cardElement });
  };

  closeAllPopups = () => {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfileOpen: false,
      isAddPlacePopupOpen: false,
      isInfoToolTipPopupOpen: false,
      selectedCard: { name: "", link: "" },
    });
  };

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      this.setState({
        currentUser: userData,
        cards: cards
      });
    })
    .catch((err) => {
      console.log(err);
    });
    this.checkToken();
  };

  handleUpdateUser = (data) => {
    api.patchProfileData(data)
    .then(() => {
      this.setState({
        currentUser: this.state.currentUser
      })
      api.getUserInfo()
        .then((userData) => {
          this.setState({
            currentUser: userData,
          });
          this.closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handleUpdateAvatar = (data) => {
    api.patchProfileAvatar(data)
    .then(() => {
      api.getUserInfo()
      .then((userData) => {
        this.setState({
          currentUser: userData,
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === this.state.currentUser._id);

    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      this.setState({
        cards: this.state.cards.map(
          (stateElement) => stateElement._id === card._id ? newCard : stateElement
        )
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      this.setState({
        cards: this.state.cards.filter((stateElement) => stateElement._id !== card._id)
      })
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handleAddPlaceSubmit = (card) => {
    api.addNewCard(card)
    .then((newCard) => {
      this.setState({
        cards: [newCard, ...this.state.cards]
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  onRegister = (email, password) => {
    mestoAuth.register(password, email)
    .then((res) => {
      this.setState({isInfoToolTipPopupOpen: true});
      if (res) {
        this.setState({regStatus: true})
        this.props.history.push('/sign-in');
      }
    })
    .catch(() => {
      this.setState({regStatus: false});
      this.setState({isInfoToolTipPopupOpen: true});
    })
  };

  onLogin = (email, password) => {
    mestoAuth.authorize(email, password)
    .then((res) => {
      if(res) {
        this.setState({loggedIn: true});
        this.setState({userEmailOnHeader: email});
        this.props.history.push('/');
        localStorage.setItem('jwt', res.token);
      }
    })
    .catch(() => {
      this.setState({regStatus: false});
      this.setState({isInfoToolTipPopupOpen: true});
    })
  };

  checkToken = () => {
    const token = localStorage.getItem('jwt');
    if(token) {
      mestoAuth.validityToken(token)
      .then((res) => {
        if (res) {
          this.setState({userEmailOnHeader: res.data.email});
        };
        this.setState({loggedIn: true})
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  logoutProfile = async () => {
    await mestoAuth.signOut();
    localStorage.removeItem('jwt');
    this.props.history.push('/sign-in');
    this.setState({loggedIn: false})
  };

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header
          userEmailOnHeader={this.state.userEmailOnHeader}
          logoutProfile={this.logoutProfile}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={this.state.loggedIn}
            component={Main}
            onEditAvatar={this.handleEditAvatarClick}
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onCardView={this.handleCardClick}
            cards={this.state.cards}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
          />
          <Route path="/sign-up">
            <Register
              onRegister={this.onRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={this.onLogin}
            />
          </Route>
          <Route exact path="/">
            {this.state.loggedIn ?
              <Redirect to="/" /> :
              <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={this.state.isEditProfileOpen}
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onAddPlace={this.handleAddPlaceSubmit}
        />
        <PopupWithForm name="confirm" title="Вы уверены?" />
        <EditAvatarPopup
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar}
        />
        <ImagePopup
          onClose={this.closeAllPopups}
          card={this.state.selectedCard}
        />
        <InfoToolTip
          isOpen={this.state.isInfoToolTipPopupOpen}
          onClose={this.closeAllPopups}
          checkImage={this.state.checkImage}
          checkMessage={this.state.checkMessage}
          status={this.state.regStatus}
        />
        <Footer />
      </CurrentUserContext.Provider>
    );
  };
};

export default withRouter(App);

import React, {useState, useEffect} from "react";
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

function App ({history}) {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [regStatus, setRegStatus] = useState(false);
  const [userEmailOnHeader, setUserEmailOnHeader] = useState("");

useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(cardElement) {
    setSelectedCard(cardElement);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  };

  function handleUpdateUser(data) {
    api.patchProfileData(data)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    });
  };

  function handleUpdateAvatar(data) {
    api.patchProfileAvatar(data)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards(cards.map(
          (stateElement) => stateElement._id === card._id ? newCard : stateElement
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((stateElement) => stateElement._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function onRegister(email, password) {
    mestoAuth.register(password, email)
    .then((res) => {
      setIsInfoToolTipPopupOpen(true);
      if (res) {
        setRegStatus(true);
        history.push('/sign-in');
      }
    })
    .catch(() => {
      setRegStatus(false);
      setIsInfoToolTipPopupOpen(true);
    })
  };

  function onLogin(email, password) {
    mestoAuth.authorize(email, password)
    .then((res) => {
      if(res) {
        setLoggedIn(true);
        setUserEmailOnHeader(email);
        history.push('/');
        localStorage.setItem('jwt', res.token);
      }
    })
    .catch(() => {
      setRegStatus(false);
      setIsInfoToolTipPopupOpen(true);
    })
  };

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      mestoAuth.validityToken()
      .then((res) => {
        if (res) {
          setUserEmailOnHeader(res.email);
        };
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const logoutProfile = async () => {
    await mestoAuth.signOut();
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(true);
  };

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmailOnHeader={userEmailOnHeader}
          logoutProfile={logoutProfile}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardView={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register
              onRegister={onRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={onLogin}
            />
          </Route>
          <Route exact path="/">
            {loggedIn ?
              <Redirect to="/" /> :
              <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm name="confirm" title="Вы уверены?" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          status={regStatus}
        />
        <Footer />
      </CurrentUserContext.Provider>
    );
};

export default withRouter(App);

import { useState, useEffect, useCallback } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';

// Роуты
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';

// Автоизация
import * as mestoAuth from '../utils/mestoAuth.js';

function App() {
  //! Стейты попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [infoTooltipData, setInfoTooltipData] = useState({});

  // Текст при загрузке
  const [isLoading, setLoading] = useState(false);

  //! Стейт пользователя
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });

  //! Стейты карточки
  const [cards, setCards] = useState([]);

  //! Регистрация и авторизация
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const history = useHistory();

  // Попап профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // Попап добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // Попап смены аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Попап с инфо о регистрации
  function handleInfoTooltipPopup(data) {
    setInfoTooltipData(data);
    setInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }

  // Попап с картинкой по клику
  function handleCardClick(card) {
    setSelectedCard({
      ...selectedCard,
      link: card.link,
      name: card.name,
    });
    setImagePopupOpen(true);
  }

  // Получение данных пользователя
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  // Обновление пользователя
  function handleUpdateUser(user) {
    setLoading(true);

    api
      .setUserInfo(user)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setLoading(false), 1500));
  }

  // Обновление аватара
  function handleUpdateAvatar(user) {
    setLoading(true);

    api
      .setNewAvatar(user)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setLoading(false), 1500));
  }

  // Получение массива карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  // Лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // Добавление новой карточки
  function handleAddPlace(data) {
    setLoading(true);

    api
      .addCustomCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setLoading(false), 1500));
  }

  // Токен
  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      mestoAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch(() => {
          localStorage.removeItem('jwt');
          history.push('/signin');
        });
    }
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // Логин
  function handleLogin({ password, email }) {
    mestoAuth
      .authorisation(password, email)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error('Что-то пошло не так');

        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        handleInfoTooltipPopup({
          isRegistered: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      });
  }

  // Регистрация
  function handleRegister({ password, email }) {
    mestoAuth
      .register(password, email)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error('Что-то пошло не так');

        if (res) {
          handleInfoTooltipPopup({
            isRegistered: true,
            text: 'Вы успешно зарегистрировались.',
          });
          history.push('/signin');
        }
      })
      .catch((err) => {
        handleInfoTooltipPopup({
          isRegistered: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      });
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            email={email}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route exact path="/signin">
            <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
          </Route>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        {/* Попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          onLoading={isLoading}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        {/* Попап с картинкой*/}
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        {/* Попап с подтверждением/отклонением регистрации */}
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          data={infoTooltipData}
        />

        {/* Попап удаления карточки на будущее 
        <PopupWithForm name="remove" title="Вы уверены?" buttonText="Да" />
        */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

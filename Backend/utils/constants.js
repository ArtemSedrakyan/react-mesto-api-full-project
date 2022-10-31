const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'Ошибка сервера.';
const INVALID_DATA_MESSAGE = 'Переданы некорректные данные.';
const UNAUTHORIZED_USER_MESSAGE = 'Пользователь с указанными данными не найден';
const NOT_FOUND_USER_ID_MESSAGE = 'Пользователь с указанным id не найден.';
const NOT_FOUND_CARD_ID_MESSAGE = 'Карточка с указанным id не найдена.';
const CAST_ERROR_MESSAGE = 'Запрашиваемый адрес не найден.';
const USER_CONFLICT_MESSAGE = 'Пользователь с указанной электронной почтой уже существует';
const FORBIDDEN_ERROR_MESSAGE = 'У пользователя нет прав на удаление';

module.exports = {
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  INVALID_DATA_MESSAGE,
  UNAUTHORIZED_USER_MESSAGE,
  NOT_FOUND_USER_ID_MESSAGE,
  NOT_FOUND_CARD_ID_MESSAGE,
  CAST_ERROR_MESSAGE,
  USER_CONFLICT_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
};

const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED_USER_MESSAGE,
} = require('../utils/constants');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new NotAuthorizedError(UNAUTHORIZED_USER_MESSAGE);
  }

  req.user = payload;

  return next();
};

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');
const { INVALID_DATA_MESSAGE } = require('../utils/constants');

const validateLink = (link) => {
  if (!validator.isURL(link, { require_protocol: true })) {
    throw new BadRequestError(INVALID_DATA_MESSAGE);
  } else {
    return link;
  }
};

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateLink),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateLink),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateLink),
  }),
});

const getCardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const isMatchedRegExp = (link) => /^(https?:\/\/)(www\.)?([\w-]+.)+[\w-]+(\/[\w-./?#@!&',;=#])?$/.test(link);

module.exports = {
  loginValidation,
  getUserIdValidation,
  createUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation,
  getCardIdValidation,
  isMatchedRegExp,
};

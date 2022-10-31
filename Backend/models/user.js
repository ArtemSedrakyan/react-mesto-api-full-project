const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { UNAUTHORIZED_USER_MESSAGE } = require('../utils/constants');
const { isMatchedRegExp } = require('../middlewares/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => isMatchedRegExp(avatar),
      message: 'Введен некорректный адрес',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен некорректный Email-адрес',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthorizedError(UNAUTHORIZED_USER_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthorizedError(UNAUTHORIZED_USER_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

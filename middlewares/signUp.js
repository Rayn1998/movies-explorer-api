const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestError = require('./BadRequestError');
const SameMovieError = require('./SameMovieError');

const signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then(() => res.status(201).send({ email, name }))
        .catch((e) => {
          if (e instanceof mongoose.Error.ValidationError) {
            next(new BadRequestError('Введены некорректные данные'));
          } else if (e.code === 11000) {
            next(
              new SameMovieError(
                'Пользователь с таким email уже зарегистрирован',
              ),
            );
          } else {
            next(e);
          }
        });
    })
    .catch(next);
};

module.exports = signUp;

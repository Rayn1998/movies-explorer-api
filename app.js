require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { hanleError } = require('./middlewares/handleError');
const NotFoundError = require('./middlewares/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const users = require('./routes/users');
const movies = require('./routes/movies');

const signUp = require('./middlewares/signUp');
const signIn = require('./middlewares/signIn');
const auth = require('./middlewares/auth');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(requestLogger);

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
  }),
}), signUp);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), signIn);

app.use('/movies', auth, movies);
app.use('/users', auth, users);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  hanleError(err, req, res, next);
});

mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
  })
  .then(
    () =>
      app.listen(process.env.PORT, () => {
        console.log('API works');
      }),
    (err) => {
      console.log(err);
    },
  );

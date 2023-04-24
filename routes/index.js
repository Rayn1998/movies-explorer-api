const express = require('express');

const router = express.Router();
const { celebrate, Joi, errors } = require('celebrate');

const signUp = require('../middlewares/signUp');
const signIn = require('../middlewares/signIn');
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { pageNotFoundMsg } = require('../utils/constants');

const NotFoundError = require('../middlewares/NotFoundError');
const { handleError } = require('../middlewares/handleError');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
  }),
}), signUp);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), signIn);

router.use('/movies', auth, movieRoutes);
router.use('/users', auth, userRoutes);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(pageNotFoundMsg));
});

router.use(errorLogger);

router.use(errors());

router.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

module.exports = router;

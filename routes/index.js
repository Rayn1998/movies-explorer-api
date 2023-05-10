const express = require('express');

const router = express.Router();
const { celebrate, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const limit = require('../middlewares/rateLimiter/limit');
const signUp = require('../middlewares/signUp');
const signIn = require('../middlewares/signIn');
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { pageNotFoundMsg } = require('../utils/constants');

const NotFoundError = require('../middlewares/NotFoundError');
const { handleError } = require('../middlewares/handleError');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validation/singInUpValidation');
const limiter = rateLimit(limit);

router.use(requestLogger);

router.use(limiter);
router.use(helmet());

router.use(
  cors({
    origin: '*',
  }),
);

router.use(express.json());

router.post('/signup', celebrate(signUpValidation), signUp);

router.post('/signin', celebrate(signInValidation), signIn);

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

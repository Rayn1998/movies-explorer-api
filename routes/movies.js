const movies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkPattern } = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movies.get('/', getMovies);
movies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkPattern),
    trailerLink: Joi.string().required().pattern(linkPattern),
    thumbNail: Joi.string().required().pattern(linkPattern),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createMovie);
movies.delete('/:id', deleteMovie);

module.exports = movies;

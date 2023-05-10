const movies = require('express').Router();
const { celebrate } = require('celebrate');
const moviePostValidation = require('../middlewares/validation/moviePostValidation');
const movieDeleteValidation = require('../middlewares/validation/movieDeleteValidation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movies.get('/', getMovies);
movies.post('/', celebrate(moviePostValidation), createMovie);
movies.delete('/:id', celebrate(movieDeleteValidation), deleteMovie);

module.exports = movies;

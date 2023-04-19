const movies = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movies.get('/', getMovies);
movies.post('/', createMovie);
movies.delete('/:id', deleteMovie);

module.exports = movies;

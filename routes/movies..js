const movies = require('express').Router();

movies.get('/', getMovies);
movies.post('/', createMovie);
movies.delete('/:id', deleteMovie);

module.exports = movies;
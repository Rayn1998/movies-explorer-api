const mongoose = require('mongoose');

const SameMovieError = require('../middlewares/SameMovieError');
const BadRequestError = require('../middlewares/BadRequestError');
const NotFoundError = require('../middlewares/NotFoundError');

const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    nameRU,
    nameEN,
    trailerLink,
    thumbNail,
    movieId,
  } = req.body;
  let movie;
  try {
    movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      trailerLink,
      thumbNail,
      movieId,
    });
    res.status(201).send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Введены некорректные данные'));
    } else if (err.code === 11000) {
      next(
        new SameMovieError(
          'Такой фильм уже есть',
        ),
      );
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  let movie;
  try {
    movie = await Movie.findById(id);
    movie.deleteOne();
    res.status(200).send({ message: 'Фильм удалён' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Введён некорректный id карточки'));
    } else if (!movie) {
      next(new NotFoundError('Фильм не найден'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};

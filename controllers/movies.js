const mongoose = require('mongoose');

const SameMovieError = require('../middlewares/SameMovieError');
const BadRequestError = require('../middlewares/BadRequestError');
const NotFoundError = require('../middlewares/NotFoundError');
const ForbiddenError = require('../middlewares/ForbiddenError');

const {
  incorrectDataMsg,
  sameMovieMsg,
  filmNotFoundMsg,
  cantDeleteOtherUserMovieMsg,
  movieDeletedMsg,
  incorrectMovieIdMsg,
} = require('../utils/constants');

const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  const userId = req.user._id;
  let movies;
  try {
    movies = await Movie.find({}).populate('owner');
    movies = movies.filter((movie) => movie.owner._id.valueOf() === userId);
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
    thumbnail,
    movieId,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      trailerLink,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    if (movie) {
      const populatedMovie = await movie.populate('owner');
      res.status(201).send(populatedMovie);
    } else {
      throw new BadRequestError(incorrectDataMsg);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(incorrectDataMsg));
    } else if (err.code === 11000) {
      next(new SameMovieError(sameMovieMsg));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  let movie;
  try {
    movie = await Movie.findOne({ _id: id });
    if (!movie) {
      throw new NotFoundError(filmNotFoundMsg);
    }
    if (movie.owner.valueOf() !== req.user._id) {
      throw new ForbiddenError(cantDeleteOtherUserMovieMsg);
    }
    movie.deleteOne().then(() => {
      res.status(200).send({ message: movieDeletedMsg, movie });
    });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(incorrectMovieIdMsg));
    } else if (!movie) {
      next(new NotFoundError(filmNotFoundMsg));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

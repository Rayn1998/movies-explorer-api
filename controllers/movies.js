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
const { body } = require('../middlewares/validation/moviePostValidation');

const getMovies = async (req, res, next) => {
  const userId = req.user._id;
  let movies;
  try {
    movies = await Movie.find({}).populate('owner');
    movies = movies.filter((movie) =>
      movie.owner.some((owner) => owner._id.valueOf() === userId),
    );
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const { id } = req.body;
  const userId = req.user._id;
  const movieData = { ...req.body, owner: [userId] };

  try {
    const isMovie = await Movie.findOneAndUpdate(
      { id },
      { $addToSet: { owner: userId } },
      { new: true },
    ).populate('owner');
    if (isMovie) {
      res.status(200).send(isMovie).end();
    } else {
      const movie = await Movie.create(movieData);
      if (movie) {
        const populatedMovie = await movie.populate('owner');
        res.status(201).send(populatedMovie);
      } else {
        throw new BadRequestError(incorrectDataMsg);
      }
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
  const userId = req.user._id;
  let movie;
  try {
    movie = await Movie.findOne({ _id: id });
    if (!movie) {
      throw new NotFoundError(filmNotFoundMsg);
    } else if (movie.owner.some((item) => item.valueOf() === userId)) {
      if (movie.owner.length === 1) {
        movie
          .deleteOne()
          .then(() => {
            res.status(200).send({ message: movieDeletedMsg, movie }).end();
          })
          .catch(next);
      } else {
        await movie.updateOne({ $pull: { owner: userId } });
        res.status(200).send(movie).end();
      }
    } else {
      throw new NotFoundError(filmNotFoundMsg);
    }
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

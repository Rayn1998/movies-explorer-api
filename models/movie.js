const mongoose = require('mongoose');
const { linkPattern, linkIncorrectMsg } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => linkPattern.test(url),
      message: linkIncorrectMsg,
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => linkPattern.test(url),
      message: linkIncorrectMsg,
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => linkPattern.test(url),
      message: linkIncorrectMsg,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: String,
    required: true,
    unique: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

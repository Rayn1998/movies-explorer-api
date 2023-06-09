const mongoose = require('mongoose');
const { modelEmailPatter, emailIncorrectMsg } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email) => modelEmailPatter.test(email),
      message: emailIncorrectMsg,
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

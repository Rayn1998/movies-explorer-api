const User = require('../models/user');
const BadAuthError = require('./BadAuthError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        next(new BadAuthError('Неправильные почта или пароль'));
        return;
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV !== 'production' ? process.env.JWT_SECRET : 'secret', { expiresIn: '1d' });
          res.send({ token });
        } else {
          next(new BadAuthError('Неправильные почта или пароль'));
        }
      });
    })
    .catch(next);
};

module.exports = signIn;

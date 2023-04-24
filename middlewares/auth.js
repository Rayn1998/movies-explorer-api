const jwt = require('jsonwebtoken');
const BadAuthError = require('./BadAuthError');
const { unauthorizedUserMsg } = require('../utils/constants');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new BadAuthError(unauthorizedUserMsg));
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? process.env.JWT_SECRET : 'secret');
  } catch (e) {
    next(new BadAuthError(unauthorizedUserMsg));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;

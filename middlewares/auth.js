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
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).send({ message: unauthorizedUserMsg });
    next(new BadAuthError(unauthorizedUserMsg));
    return;
  }
};

module.exports = auth;

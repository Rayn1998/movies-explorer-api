const { serverErrorMsg } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? serverErrorMsg : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { handleError };

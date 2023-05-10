const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const movieDeleteValidation = {
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};

module.exports = movieDeleteValidation;

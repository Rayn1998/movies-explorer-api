const { Joi } = require('celebrate');

const movieDeleteValidation = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = movieDeleteValidation;

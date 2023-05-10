const { Joi } = require('celebrate');

const userUpdateValidation = {
  body: Joi.object().keys({
    email: Joi.string(),
    name: Joi.string(),
  }),
};

module.exports = userUpdateValidation;

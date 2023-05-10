const { Joi } = require('celebrate');

const userUpdateValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

module.exports = userUpdateValidation;

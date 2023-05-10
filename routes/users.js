const { celebrate } = require('celebrate');
const users = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const userUpdateValidation = require('../middlewares/validation/userUpdateValidation');

users.get('/me', getMe);
users.patch('/me', celebrate(userUpdateValidation), updateUser);

module.exports = users;

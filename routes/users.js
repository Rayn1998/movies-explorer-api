const users = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');

users.get('/me', getMe);
users.patch('/me', updateUser);

module.exports = users;

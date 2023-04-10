const users = require('express').Router();

users.get('/me', getMe);
users.patch('/me', updateUser);

module.exports = users;
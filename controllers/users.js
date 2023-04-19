const User = require('../models/user');
const BadRequestError = require('../middlewares/BadRequestError');

const getMe = async (req, res, next) => {
  const id = req.user._id;
  let user;
  try {
    user = await User.findById(id);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Произошла ошибка обновления профиля'));
    } else {
      next(err);
    }
  }
};

module.exports = { getMe, updateUser };

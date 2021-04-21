const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const AuthorisationError = require('../errors/authorisation-error');
const ConflictError = require('../errors/conflict-error');

const { JWT_SECRET, NODE_ENV } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('User not found');
      } else if (err.name === 'CastError') {
        throw new CastError('Wrong user Id');
      }

      next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Validation error');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError('User already exists');
      }

      next(err);
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'such-key',
        { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Authorisation successful' });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        throw new AuthorisationError('Wrong email or password');
      }

      next(err);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('User not found');
      } else if (err.name === 'CastError') {
        throw new CastError('Wrong user Id');
      }

      next(err);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('User not found');
      } else if (err.name === 'ValidationError') {
        throw new ValidationError('Validation error');
      } else if (err.name === 'CastError') {
        throw new CastError('Wrong user Id');
      }

      next(err);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('User not found');
      } else if (err.name === 'ValidationError') {
        throw new ValidationError('Validation error');
      } else if (err.name === 'CastError') {
        throw new CastError('Wrong user Id');
      }

      next(err);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  loginUser,
  getCurrentUser,
};

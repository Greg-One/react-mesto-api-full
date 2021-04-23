const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/authorisation-error');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'such-key');
  } catch (err) {
    next(new AuthorisationError('Authorisation error'));
  }

  req.user = payload;
  next();
};

module.exports = auth;

const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-error');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'such-key');
  } catch (err) {
    next(new ForbiddenError('Authorisation error.'));
  }

  req.user = payload;
  next();
};

module.exports = auth;

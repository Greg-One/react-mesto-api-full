const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const dotenv = require('dotenv');

dotenv.config();

const auth = require('./middlewares/auth');
const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const { createUser, loginUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors({
  origin: 'http://onemore.mesto.nomoredomains.club',
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is about to become offline');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(/^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardRoute);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? `${err}` : message });

  next();
});

app.listen(PORT, () => {
  console.log(`Server starts on port ${PORT}`);
});

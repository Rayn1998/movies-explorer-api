require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const limit = require('./middlewares/rateLimiter/limit');

const limiter = rateLimit(limit);

const router = require('./routes');

const { PORT = 3001, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(limiter);
app.use(helmet());

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());

app.use('/', router);

mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
  })
  .then(
    () => app.listen(PORT, () => {
      console.log('API works');
    }),
    (err) => {
      console.log(err);
    },
  );

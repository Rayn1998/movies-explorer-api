require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
  })
  .then(
    () =>
      app.listen(process.env.PORT, () => {
        console.log('API works');
      }),
    (err) => {
      console.log(err);
    },
  );

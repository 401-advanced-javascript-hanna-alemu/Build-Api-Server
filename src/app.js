'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');

const routes = require('./router.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(notFound);
app.use(errorHandler);

app.set('port', process.env.PORT || 3000);
module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log(`Hi Hanna, App is listening on ${port}`);
    });
  },
  server: app,
};

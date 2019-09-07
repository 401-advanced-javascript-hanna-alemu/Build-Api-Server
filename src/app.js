'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');

// const categoriesModel = require('../src/models/categories/categories-schema');
// const productsModel = require('../src/models/products/products-schema');


const apiRouter = require('../src/routes/api-router');
const authRouter = require('../src/routes/auth-router');

const app = express();
// App Level MW
app.use(cors());
app.use(morgan('dev'));

// app.use(categoriesModel);
// app.use(productsModel);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(apiRouter);
app.use(authRouter);

app.use('/docs', express.static('docs'));
// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is Up on ${port}`);
    });
  },
};

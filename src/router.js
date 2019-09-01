'use strict';


const express = require('express');
const apiRouter = express.Router();

const User = require('./model/user');
const auth = require('../middleware/auth');

//Hanna ------------------------signup route --------------

apiRouter.post('/signup', (req, res, next) => {
  //Hanna ---- Create new user from request entered using user model
  const user = new User(req.body);

  //Hanna ---- save the created user
  user.save()
    .then(( user ) => {
      //Hanna ---- create token-----
      let token = user.generateToken();

      res.cookie('auth', token);
      res.set('token', token);
      res.status( 200 );
      res.send( token );
    })
    .catch((err) => next(err));

});

//Hanna -------------------------signin route ----------------

apiRouter.post('/signin', (req, res, next) => {

  res.cookie('auth', req.token);
  res.send(req.token);

});

module.exports = apiRouter;

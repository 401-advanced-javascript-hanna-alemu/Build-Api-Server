'use strict';


const express = require('express');
const authRouter = express.Router();

const User = require('../models/auth/user');
const helper = require('../../middleware/auth');
const authenticate = helper.authenticate;

//Hanna ------------------------signup route --------------

authRouter.post('/signup', signup);

function signup (request, response, next) {
  //Hanna ---- Create new user from request entered using user model
  const user = new User(request.body);

  //Hanna ---- save the created user
  user.save()
    .then( user => {
      response.status( 200 ).json( user );
    })
    .catch((err) => next(err));

}

//Hanna -------------------------signin route ----------------

authRouter.post('/signin', authenticate , signin);

function signin (request, response ) {

  response.status( 200 ).json(request.token);

}

module.exports = authRouter;

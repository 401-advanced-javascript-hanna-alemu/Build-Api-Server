'use strict';

//Hanna - import user model
const User  = require('../src/models/auth/user');

module.exports = {};

module.exports.modelLoader = (request, response, next) => {
  let model = request.params.model;
  let schema = require(`../src/models/api/${model}/${model}-schema.js`);
  let Model = require('../src/models/crudmodel');
  request.model = new Model( schema );
  next();
};

module.exports.authenticate = ( request, response, next ) => {

  try {
    let path = request.originalUrl.split( '/' )[1];
    let [ authType, authString ] = request.headers.authorization.split(' ');
    if ( authType.toLowerCase() === 'basic' && path === 'signin' ) {
      return basic( authString );
    } else if ( authType.toLowerCase() === 'bearer' && [ 'products', 'categories' ].includes( request.params.model ) ) {
      return token( authString );
    } else response.send( 'Could not authenticate.' );
  } catch( error ){
    next( error);
  }

  function basic (basicAuthString) {
    let credentials = decode( basicAuthString);
    return User.basicAuth( credentials)
      .then( user => {
        if( user ) {
          request.user = user.username;
          request.token = user.generateToken();
          next();
        }
      })
      .catch( error => next(error));
  }

  function decode (authString ) {
    let buffer = Buffer.from(authString, 'base64').toString();
    let [username, password ]= buffer.split(':');
    return { username, password};
  }

  function token (tokenAuthString) {
    return User.authenticateToken( tokenAuthString)
      .then( user => {
        if(user ) {
          next();
        }
        else response.send('Bad token ');
      })
      .catch(error => next(error));
  }
 
};
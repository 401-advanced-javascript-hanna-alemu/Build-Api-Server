'use strict';

//Hanna - import user model
const User  = require('../src/model/user');

module.exports = (req, res, next) => {
  try {
    //Hanna - auth = req.header.authorization
    let [authType, authString] = req.headers.authorization.split(/\s+/);

    switch (authType.toLowerCase()) {
    case 'basic':
      //Hanna -check users credentials
      let base64Buffer = Buffer.from(authString, 'base64');
      //Hanna - now we have a binary string
      let BufferString = base64Buffer.toString();
      //Hanna - now we have username and password

      let[username, password] = BufferString.split(':');
      return User.authenticateBasic({ username, password })
        .then(user => {
          req.user = user;
          req.token = user.generateToken();
          next();
        })
        .catch(() => next('Invalid username or password'));

    case 'bearer':
      //Hanna ----- Check if token is valid
      return User.authenticateToken(authString)
        .then( user => {
          req.user = user;
          req.token = user.generateToken();
          next();
        })
        .catch(() => next('Invalid Token'));

    default:
      next('Unauthorized Access');
    }
  }
  catch(e) {
    next(e);
  }

};

'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

//Hanna - create user mongoose schema
const userSchema =new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
});
 
//Hanna- Hash the password before you save it, Salt rounds = 10
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then( hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

//Hanna ---------------------------Basic user authentication -------------

userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => {
      if(user && user.comparePassword( auth.password)) {
        return user;
      }
      else console.log('invalid credentials');
    })
    .catch(error => {
      throw error;
    });
};

//Hanna - Check if the password matches

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(isValid => isValid? this: null)
    .catch(error => console.log('password does not match', error));
};

//Hanna ---------------------------------Bearer Authentication----------

userSchema.statics.authenticateToken = function(token) {
  let decryptedToken = jwt.verify(token, process.env.SECRET);
  return this.findOne({_id: decryptedToken.id })
    .then(user => {
      return user ? user : null;
    })
    .catch( error => console.log('invalid token', error));
};


//Hann - Generate token function
userSchema.methods.generateToken = function () {
  let object = {
    id: this._id,
  };
  return jwt.sign(object, process.env.SECRET || 'I am hanna');
};

module.exports  = mongoose.model('Users', userSchema);


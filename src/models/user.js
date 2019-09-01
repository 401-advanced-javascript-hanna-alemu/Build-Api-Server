'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

//Hanna - create user mongoose schema
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
});
 
//Hanna- Hash the password before you save it, Salt rounds = 10
userSchema.pre('save', async function () {
  if(this.isModified( 'password' )) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

//Hanna ---------------------------Basic user authentication -------------

userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => {
      return user.comparePassword(auth.password);
    })
    .catch(error => {
      throw error;
    });
};

//Hanna - Check if the password matches

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(isValid => isValid? this: null);
};

//Hanna ---------------------------------Bearer Authentication----------

userSchema.statics.authenticateToken = function(token) {
  try {
    let decryptedToken = jwt.verify(token, process.env.SECRET);
    return this.findOne({_id: decryptedToken.id });
  } catch(e) {
    throw new Error('Invalid Token');
  }
};


//Hann - Generate token function
userSchema.methods.generateToken = function () {
  let object = {
    id: this._id,
  };
  return jwt.sign(object, process.env.SECRET || 'I am hanna');
};

module.exports  = mongoose.model('Users', userSchema);


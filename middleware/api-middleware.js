'use strict';

module.exports = {};

module.exports.modelFinder = (req, res, next) => {
  let modelName = req.pareams.model;

  const Model = require('../src/models/mongo-model');
  const schema = require(`../src/models/${modelName}/${modelName}-schema`);

  req.model = new Model ( schema );
  next();
};


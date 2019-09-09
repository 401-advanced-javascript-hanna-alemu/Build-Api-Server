'use strict';

const express = require('express');
const apiRouter = express.Router();

const helper = require('../../middleware/auth');
const modelLoader = helper.modelLoader;
const auth = helper.authenticate;



apiRouter.param('model', modelLoader);

apiRouter.get('/content/:model', auth, handleGet);
apiRouter.post('/content/:model',auth, handlePost);
apiRouter.put('/content/:model',auth, handlePut);
apiRouter.delete('/content/:model', auth, handleDelete);



// Route Handlers
function handleGet(request,response,next) {
  if( request.query.id ) {
    return request.model.read(request.query.id)
      .then( results => response.status(200).json( results))
      .catch( error => next(error));
  } else {
    return request.model.read()
      .then(results => response.status(200).json( results ))
      .catch(error => next(error));
  }
}
function handlePost(request,response,next) {
  if( request.body ) {
    return request.model.create(request.body)
      .then( result => response.status(200).json(result) )
      .catch( error => next(error) );
  } else {
    response.send('Invalid input');
  }
}

function handlePut(request,response,next) {
  return request.model.update(request.query.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  return request.model.delete(request.query.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}
  
module.exports = apiRouter;
  
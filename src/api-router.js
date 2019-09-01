'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require('./model-finder');

const apiRouter = express.Router();

apiRouter.param('model', modelFinder.load);

apiRouter.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

apiRouter.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});


apiRouter.get('/api/v1/:model', handleGetAll);
apiRouter.post('/api/v1/:model', handlePost);
apiRouter.get('/api/v1/:model/:id', handleGetOne);
apiRouter.put('/api/v1/:model/:id', handlePut);
apiRouter.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  console.log('hellooooo');
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = apiRouter;



// 'use strict';

// const { patchHandler } = require("./patchHandler");

// const express = require('express');
// const apiRouter = express.Router();
// const apiMiddleware = require('../middleware/api-middleware');


// apiRouter.param('model', apiMiddleware.modelFinder);

// apiRouter.get('/:model', getData);

// apiRouter.post('/:model', createNew);

// apiRouter.put('/:model/:req', updateHandler);

// apiRouter.patch('/:model', patchHandler);

// apiRouter.delete('/:model/:req', deleteHandler);

// function getData (req, res, next) {
//   console.log('inside function');
//   if( req.query.id ) {
//     return req.model.get(req.query.id)
//       .then( result => res.status(200).send( result) )
//       .catch( error => next( error ));
//   } else req.model.get()
//     .then( result => res.status(200).send( result ))
//     .catch( error => next( error ));
// }

// function createNew (req, res, next) {
//   if( req.body ) {
//     return req.model.create( req.body )
//       .then( result => res.status( 200 ).send(result))
//       .catch( error => next( error ));
//   } else res.send( 'Cannot create: Invalid input');
// }

// function updateHandler (req, res, next) {
//   if(HTMLTableRowElement.query.id) {
//     return req.model.update( req.query.id, req.body )
//       .then(updatedItem => res.status(200).send( updatedItem))
//       .catch( error => next( error ));
//   } else res.send( 'Cannot update entry');
// }


// function deleteHandler (req, res, next) {
//   if( req.query.id) {
//     return req.model.delete(req.query.id )
//       .then( deletedItem => res.status(200).send( deletedItem))
//       .catch( error => next( error ));
//   } else res.send( 'Cannot delete entry');
// }

// module.exports = apiRouter;

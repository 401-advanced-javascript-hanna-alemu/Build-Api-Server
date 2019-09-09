'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('web server', () => {

  it('should respond to get a category from /api/v1/:model', () => {

    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(0);
      }).catch(console.error);

  });

  it('should respond to creating a category /api/v1/:model', () => {

    return mockRequest
      .post('api/v1/categories')
      .send({name:'Test', description:'test stuff'})
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
      }).catch(console.error);

  });


  it('should respond properly to updating a category on /api/v1/categories', () => {
    const testCategory = {
      name: 'Songs',
      type: 'Song playlist',
      description: 'list of songs',
    };
    const updateTest = {
      name: 'music',
      type: 'List of songs',
      description: 'list of my songs',
    };

    return mockRequest.put('/api/v1/categories')

      .send(testCategory)
      .then(result => {
        return mockRequest.put(`/api/vq/categories/${result.body._id}`).send(updateTest);
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });

  });



  it('should respond properly to deleting a category on /api/v1/categories', () => {
    const testCategory = {
      name: 'Songs',
      type: 'Song playlist',
      description: 'list of songs',
    };

    return mockRequest.post('/api/v1/categories')

      .send(testCategory)
      .then(result=> {
        return (mockRequest.delete(`/api/v1/categories/${result.body._id}`));
      })

      .then(response=> {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });
  });  

  it('should respond to get a product from /api/v1/:model', () => {

    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(0);
      }).catch(console.error);
    
  });
    
  it('should respond to creating a product /api/v1/:model', () => {
    
    return mockRequest
      .post('api/v1/products')
      .send({name:'Test', description:'test stuff'})
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
      }).catch(console.error);
    
  });
    
    
  it('should respond properly to updating a product on /api/v1/products', () => {
    const testProduct = {
      name: 'Hello good morning',
      category: 'songs',
      price: 10,
      description: 'Song by Diddy',
    };
    const updateTest = {
      name: 'Hello good morning',
      category: 'songs',
      price: 20,
      description: 'Song by Puff Daddy',
    };
    
    return mockRequest.put('/api/v1/products')
    
      .send(testProduct)
      .then(result => {
        return mockRequest.put(`/api/vq/products/${result.body._id}`).send(updateTest);
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(updateTest.name);
      });
    
  });
    
    
    
  it('should respond properly to deleting a product on /api/v1/products', () => {
    const testProduct = {
      name: 'Hello good morning',
      category: 'songs',
      price: 10,
      description: 'Song by Diddy',
    };
    
    return mockRequest.post('/api/v1/products')
    
      .send(testProduct)
      .then(result=> {
        return (mockRequest.delete(`/api/v1/products/${result.body._id}`));
      })
    
      .then(response=> {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
      });
    
  });

});
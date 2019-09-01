# Block 3 Project: API Server

### Author: Hanna Alemu

### Mongo DB URL
mongodb+srv://hanna9:estifaman9@cluster0-s90so.mongodb.net/test?retryWrites=true&w=majority

### Common npm Scripts
 "lint": "eslint \"**/*.js\"",  
   "start": "node index.js",  
   "test": "jest --verbose --coverage",  
   "test-watch": "jest --watchAll --verbose --coverage",  
   "jsdoc": "jsdoc -c ./docs/config/jsdoc.config.json",  
   "startDB": "mkdir -p ./.db && mongod --dbpath ./.db"

### Links and Resources
* [submission PR](http://xyz.com)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) (when applicable)


#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc]() ()

### Setup
#### `.env` requirements
* `PORT` - 3000
* `Secret` - Secret used to create token

#### Running the app
* `npm start`
* Endpoints: 
/api/v1/categories  : Returns a Json object with all categories in database
/api/v1/categories:id: Returns a Json object with the category with the corresponding id
/api/v1/products: Returns a Json object with all products in database
/api/v1/products:id :  Returns a Json object with the product with the corresponding id
/signup : let's a user sign up with a username and password
/signin : Let's the user signin with a username and password OR token
#### Tests
** `npm run test`

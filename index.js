'use strict';

const mongoose = require('mongoose');

const app = require('./src/app');

let MONGOOSE_URI = 'mongodb+srv://hanna9:estifaman9@cluster0-s90so.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGOOSE_URI, {useNewUrlParser: true});

app.start(process.env.PORT);



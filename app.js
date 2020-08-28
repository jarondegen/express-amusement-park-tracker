const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(router)


module.exports = app;
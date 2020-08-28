const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const environment = require('./config/index')

const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(router)


// creating unhandled requests
app.use((req, res, next) => {
    const err = new Error(`The reqest page couldn't be found`);
    err.status = 404;
    next(err);
});

// Logging Errors
app.use((err, req, res, next) => {
    if(environment === 'production'){
        console.log(err);
    } else {
        console.error(err);
    }
    next(err);
});

//page not found 404
app.use((err, req, res, next) => {
    if(err.status === 404){
        res.status(404);
        res.render('page-not-found', { title: 'Page not found' });
    }
    next(err);
});

//generic error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === 'production';
    res.render('error', { 
        title : 'Server Error',
        message: isProduction ? null : err.message,
        stack: isProduction ? null : err.stack
    });
});





module.exports = app;
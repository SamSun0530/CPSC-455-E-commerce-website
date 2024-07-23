var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

const db = require('./db/db');
var indexRouter = require('./routes/index');
var sessionRouter = require('./routes/session');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart');
var wishlistRouter = require('./routes/wishlist');
var postsRouter = require('./routes/posts');

var app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/session', sessionRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/posts', postsRouter);

module.exports = app;

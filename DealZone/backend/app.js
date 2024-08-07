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
var sellerPostsRouter = require('./routes/sellerPosts');

var app = express();
app.use(cors({
    origin: 'https://project-10-tech-titans-1.onrender.com', //'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'session-token'],
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
app.use('/sellerPosts', sellerPostsRouter);

module.exports = app;

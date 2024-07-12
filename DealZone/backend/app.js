var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart'); // Added line
var wishlistRouter = require('./routes/wishlist');
var postsRouter = require('./routes/posts');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter); // Added line
app.use('/wishlist', wishlistRouter)
app.use('/posts', postsRouter)

module.exports = app;

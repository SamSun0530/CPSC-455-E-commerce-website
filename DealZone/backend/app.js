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
var tagsRouter = require('./routes/tags');
var purchaseHistoryRouter = require('./routes/purchaseHistory');

var app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
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
app.use('/tags', tagsRouter);
app.use('/purchase_history', purchaseHistoryRouter);

module.exports = app;

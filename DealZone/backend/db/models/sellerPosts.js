const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sellerPostsSchema = new Schema({
    user_id: String,
    items: [String]
});

const Cart = model('Cart', sellerPostsSchema);
module.exports = Cart;
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartSchema = new Schema({
    user_id: String,
    title: String,
    image: String,
    price: Number
});

const Cart = model('Cart', cartSchema);
module.exports = Cart;

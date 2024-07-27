const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartSchema = new Schema({
    user_id: String,
    items: [String]
});

const Cart = model('Cart', cartSchema);
module.exports = Cart;

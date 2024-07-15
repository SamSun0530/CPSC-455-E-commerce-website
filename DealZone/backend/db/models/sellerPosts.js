const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sellerPostsSchema = new Schema({
    user_id: String,
    items: [String]
});

const SellerPost = model('SellerPost', sellerPostsSchema);
module.exports = SellerPost;
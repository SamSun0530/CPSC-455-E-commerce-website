const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const listingSchema = new Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    posted_on: Date,
    user_id: String,
    sold: Boolean,
    tags: [String]
});

const Listing = model('Listing', listingSchema);
module.exports = Listing;
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TagsSchema = new Schema({
    tag: {
        type: String,
        required: true
    }
});

const Tags = model('Tags', TagsSchema);
module.exports = Tags;

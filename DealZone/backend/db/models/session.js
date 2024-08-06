const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
    user_id: String,
    session_token: String,
    expires_on: String,
});

const Session = model('Session', sessionSchema);
module.exports = Session;
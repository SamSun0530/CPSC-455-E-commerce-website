const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));

module.exports = db;
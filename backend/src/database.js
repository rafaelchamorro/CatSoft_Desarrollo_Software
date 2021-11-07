const mongoose = require('mongoose');

//environment variables
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});
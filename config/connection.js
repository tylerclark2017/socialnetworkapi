//const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/developersApplications');

module.exports = mongoose.connection;

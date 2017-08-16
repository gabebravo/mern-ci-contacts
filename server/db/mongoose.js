// mongose setup & config
const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useMongoClient: true, // weird new flag mongoose requires
});

module.exports = { mongoose };
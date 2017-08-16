// the DB config base on NODE_ENV
// require('dotenv').config();
require('./config/config');

// import mongoose db
const { mongoose } = require('./db/mongoose');

// import express and instantiate a server
const express = require('express');
const app = express();
const port = process.env.PORT;
// require('dotenv').config();

// import and use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// routes specific to driver contact CRUD
const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = {app};
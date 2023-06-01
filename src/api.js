require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes');
const app = express();
const serverless = require('serverless-http');

app.use(express.json());
app.use('/.netlify/functions/api', router);

// Connect to the database
mongoose.connect(process.env.CONNECTIONSTRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports.handler = serverless(app);

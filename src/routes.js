const express = require('express');
const router = express.Router();
const User = require('./models/user');
const path = require('path');

/**
 * GET '/' route
 * Returns the home page with route details
 */
router.get('/', (req, res) => {
	console.log("GET '/' route called");
	res.sendFile(path.resolve('dist/index.html'));
});

/**
 * GET '/User' route
 * Return all the users in the database
 */
router.get('/user', async (req, res) => {
	console.log("GET '/User' route called");
	try {
		res.json(await User.find());
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * GET '/User/:id' route
 * Returns one single user from the database using .findById(objectId)
 * Uses req.params.id which means the id is passed in the url
 */
router.get('/user/:id', async (req, res) => {
	console.log("GET '/user/:id' route called");
	try {
		res.send(await User.findById(req.params.id));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * POST '/user' route
 * Creates one single user to the database using .create(data)
 * uses req.body which means an object is passed in the request body
 */
router.post('/user', async (req, res) => {
	console.log("POST '/user' route called");
	try {
		res.send(await User.create(req.body));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * PUT '/user/:id' route
 * Updates one single user in the database using .findByIdAndUpdate(objectId, {$set: data})
 * Uses req.params.id, which means the id is passed in the url
 * Also uses req.body, which means an object is passed in the request body
 */
router.put('/user/:id', async (req, res) => {
	console.log("PUT '/user/:id' route called");
	try {
		res.send(await User.findByIdAndUpdate(req.params.id, { $set: req.body }));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * DELETE '/user/:id' route
 * Deletes one single user from the database using .findByIdAndDelete(objectId)
 * Uses req.params.id, which means the id is passed in the url
 */
router.delete('/user/:id', async (req, res) => {
	console.log("DELETE '/user/:id' route called");
	try {
		res.send(await User.findByIdAndDelete(req.params.id));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;

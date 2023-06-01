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
	res.send(
		'<div style="padding: 1rem;">'
		+'<h1>Welcome to my API!</h1>'
		+'<h1>These are the available routes:</h1>'
	
		+'<h2><span style="margin-right: 1rem; color: #0b5ed7;">GET</span>/</h2>'
		+'Where you are right now'
	
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #0b5ed7;">GET</span>/user</h2>'
		+'Returns all users in the database.'
	
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #0b5ed7;">GET</span>/user/:id</h2>'
		+'<p>Returns one single user from the database by id.</p>'
		
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #27d383;">POST</span>/user</h2>'
		+ '<p>Adds one single user to the database.</p>'
		+ '<p>A new JSON user object needs to be passed in the request body</p>'
		+ '<p>Since we can\'t pass a body in our browser, this path only works when called via code/postman</p>'
		+ '<p>Example JSON user object:</p>'
		+ '<p>{</p>'
		+ '<p style="margin-left: 1rem;">"name": "John Doe",</p>'
		+ '<p style="margin-left: 1rem;">"birthdate": "1995-06-15T00:00:00.000Z",</p>'
		+ '<p style="margin-left: 1rem;">"email": "johndoe@example.com",</p>'
		+ '<p>}</p>'
		
		+'<hr/>'
		
		+'<h2><span style="margin-right: 1rem; color: #ffc107;">PUT</span>/user/:id</h2>'
		+ '<p>Updates one single user in the database by id.</p>'
		+ '<p>A JSON user object needs to be passed in the request body containing the changes.</p>' 
		+ '<p>Since we can\'t pass a body in our browser, this path only works when called via code/postman</p>'
		+ '<p>Example updated JSON user object:</p>'
		+ '<p>{</p>'
		+ '<p style="margin-left: 1rem;">"name": "John Smith",</p>'
		+ '<p>}</p>'
		
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #dc3545;">DELETE</span>/user/:id</h2>'
		+ '<p>Deletes one single user from the database by id.</p>'
		
		+ '<hr/>'
		+'</div>'
	  );
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

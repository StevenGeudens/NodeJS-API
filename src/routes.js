const express = require('express');
const router = express.Router();
const Store = require('./models/store');
const Manager = require('./models/manager');

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
	
		+'<h2><span style="margin-right: 1rem; color: #0b5ed7;">GET</span>/store</h2>'
		+'Returns all stores in the database.'
	
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #0b5ed7;">GET</span>/store/:id</h2>'
		+'<p>Returns one single store from the database by id.</p>'
		
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #27d383;">POST</span>/store</h2>'
		+ '<p>Adds one single store to the database.</p>'
		+ '<p>A new JSON store object needs to be passed in the request body</p>'
		+ '<p>Since we can\'t pass a body in our browser, this path only works when called via code/postman</p>'
		+ '<p>Example JSON store object:</p>'
		+ '<p>{</p>'
		+ '<p style="margin-left: 1rem;">"name": "String",</p>'
		+ '<p style="margin-left: 1rem;">"location": "String",</p>'
		+ '<p style="margin-left: 1rem;">"city": "String",</p>'
		+ '<p style="margin-left: 1rem;">"state": "String",</p>'
		+ '<p style="margin-left: 1rem;">"postalCode": "String",</p>'
		+ '<p>}</p>'
		
		+'<hr/>'
		
		+'<h2><span style="margin-right: 1rem; color: #ffc107;">PUT</span>/store/:id</h2>'
		+ '<p>Updates one single store in the database by id.</p>'
		+ '<p>A JSON store object needs to be passed in the request body containing the changes.</p>' 
		+ '<p>Since we can\'t pass a body in our browser, this path only works when called via code/postman</p>'
		+ '<p>Example updated JSON store object:</p>'
		+ '<p>{</p>'
		+ '<p style="margin-left: 1rem;">"name": "String",</p>'
		+ '<p>}</p>'
		
		+'<hr/>'
	
		+'<h2><span style="margin-right: 1rem; color: #dc3545;">DELETE</span>/store/:id</h2>'
		+ '<p>Deletes one single store from the database by id.</p>'
		
		+ '<hr/>'
		+'</div>'
	  );
});

/**********************************
 *           Stores               *
 **********************************/

/**
 * GET '/store' route
 * Return all the stores in the database
 */
router.get('/store', async (req, res) => {
	console.log("GET '/store' route called");
	try {
		res.json(await Store.find());
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * GET '/store/:id' route
 * Returns one single store from the database using .findById(objectId)
 * Uses req.params.id which means the id is passed in the url
 */
router.get('/store/:id', async (req, res) => {
	console.log("GET '/store/:id' route called");
	try {
		res.send(await Store.findById(req.params.id));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * POST '/store' route
 * Creates one single store to the database using .create(data)
 * uses req.body which means an object is passed in the request body
 */
router.post('/store', async (req, res) => {
	console.log("POST '/store' route called");
	try {
		res.send(await Store.create(req.body));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * PUT '/store/:id' route
 * Updates one single store in the database using .findByIdAndUpdate(objectId, {$set: data})
 * Uses req.params.id, which means the id is passed in the url
 * Also uses req.body, which means an object is passed in the request body
 */
router.put('/store/:id', async (req, res) => {
	console.log("PUT '/store/:id' route called");
	try {
		res.send(await Store.findByIdAndUpdate(req.params.id, { $set: req.body }));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * DELETE '/store/:id' route
 * Deletes one single store from the database using .findByIdAndDelete(objectId)
 * Uses req.params.id, which means the id is passed in the url
 */
router.delete('/store/:id', async (req, res) => {
	console.log("DELETE '/store/:id' route called");
	try {
		res.send(await Store.findByIdAndDelete(req.params.id));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**********************************
 *          Managers              *
 **********************************/

/**
 * GET '/manager' route
 * Return all the managers in the database
 */
router.get('/manager', async (req, res) => {
	console.log("GET '/manager' route called");
	try {
		res.json(await Manager.find().populate('stores').sort('name'));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;

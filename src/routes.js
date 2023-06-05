const express = require('express');
const router = express.Router();
const Store = require('./models/store');
const Manager = require('./models/manager');
const auth = require('../middleware/auth');
const { admin, user } = require('../middleware/roles');

/**
 * GET '/' route
 * Returns the home page with route details
 */
router.get('/', (req, res) => {
	console.log("GET '/' route called");
	res.send(
		'<!DOCTYPE html>' +
			'<html lang="en">' +
			'<head>' +
			'<meta charset="utf-8" />' +
			'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
			'<title>NodeJS API</title>' +
			'<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />' +
			'</head>' +
			'<body>' +
			'<div class="container my-4">' +
			'<div class="text-center">' +
			'<h1 class="text-uppercase">Welcome to my API</h1>' +
			'<h4 class="text-muted fw-normal">These are the available routes</h4>' +
			'</div>' +
			'<div class="row mt-5">' +
			'<h4>API authentication</h4>' +
			'<hr />' +
			'<div class="row">' +
			'<div class="col-6">' +
			'<p>To use any of the routes you need to first acquire a bearer token. To acquire a bearer token you can use the following route.</p>' +
			'</div>' +
			'<div class="col-6">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-success me-2">POST</span>' +
			'<h5 class="card-title d-inline">/user/auth</h5>' +
			'<p class="card-text my-2">Returns a bearer token that needs to be used in requests to any of the following routes.</p>' +
			'<p class="card-text my-2">Provide the email and password of a registered user in the request body.</p>' +
			'<div class="card text-bg-dark">' +
			'<div class="card-header">Request body</div>' +
			'<div class="card-body">' +
			'<p class="card-text">{</p>' +
			'<p class="card-text ms-4">"email": "String",</p>' +
			'<p class="card-text ms-4">"password": "String"</p>' +
			'<p class="card-text">}</p>' +
			'</div>' +
			'</div>' +
			'<p class="card-text my-2">There are currently two accounts that can be used to acquire a token.</p>' +
			'<div class="card mb-2">' +
			'<div class="card-body">' +
			'<h5 class="card-title">Admin</h5>' +
			'<p class="card-text">' +
			'<span class="fw-bold me-1">Email:</span>●●●●●●●●●●●●●●●●●●●<br /><span class="fw-bold me-1">Password:</span>●●●●●●●●●●●●</p>' +
			'<p class="card-text fw-bold d-inline me-1">Allowed actions:</p>' +
			'<span class="badge rounded-pill text-bg-primary me-1">GET</span>' +
			'<span class="badge rounded-pill text-bg-success me-1">POST</span>' +
			'<span class="badge rounded-pill text-bg-warning me-1">PUT</span>' +
			'<span class="badge rounded-pill text-bg-danger">DELETE</span>' +
			'</div>' +
			'</div>' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<h5 class="card-title">User</h5>' +
			'<p class="card-text">' +
			'<span class="fw-bold me-1">Email:</span>user@example.com<br /><span class="fw-bold me-1">Password:</span>password</p>' +
			'<p class="card-text fw-bold d-inline me-1">Allowed actions:</p><span class="badge rounded-pill text-bg-primary">GET</span>' +
			'<p class="card-text text-muted fst-italic">' +
			'You can use the user account to test the API.' +
			'</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="row mt-5">' +
			'<h4>Store routes</h4>' +
			'<hr />' +
			'<div class="col-4 my-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-primary me-2">GET</span><h5 class="card-title d-inline">/store</h5>' +
			'<p class="card-text my-2">Returns all the stores in the database.</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4 my-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-primary me-2">GET</span><h5 class="card-title d-inline">/store/:id</h5>' +
			'<p class="card-text my-2">Returns one single store from the database by id.</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4 my-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-danger me-2">DELETE</span>' +
			'<h5 class="card-title d-inline">/store/:id</h5>' +
			'<p class="card-text my-2">Deletes one single store from the database by id.</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-success me-2">POST</span>' +
			'<h5 class="card-title d-inline">/store</h5>' +
			'<p class="card-text mt-2">Adds one single store to the database.</p>' +
			'<p class="card-text">A new JSON store object needs to be passed in the request body.</p>' +
			'<p class="card-text">Since we can&#39;t pass a body in our browser, this path only works when called via code/postman.</p>' +
			'<div class="card text-bg-dark">' +
			'<div class="card-header">Request body</div>' +
			'<div class="card-body">' +
			'<p class="card-text">{</p>' +
			'<p class="card-text ms-4">"name": "String",</p>' +
			'<p class="card-text ms-4">"location": "String",</p>' +
			'<p class="card-text ms-4">"city": "String",</p>' +
			'<p class="card-text ms-4">"state": "String",</p>' +
			'<p class="card-text ms-4">"postalCode": "String"</p>' +
			'<p class="card-text">}</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-warning me-2">PUT</span><h5 class="card-title d-inline">/store/:id</h5>' +
			'<p class="card-text mt-2">Updates one single store in the database by id.</p>' +
			'<p class="card-text">A JSON store object needs to be passed in the request body containing the changes.</p>' +
			'<p class="card-text">Since we can&#39;t pass a body in our browser, this path only works when called via code/postman.</p>' +
			'<div class="card text-bg-dark">' +
			'<div class="card-header">Request body</div>' +
			'<div class="card-body">' +
			'<p class="card-text">{</p>' +
			'<p class="card-text ms-4">"name": "String"</p>' +
			'<p class="card-text">}</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="row mt-5">' +
			'<h4>Manager routes</h4>' +
			'<hr />' +
			'<div class="col-4 my-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-primary me-2">GET</span>' +
			'<h5 class="card-title d-inline">/manager</h5>' +
			'<p class="card-text my-2">Returns all the managers in the database.</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4 my-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-primary me-2">GET</span><h5 class="card-title d-inline">/manager/:id</h5>' +
			'<p class="card-text my-2">Returns one single manager from the database by id.</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4 my-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-danger me-2">DELETE</span>' +
			'<h5 class="card-title d-inline">/manager/:id</h5>' +
			'<p class="card-text my-2">Deletes one single manager from the database by id.</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-success me-2">POST</span>' +
			'<h5 class="card-title d-inline">/manager</h5>' +
			'<p class="card-text mt-2">Adds one single manager to the database.</p>' +
			'<p class="card-text">A new JSON manager object needs to be passed in the request body.</p>' +
			'<p class="card-text">Since we can&#39;t pass a body in our browser, this path only works when called via code/postman.</p>' +
			'<div class="card text-bg-dark">' +
			'<div class="card-header">Request body</div>' +
			'<div class="card-body">' +
			'<p class="card-text">{</p>' +
			'<p class="card-text ms-4">"firstname": "String",</p>' +
			'<p class="card-text ms-4">"lastname": "String",</p>' +
			'<p class="card-text ms-4">"email": "String",</p>' +
			'<p class="card-text ms-4">"phone": "String",</p>' +
			'<p class="card-text ms-4">"stores": [Store id, Store id, ...]</p>' +
			'<p class="card-text">}</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-4">' +
			'<div class="card">' +
			'<div class="card-body">' +
			'<span class="badge rounded-pill text-bg-warning me-2">PUT</span><h5 class="card-title d-inline">/manager/:id</h5>' +
			'<p class="card-text mt-2">Updates one single manager in the database by id.</p>' +
			'<p class="card-text">A JSON manager object needs to be passed in the request body containing the changes.</p>' +
			'<p class="card-text">Since we can&#39;t a body in our browser, this path only works when called via code/postman.</p>' +
			'<div class="card text-bg-dark">' +
			'<div class="card-header">Request body</div>' +
			'<div class="card-body">' +
			'<p class="card-text">{</p>' +
			'<p class="card-text ms-4">"firstname": "String"</p>' +
			'<p class="card-text">}</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>' +
			'</body>' +
			'</html>'
	);
});

/**********************************
 *           Stores               *
 **********************************/

/**
 * GET '/store' route
 * Return all the stores in the database
 */
router.get('/store', [auth, user], async (req, res) => {
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
router.get('/store/:id', [auth, user], async (req, res) => {
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
router.post('/store', [auth, admin], async (req, res) => {
	console.log("POST '/store' route called");
	try {
		res.send(await Store.create(req.body));
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

/**
 * PUT '/store/:id' route
 * Updates one single store in the database using .findByIdAndUpdate(objectId, {$set: data})
 * Uses req.params.id, which means the id is passed in the url
 * Also uses req.body, which means an object is passed in the request body
 */
router.put('/store/:id', [auth, admin], async (req, res) => {
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
router.delete('/store/:id', [auth, admin], async (req, res) => {
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
router.get('/manager', [auth, user], async (req, res) => {
	console.log("GET '/manager' route called");
	try {
		res.json(await Manager.find().populate('stores').sort('name'));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * GET '/manager/:id' route
 * Returns one single manager from the database using .findById(objectId)
 * Uses req.params.id which means the id is passed in the url
 */
router.get('/manager/:id', [auth, user], async (req, res) => {
	console.log("GET '/manager/:id' route called");
	try {
		res.send(
			await Manager.findById(req.params.id).populate('stores').sort('name')
		);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * POST '/manager' route
 * Creates one single manager to the database using .create(data)
 * uses req.body which means an object is passed in the request body
 */
router.post('/manager', [auth, admin], async (req, res) => {
	console.log("POST '/manager' route called");
	try {
		res.send(await Manager.create(req.body));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * PUT '/manager/:id' route
 * Updates one single manager in the database using .findByIdAndUpdate(objectId, {$set: data})
 * Uses req.params.id, which means the id is passed in the url
 * Also uses req.body, which means an object is passed in the request body
 */
router.put('/manager/:id', [auth, admin], async (req, res) => {
	console.log("PUT '/manager/:id' route called");
	try {
		res.send(
			await Manager.findByIdAndUpdate(req.params.id, { $set: req.body })
		);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

/**
 * DELETE '/manager/:id' route
 * Deletes one single manager from the database using .findByIdAndDelete(objectId)
 * Uses req.params.id, which means the id is passed in the url
 */
router.delete('/manager/:id', [auth, admin], async (req, res) => {
	console.log("DELETE '/manager/:id' route called");
	try {
		res.send(await Manager.findByIdAndDelete(req.params.id));
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;

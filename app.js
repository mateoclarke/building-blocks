var express = require('express');
var app = express();
var port = 3000


var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

var locations = {
	'Fixed': 'First floor', 'Movable': 'Second Floor', 'Rotating': 'Penthouse'
};

// MIDDLEWARE
var logger = require('./logger');
app.use(logger);
app.use(express.static('public'));

// MIDDLEWARE for Parsing Form Data
var bodyParser = require('body-parser');
	// The extended false option forces the use of the native querystring Node library.
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// PROPERTIES ON THE REQUEST OBJECT
// These can be accessed from all subsequent routes in the application
app.param('name', function (request, response, next) {
	var name = request.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

	// This is accessible from other routes in the application
	request.blockName = block;

	next();
});

// GET ROUTES
app.get('/blocks', function(request, response) {
	if (request.query.limit >= 0) {
		response.json(blocks.slice(0, request.query.limit))
	} else {
		response.json(Object.keys(blocks));
	}
});

// DYNAMIC ROUTES
app.get('/blocks/:name', function(request, response){
	var description = blocks[request.blockName];
	if (!description) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {	
		response.json(description);
	}
});

app.get('/locations/:name', function(request, response){
	var description = locations[request.blockName];
	if (!description) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {	
		response.json(description);
	}
});

// ROUTE WITH HTML RESPONSE 
app.get('/blocks2', function(request, response){
	var blocks2 = '<ul><li>Fixed</li><li>Movable</li></ul>';
	response.send(blocks2);
})

// REDIRECTING ROUTE
app.get('/blocks3', function(request, response) {
	response.redirect(301, '/parts');
});

// POST ROUTE
// Routes can take multiple handlers as arguemnts and will call them sequentially.
// Using multiple route handlers is useful for re-using middleware that load resources, 
// perform validations, authentication, etc.
app.post('/blocks', parseUrlencoded, function(request, response){
	// Form submitted date can be accessed through request.body Object
	var newBlock = request.body;
	// The form elements are parsed to object properties, name and description
	blocks[newBlock.name] = newBlock.description;
	// The response includes proper 201 Created status code and responds with the block name.
	response.status(201).json(newBlock.name);
});

// DELETE ROUTE
// The delete route takes the block name as argument.
app.delete('/blocks/:name', function(request, response){
	// The delete operator from JavaScript removes a property from an object.
	delete blocks[request.blockName];
	// The sendStatus() function sets both the status code and the response body.
	response.sendStatus(200);
});

// LISTENING PORT & MESSAGE
app.listen(port, function(){
	console.log('Listening on http://localhost:' + port + '/');
});